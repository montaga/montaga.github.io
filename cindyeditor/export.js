/*jshint esversion: 6 */

makepluginfromcscode({
  'init': `
    exportactive = false;
    startexport() := (
      if(!exportactive,
        maxx = max(apply(allpoints(),p, p.x));
        maxy = max(apply(allpoints(),p, p.y));
        minx = min(apply(allpoints(),p, p.x));
        miny = min(apply(allpoints(),p, p.y));
        
        TL = create("Free", [], pos->[minx,maxy]);
        TR = create("Free", [], pos->[maxx,maxy]);
        BL = create("Free", [], pos->[minx,miny]);
        BR = create("Free", [], pos->[maxx,miny]);
        
        forall([TL,TR,BL,BR], P,
          P.alpha = .5;
          P.color = [1,1,1];
          P.labeled = false;
        );
        
        exportactive = true;
      );
    );
    stopexport() := (
      if(exportactive,
        
        //remove element is not implemented yet :-(
        TL.alpha = 0; 
        TR.alpha = 0;
        BL.alpha = 0;
        BR.alpha = 0;
        //TODO: remove above lines once removeelement is implemented
        removeelement("TL"); 
        removeelement("TR");
        removeelement("BL");
        removeelement("BR");
        
        exportactive = false;
      );
    );
    `,
  'move': `
    if(exportactive,
      if(mover()==TL,
        TR.y = TL.y;
        BL.x = TL.x;
      );
      
      if(mover()==TR,
        TL.y = TR.y;
        BR.x = TR.x;
      );
      
      if(mover()==BL,
        BR.y = BL.y;
        TL.x = BL.x;
      );
      
      if(mover()==BR,
        BL.y = BR.y;
        TR.x = BR.x;
      );
      visiblerect = [min(BL.x,TR.x),min(BL.y,TR.y),max(BL.x,TR.x),max(BL.y,TR.y)];
      
      //TODO: avoid javascript
      javascript("updaterect('"+visiblerect+"')");
      
    );
  `,
  'draw': `
    if(exportactive,
      draw(TL,BL,color->[1,1,1], size->3);
      draw(BL,BR,color->[1,1,1], size->3);
      draw(BR,TR,color->[1,1,1], size->3);
      draw(TR,TL,color->[1,1,1], size->3);
    );
  `
  },
  "exportplugin"
);


var visibleRect, width, height;
function updaterect(str) {
  visibleRect = JSON.parse(str);
  var ratio = Math.abs(visibleRect[3]-visibleRect[1])/Math.abs(visibleRect[2]-visibleRect[0]);
  
  var width = document.getElementById('export-width').value;
  var height = Math.round(width*ratio);
  document.getElementById('export-height').value = height;
}

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
  
  var resolutionelement = document.getElementById('export-resolution');
  document.getElementById('export-fullscreen').onchange = function() {
    if(!this.checked) {
      resolutionelement.style.display = "block";
      cdy.evokeCS(`startexport()`);
    } else {
      resolutionelement.style.display = "none";
      cdy.evokeCS(`stopexport()`);
    }
  };
  resolutionelement.style.display = "none";
  
  
  document.getElementById('button-export-html').onclick = function() {
    cdy.evokeCS(`stopexport()`);
    var fullscreen = document.getElementById('export-fullscreen').checked;
    if(!fullscreen) {
      //extract the area
      buildhtml({
        fullscreen: false,
        width: document.getElementById('export-width').value,
        height: document.getElementById('export-height').value,
        visibleRect: visibleRect
      });
      document.getElementById('export-fullscreen').checked = true;
      document.getElementById('export-fullscreen').onchange();
    } else {
      buildhtml({
        fullscreen: true
      });
    }    
  };
  
  document.getElementById('button-export-url').onclick = function() {
    cdy.evokeCS(`stopexport()`);
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

function buildhtml(config) {
  cdy.evokeCS('apply(allelements(),#.pinned=false); '); //TODO: change this if geometry-editor changes
  
  //yield gslp
  var gslp = yieldgslp();
  
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
          #CSCanvas {
            ${config.fullscreen ? 'width: 100vw; height: 100vh;' : ''}
          }
      </style>
      <link rel="stylesheet" href="https://cindyjs.org/dist/v0.8/CindyJS.css">
      <script type="text/javascript" src="https://cindyjs.org/dist/v0.8/Cindy.js"></script>
      
      ${csscripts}
  
      <script type="text/javascript">
  var cdy = CindyJS({
    scripts: "cs*",
    defaultAppearance: {
      dimDependent: 0.7,
      fontFamily: "sans-serif",
      lineSize: 1,
      pointSize: 5.0,
      textsize: 12.0
    },
    angleUnit: "°",
    geometry: ${JSON.stringify(gslp)},
    ports: [{
      id: "CSCanvas",
      ${config.width ? `width: ${config.width},`:''}
      ${config.height ? `height: ${config.height},`:''}
      transform: [{visibleRect: ${
        config.visibleRect ? JSON.stringify(config.visibleRect) : '[-15, 18, 20, -5]'
      }}],
      background: "rgb(168,176,192)"
    }],
    csconsole: false,
    autoplay: true,
    cinderella: {build: 1901, version: [2, 9, 1901]}
  });
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
