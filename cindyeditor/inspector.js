/*jshint esversion: 6 */

var inspectorcontents;

function niceprint(value) {
  if(typeof(value)=='number') {
      return Math.round(value*100)/100;
  }
  if(Array.isArray(value)) {
      return value.map(niceprint);
  }
  return value;
}

function generatecolorcomponent(csnumber) {
  return Math.max(Math.min((csnumber*255 | 0), 255), 0);
}

function cscolor2hex(cscolor) {
      let red = generatecolorcomponent(cscolor[0]);
      let green = generatecolorcomponent(cscolor[1]);
      let blue = generatecolorcomponent(cscolor[2]);
      var rgb = blue | (green << 8) | (red << 16);
      return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

function hex2cscolor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16)/255,
      parseInt(result[2], 16)/255,
      parseInt(result[3], 16)/255
    ] : [0,0,0];
}

createinput = function(key, value, name) {
  if(typeof(value)=='boolean') {
    return `<input type="checkbox" name="${name}.${key}" ${value ? 'checked' : ''} onchange="cdy.evokeCS('${name}.${key} = ' + this.checked)"></div>`;
  } else if(typeof(value)=='number') {
    var min = 0;
    var max = 20;
    if(key=='alpha') {
      min = 0;
      max = 1;
    }
    return `<input type="range" name="${name}.${key}" value="${value}" step=".01"   min="${min}" max="${max}" onchange="cdy.evokeCS('${name}.${key} = ' + this.value); o${name}${key}.value = this.value"><output name="o${name}.${key}" id="o${name}${key}" for="${name}.${key}">${value}</output></div>`;
  } else if(Array.isArray(value)) {
    if(key=="color") {
      return `<input type="color" name="${name}.${key}" value="${cscolor2hex(value)}" onchange="cdy.evokeCS('${name}.${key} = [' + hex2cscolor(this.value) + ']'); o${name}${key}.value = '[' + niceprint(hex2cscolor(this.value)) + ']'"><output name="o${name}.${key}" id="o${name}${key}" for="${name}.${key}">[${niceprint(value)}]</output></div>`;
    } else if(key=="pos" && value[2]!=0) {
        key = "xy";
        value = [value[0]/value[2],value[1]/value[2]];
    }
    
    return `<input type="text" name="${name}.${key}" value="[${niceprint(value)}]" onchange="cdy.evokeCS('${name}.${key} = ' + this.value)"></div>`;
    
    
  }
  return `<input type="text" name="${name}.${key}" value="${value}" onchange="cdy.evokeCS('${name}.${key} = ' + this.value)"></div>`;
};

updateInspector = function(str) {
  selected = str.slice(1,str.length-1).split(',').map(el => el.trim());
  var gslp = yieldgslp();

  var els = gslp.filter(el => selected.indexOf(el.name)!=-1);
  
  innerhtml = "";
  for(var i in els) {
    var el = els[i];
    innerhtml += `<div><b>${el.name}</b>`;
    for(var key in el) {
      if(key == "type" || key=="args" || key=="name") continue;
      let name = `${el.name}.${key}`;
      innerhtml += `<div><label for="${el.name}.${key}">${key}: </label>${createinput(key, el[key], el.name)}`;
    }
    innerhtml += '</div>';
  }
    
  inspectorcontents.innerHTML = innerhtml;
};

createinspectorWindow = function() {
  inspectorcontents = document.getElementById('inspector-contents');
  
  document.getElementById("CSCanvas").addEventListener("click", function(){
    if(modeselect.selectedOptions && modeselect.selectedOptions[0].value=="inspector") {
        cdy.evokeCS(`javascript("updateInspector('" + (selpts++sellns++selcns) + "')")`);
    }
  });
  
};
