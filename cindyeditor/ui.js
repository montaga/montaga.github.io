/*jshint esversion: 6 */

var cm, modeselect, geometrymodeselect;
function createUI() {
  modeselect = document.getElementById("mode-select");
  geometrymodeselect = document.getElementById("geometry-mode-select");
  
  //
  // Code editor
  //
  
  cm = CodeMirror.fromTextArea(document.getElementById("code"), {
    autoCloseBrackets: true,
    matchBrackets: true,
    theme: "base16-dark",
    lineNumbers: true,
    lineWrapping: true,
    viewportMargin: Infinity
  });
  
  cm.on("change", function(cm, change) {
    console.log("something changed! (" + change.origin + ")");
    var s = modeselect.options[modeselect.selectedIndex].value;
    if(scripts.hasOwnProperty(s)) {
      scripts[s] = cm.getValue();
      cdy.evokeCS(`user${s}() := (
        ${scripts[s]}
      )`);
      if(s=="init") {
        cdy.evokeCS(`userinit()`);
      }
      highlightoptions();
    }
  });

  for(var s in scripts) {
    var option = document.createElement("option");
    option.text = `Edit ${s}-script`;
    option.value = s;
    option.id = `${s}-option`;
    modeselect.add(option);
  }
  
  //
  // Geometry
  // 
  
  // Add elements to geometry toggle menu
  for(var i in geometrybuttons) {
    var option = document.createElement("div");

    option.data = geometrybuttons[i][0];
    option.id = geometrybuttons[i][0];
    //option.value = geometrybuttons[i][0];
    
    option.onclick = function() {
      cdy.evokeCS(`setmode("${this.data}")`);
      var children = geometrymodeselect.children;
      
      for (var i = 0; i < children.length; i++) {
        children[i].classList.remove('selected');
      }

      this.classList.add('selected');
    }
    option.style.backgroundImage = `url('${geometrybuttons[i][1]}'`;
    geometrymodeselect.appendChild(option);
  }


  
  //
  // General mode select
  //

  modeselect.addEventListener('change', function(event) {
    entermode(this.value);
  }, false);

  

  
  //
  // Make elements draggagle by moving the header:
  //
  
  dragElement(document.getElementById("code-window"));
  dragElement(document.getElementById("geometry-window"));
  dragElement(document.getElementById("export-window"));
  dragElement(document.getElementById("import-window"));

  
  document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('move').onclick();
  }, false);
}

function entermode(m) {
  if(m=="geometry") {
    document.getElementById('geometry-window').style.display = "block";
  } else {
    document.getElementById('geometry-window').style.display = "none";
    cdy.evokeCS(`selpts=[];
    sellns=[];
    selcns=[];
    tmppts=[];
    tmplns=[];
    tmpcns=[];`);
    cdy.evokeCS('setmode("move");');
    document.getElementById('move').onclick();
  }
  
  if(m=="export") {
    document.getElementById('export-window').style.display = "block";
  } else {
    document.getElementById('export-fullscreen').checked = true;
    document.getElementById('export-fullscreen').onchange();
    //cdy.evokeCS('stopexport()');
    document.getElementById('export-window').style.display = "none";
  }
  
  if(m=="import") {
    document.getElementById('import-window').style.display = "block";
  } else {
    document.getElementById('import-window').style.display = "none";
  }
  
  console.log(m);
  if(scripts.hasOwnProperty(m)) {
    document.getElementById('code-window').style.display = "block";
    var header = document.getElementById('code-window-header').innerHTML = `${m}-script`;
    cm.setValue(scripts[m]);
  } else {
    document.getElementById('code-window').style.display = "none";
  }
  
  if(m=="geometry") modeselect.selectedIndex = 0; //TODO
}


function highlightoptions() {
  for(var s in scripts) {
    let option = document.getElementById(`${s}-option`);
    if(scripts[s]) {
      option.classList.add('used-script');
    } else {
      option.classList.remove('used-script');
    }
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
