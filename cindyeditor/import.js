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


function importfile(file) {  
  var reader = new FileReader();
  
  //TODO: check whether file is plain HTML...
  reader.readAsText(file);
  reader.onloadend = function() {
    var source = reader.result;
    
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

    configuration.scripts = "cs*";
    configuration.canvasname = "CSCanvas";
    
    configuration.exclusive = "true"; // shut down the previous instance
    configuration.use = ["CindyGL", "geometryeditor", "exportplugin"];
    makeCindyJS(configuration);
    entermode("geometry");
    document.getElementById('move').onclick();
    
  };
  
}
