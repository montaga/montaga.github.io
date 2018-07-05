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
            if(jscode.match(/(CindyJS|createCindy)\([^]*?\)/g)) {              
              
              eval(`
                var backupCindyJS = CindyJS;
                var backupcreateCindy = createCindy;
                var backupcdy = cdy;
                var createCindy;
                var CindyJS = createCindy = function(config) {
                  configuration = config;
                };`+jscode+`
                CindyJS = backupCindyJS;
                createCindy = backupcreateCindy;
                cdy = backupcdy;
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
    //configuration.initscript = scripts["init"]
    //configuration.scripts = scripts;
    
    if(configuration.canvasname)
      delete configuration.canvasname;
    
    
    configuration.exclusive = "true"; // shut down the previous instance
    
    if(!configuration.use)
      configuration.use = [];
    
    let plugins = ["geometryeditor", "visiblerect", "user"];
    
    for(var i in plugins) {
      if(configuration.use.indexOf(plugins[i])==-1) {
        configuration.use.push(plugins[i]);
      }
    }
    
    //load plugin CindyGL if required
    //TODO: do the same for other plugins as well...
    hascolorplot = false;
    for(var s in scripts) {
      if(scripts[s].match(/colorplot/g))
        hascolorplot = true;
    }
    if(hascolorplot && configuration.use.indexOf("CindyGL")==-1)
      configuration.use.push("CindyGL");
    
    configuration.fullscreenmode = true; //This is not a CindyJS property
    
    if(!configuration.ports) configuration.ports = [];
    if(!configuration.ports[0]) {
      configuration.ports[0] = {
        id: "CSCanvas"
      };
    } else {
      configuration.ports[0].id = "CSCanvas";
      //delete configuration.ports[0].width;
      //delete configuration.ports[0].height;
      /*if(configuration.ports[0].width) {
        cdy.canvas.style.width = configuration.ports[0].width;
      }
      if(configuration.ports[0].height) {
        cdy.canvas.style.height = configuration.ports[0].height;
      }*/
      

    }
    
    m = /<div.*?CSCanvas.*?width:.*?([0-9]*).*?>/g.exec(source);
    if(m && m[1]) {
      configuration.ports[0].width = m[1];
    }
    
    m = /<div.*?CSCanvas.*?height:.*?([0-9]*).*?>/g.exec(source);
    if(m && m[1]) {
      configuration.ports[0].height = m[1];
    }
    
    if(configuration.ports[0].width && configuration.ports[0].height) {
      configuration.fullscreenmode = false;
    }
    
    configuration.oninit = function () {
      entermode("geometry");
      document.getElementById('move').onclick();
      highlightoptions();
    };
    
    makeCindyJS();
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
  /*
  document.getElementById("button-import-url").onclick = function() {
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
  */
}
