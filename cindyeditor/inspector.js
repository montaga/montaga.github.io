/*jshint esversion: 6 */

var Inspector = {
  id: "inspector",
  name: "Inspector",
  html: `<div id="inspector-window">
    <div id="inspector-window-header">Inspector</div>
    <div>
      <div id="inspector-contents">
        Select an element for inspection by clicking on it.
      </div>
    </div>
  </div>`,
  
  contents: null,
  
  init: function() {
    this.contents = document.getElementById('inspector-contents');
    
    /*
    document.getElementById("CSCanvas").addEventListener("click", function(){
      if(UI.modeselect.selectedOptions && UI.modeselect.selectedOptions[0].value=="inspector") {
          cdy.evokeCS(`javascript("Inspector.update('" + (selpts++sellns++selcns) + "')")`);
      }
    }, false);
    */
  },
  /*
  enter: function() {
    cdy.evokeCS(`javascript("Inspector.update('" + (selpts++sellns++selcns) + "')")`);
  },
  */
  update: function(str) {
    selected = str.slice(1,str.length-1).split(',').map(el => el.trim());
    var gslp = yieldgslp();

    var els = gslp.filter(el => selected.indexOf(el.name)!=-1);
    
    
    let innerhtml = "";
    if(els.length>0) {
      document.getElementById("inspector-window-header").innerHTML = "Inspecting " + els.map(el => el.name).join(', ');
    } else {
      document.getElementById("inspector-window-header").innerHTML = "Inspector";
      innerhtml = "Select an element for inspection by clicking on it.";
    }
    
    let elementswithkey = {};
    for(var i in els) {
      var el = els[i];
      for(var key in el) {
        if(key == "type" || key=="args" || key=="name") continue;
        if(!elementswithkey[key]) elementswithkey[key] = [];
        elementswithkey[key].push(i);
      }
    }
    
    for(let key in elementswithkey) {
      if(elementswithkey[key].length==0) continue;
      let firstel = els[elementswithkey[key][0]];  
      let value = firstel[key];
      let allequal = true;
      for(let j = 1; allequal && j<elementswithkey[key].length; j++) {
        if(JSON.stringify(els[elementswithkey[key][j]][key]) != JSON.stringify(value)) allequal = false;
      }
      let elnames = elementswithkey[key].map(i=>els[i].name);
      innerhtml += `<div><span style="color:rgb(150,150,150)">${elnames}</span> <label for="${key}">${key}: </label>${this.createinput(key, value, elnames, allequal)}`;
    }
    this.contents.innerHTML = innerhtml;
  },
  
  niceprint: function (value) {
    if(typeof(value)=='number') {
        return Math.round(value*100)/100;
    }
    if(Array.isArray(value)) {
        return value.map(this.niceprint);
    }
    return value;
  },

  generatecolorcomponent: function(csnumber) {
    return Math.max(Math.min((csnumber*255 | 0), 255), 0);
  },
  
  cscolor2hex: function(cscolor) {
        let red = this.generatecolorcomponent(cscolor[0]);
        let green = this.generatecolorcomponent(cscolor[1]);
        let blue = this.generatecolorcomponent(cscolor[2]);
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
  },
  
  hex2cscolor: function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255
      ] : [0,0,0];
  },

  modifygslp: function (elements, key, value) {
    let cmd = elements.map(name => `${name}.${key} = ${value}`).join(';');
    console.log(cmd);
    cdy.evokeCS(cmd);
  },

  createinput: function(key, value, elements, allequal) {  
    elstr = '[' + elements.map(name=>`'${name}'`).join(',') + ']';
    keystr = `'${key}'`;
    if(typeof(value)=='boolean') {
      return `<input type="checkbox" name="${key}" ${value ? 'checked' : ''} onchange="Inspector.modifygslp(${elstr}, ${keystr}, this.checked)"></div>`;
    } else if(typeof(value)=='number') {
      var min = 0;
      var max = 20;
      if(key=='alpha') {
        min = 0;
        max = 1;
      }
      return `<input type="range" name="${name}.${key}" value="${value}" step=".01"   min="${min}" max="${max}" onchange="Inspector.modifygslp(${elstr}, ${keystr}, this.value); o${key}.value = this.value"><output name="o${key}" id="o${key}" for="${key}">${value}</output></div>`;
    } else if(Array.isArray(value)) {
      if(key=="color") {
        let mval = Math.max(value[0],value[1],value[2]);
        if(mval>1) { // I do not undestand why this sometimes
          value = [value[0]/mval, value[1]/mval, value[2]/mval];
        }
        return `<input type="color" name="${key}" value="${this.cscolor2hex(value)}" onchange="Inspector.modifygslp(${elstr}, ${keystr}, '[' + Inspector.hex2cscolor(this.value) + ']'); o${key}.value = '[' + Inspector.niceprint(Inspector.hex2cscolor(this.value)) + ']'"><output name="o${key}" id="o${key}" for="${key}">[${this.niceprint(value)}]</output></div>`;
      } else if(key=="pos" && value[2]!=0) {
          keystr = "'xy'";
          value = [value[0]/value[2],value[1]/value[2]];
      }      
      return `<input type="text" name="${name}.${key}" value="[${this.niceprint(value)}]" onchange="Inspector.modifygslp(${elstr}, ${keystr}, this.value)"></div>`;
    }
    return `<input type="text" name="${name}.${key}" value="${value}" onchange="Inspector.modifygslp(${elstr}, ${keystr}, this.value)"></div>`;
  }
};
