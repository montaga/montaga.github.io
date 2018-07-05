/*jshint esversion: 6 */


function createExportUI() {
  /*
  //TODO: implement measureText for PDF and SVG first...
  
  document.getElementById('button-export-pdf').onclick = function() {
    cdy.exportPDF();
  };
  document.getElementById('button-export-svg').onclick = function() {
    cdy.exportSVG();
  };
  */
  
  document.getElementById('button-export-html').onclick = function() {
    buildhtml();   
  };
  
  document.getElementById('button-export-url').onclick = function() {
    exporturl();
  };
}

function yieldgslp() {
  var backup = console.log;
  var str = "";
  var gslp = [];
  console.log = function(msg) {
      str = msg;
  };
  CindyJS.dumpState();
  console.log=backup;

  var json = JSON.parse(str);
  if(json && json["geometry"]) {
    gslp = json["geometry"];
  }
  return gslp;
}

function buildhtml() {
  //cdy.evokeCS('apply(allelements(),#.pinned=false); '); //TODO: change this if geometry-editor changes
  document.getElementById('move').onclick();
  //yield copy of configuration
  var cconfiguration = JSON.parse(JSON.stringify(configuration));
  
  //yield gslp
  cconfiguration.geometry = yieldgslp();
  
  //remove uneeded plugins
  let removeplugins = ["geometryeditor", "visiblerect", "user"];
  cconfiguration.use = configuration.use.filter(p => removeplugins.indexOf(p)==-1);
  
  //remove editor stuff
  delete cconfiguration.oninit;
  delete cconfiguration.fullscreenmode;
  
  //yield scripts
  
  var csscripts = '';
  
  for(var s in scripts) if(scripts[s]){
    csscripts = csscripts + `
    <script id="cs${s}" type="text/x-cindyscript">
    ${scripts[s]}
    </script>`;
  }
  
  //generate source
  var source = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      
      <title>exported from UIExperiments.html</title>
      <style type="text/css">
          body {
              margin: 0px;
              padding: 0px;
          }
          
          ${configuration.fullscreenmode ? `
          #CSCanvas {
              width: 100vw; height: 100vh;
          }` : ''}
      </style>
      <link rel="stylesheet" href="https://cindyjs.org/dist/latest/CindyJS.css">
      <script type="text/javascript" src="https://cindyjs.org/dist/latest/Cindy.js"></script>
      <script type="text/javascript" src="https://cindyjs.org/dist/latest/CindyGL.js"></script>
      
      ${csscripts}
  
      <script type="text/javascript">
        var cdy = CindyJS(${JSON.stringify(cconfiguration, null, "  ")});
      </script>
  </head>
  <body>
      <div id="CSCanvas"></div>
  </body>
  </html>
`;
  
  
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(source));
  element.setAttribute('download', "cindy.html");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

function exporturl() {
  var gslp = yieldgslp();
  
  var csscripts = '';
  
  for(var s in scripts) if(scripts[s]){
    csscripts = csscripts + `&${s}=${encodeURIComponent(scripts[s])}`;
  }
  
  console.log(gslp);
  console.log(csscripts);
  
  history.pushState(null, null, `?${csscripts}&gslp=${
    encodeURIComponent(JSON.stringify(gslp))
  }`);
}
