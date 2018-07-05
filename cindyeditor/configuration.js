/*jshint esversion: 6 */

makepluginfromcscode({
  'init': `
    visiblerectactive = false;
    startvisiblerect() := (
      if(!visiblerectactive,
        maxx = max(apply(allpoints(),p, p.x));
        maxy = max(apply(allpoints(),p, p.y));
        minx = min(apply(allpoints(),p, p.x));
        miny = min(apply(allpoints(),p, p.y));
        if(isundefined(maxx) % isundefined(maxy) % isundefined(minx) % isundefined(miny),
          startvisiblerect(-1,-1,2,1);
          ,
          startvisiblerect(minx,miny,maxx,maxy);
        );
      );
    );
    startvisiblerect(minx,miny,maxx,maxy) := (
      if(!visiblerectactive,
        
        TL = create("Free", [], pos->[minx,maxy]);
        TR = create("Free", [], pos->[maxx,maxy]);
        BL = create("Free", [], pos->[minx,miny]);
        BR = create("Free", [], pos->[maxx,miny]);
        
        forall([TL,TR,BL,BR], P,
          P.alpha = .5;
          P.color = [1,1,1];
          P.labeled = false;
        );
        
        visiblerectactive = true;
      );
    );
    stopvisiblerect() := (
      if(visiblerectactive,
        //remove element is not implemented yet :-(
        TL.alpha = 0; 
        TR.alpha = 0;
        BL.alpha = 0;
        BR.alpha = 0;
        //TODO: remove above lines once removeelement is implemented
        //removeelement(TL); 
        //removeelement(TR);
        //removeelement(BL);
        //removeelement(BR);
        
        visiblerectactive = false;
      );
    );
    `,
  'move': `
    if(visiblerectactive,
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
    if(visiblerectactive,
      draw(TL,BL,color->[1,1,1], size->3);
      draw(BL,BR,color->[1,1,1], size->3);
      draw(BR,TR,color->[1,1,1], size->3);
      draw(TR,TL,color->[1,1,1], size->3);
    );
  `
  },
  "visiblerect"
);

var visibleRect;
function updaterect(str) {
  visibleRect = JSON.parse(str);
  
  var ratio = Math.abs(visibleRect[3]-visibleRect[1])/Math.abs(visibleRect[2]-visibleRect[0]);
  
  width = document.getElementById('configuration-width').value;
  height = Math.round(width*ratio);
  document.getElementById('configuration-height').value = height;
}

function enterConfigurationUI() {
  document.getElementById('configuration-window').style.display = "block";
  document.getElementById('configuration-fullscreen').checked = configuration.fullscreenmode;
  document.getElementById('configuration-fullscreen').onchange();
  visibleRect = configuration.ports[0].transform[0].visibleRect;
  if(visibleRect) {
      cdy.evokeCS(`startvisiblerect(${visibleRect[0]},${visibleRect[1]},${visibleRect[2]},${visibleRect[3]})`);
  } else {
      cdy.evokeCS(`startvisiblerect()`);
  }
}

function leaveConfigurationUI() {
  document.getElementById('configuration-window').style.display = "none";
  cdy.evokeCS(`stopvisiblerect()`);
}

function createConfigurationUI() {
  var resolutionelement = document.getElementById('configuration-resolution');
  document.getElementById('configuration-fullscreen').onchange = function() {
    
    if(!this.checked) {
      resolutionelement.style.display = "block";
      //cdy.evokeCS(`startvisiblerect()`);
    } else {
      resolutionelement.style.display = "none";
      //cdy.evokeCS(`stopvisiblerect()`);
    }
  };
  
  document.getElementById('configuration-fullscreen').onchange();
  
  document.getElementById('configuration-change-size-button').onclick = function() {
    cdy.evokeCS(`stopvisiblerect()`);
    configuration.geometry = yieldgslp(); //copy gslp
    if(document.getElementById('configuration-fullscreen').checked) {
      configuration.fullscreenmode = true;
      if(configuration.ports && configuration.ports[0]) {
        delete configuration.ports[0].width;
        delete configuration.ports[0].height;
      }
    } else {
      configuration.fullscreenmode = false;
      if(!(configuration.ports && configuration.ports[0])) {
         configuration.ports = [{
           id: 'CSCanvas'
         }];
      }
      configuration.ports[0].width = document.getElementById('configuration-width').value;
      configuration.ports[0].height = document.getElementById('configuration-height').value;
    }
    
    configuration.ports[0].transform = [{visibleRect: visibleRect}];
    configuration.oninit = function () {
      entermode("geometry");
      document.getElementById('move').onclick();
      highlightoptions();
    };
    
    makeCindyJS();
  };
  
}
