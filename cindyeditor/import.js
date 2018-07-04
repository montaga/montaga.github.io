/*jshint esversion: 6 */

function importfromurl(url) {
  for(var s in scripts) {
    var urlpart = url.searchParams.get(s);
    if(urlpart) {
      scripts[s] = decodeURIComponent(urlpart);
    }
  }
  
  var urlpart = url.searchParams.get("gslp");
  if(urlpart) {
    var gslpstr = decodeURIComponent(urlpart);
    var json = JSON.parse(gslpstr);
    if(json) {
      configuration.geometry = json
    }
  }
}


function importhtml(source) {  

    
    for(var s in scripts) {
        scripts[s] = '';
    }
    
    for(var s in scripts) {
      //var regex = /<script.*?(?:(?:cindyscript.*?move)|(?:move.*?cindyscript)).*?>([^]*?)<\/script>/g;
      
      var regex = new RegExp(`<script.*?(?:(?:cindyscript.*?${s})|(?:${s}.*?cindyscript)).*?>([^]*?)<\/script>`);
      
      var result = regex.exec(source);
      if(result && result[1]) {
        var code = result[1].trim();
        if(code) {
          scripts[s] = code;
        }
      }
    }
    

    
    
    //extract CindyJS code and object
    var javascriptregex = /<script.*?javascript.*?>([^]*?)<\/script>/g;
    var m;
    //var configuration = {};
    do {
        m = javascriptregex.exec(source);
        if(m && m[1]) {
            var jscode = m[1];
            if(jscode.match(/CindyJS([^]*?)/g)) {              
              
              eval(`
                
                var backupCindyJS = CindyJS;
                var CindyJS = function(config) {
                  configuration = config;
                };`+jscode+`
                CindyJS = backupCindyJS;
                `);
              
              console.log(jscode);
              console.log(configuration);
           }
        }
    } while (m);

    
    for(var s in scripts) {
      let sname = s + "script";
      if(configuration.hasOwnProperty(sname)) {
        console.log("delete property " + sname);
        delete configuration[sname];
      }
        
    }
    
    configuration.scripts = "cs*";
    
    if(configuration.canvasname)
      delete configuration.canvasname;
    
    
    configuration.exclusive = "true"; // shut down the previous instance
    
    if(!configuration.use)
      configuration.use = [];
    
    let plugins = ["geometryeditor", "exportplugin"];
    for(var i in plugins) {
      if(configuration.use.indexOf(plugins[i])==-1) {
        configuration.use.push(plugins[i]);
      }
    }
    
    
    if(!configuration.ports) configuration.ports = [];
    if(!configuration.ports[0]) {
      configuration.ports[0] = {
        id: "CSCanvas"
      };
    } else {
      configuration.ports[0].id = "CSCanvas";
      delete configuration.ports[0].width;
      delete configuration.ports[0].height;
      
    }
    
    
    console.log(configuration);
    makeCindyJS(configuration);
    entermode("geometry");
    document.getElementById('move').onclick();
    highlightoptions();
}

function createImportUI() {
  document.getElementById("file-input").onchange = function () {
    var reader = new FileReader();
    
    //TODO: check whether file is plain HTML...
    reader.readAsText(this.files[0]);
    reader.onloadend = function() {
      importhtml(reader.result);
    };
      
  };
  
  document.getElementById("button-import-url").onclick = function () {
    var url = document.getElementById("import-url").value;
    console.log(`Load content from ${url}`);
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            importhtml(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
    
  };
}
