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
      <div id="colorwheel">
        <div id="colorwheelCanvas"></div>
        <script id="colorwheelinit" type="text/x-cindyscript">
          rgb2hsl(rgb) := (
            maxv = max(rgb);
            minv = min(rgb);
            l = (maxv + minv) / 2;
            if(maxv==minv,
            	h = 0;// achromatic
              s = 0;
              ,
              d = maxv-minv;
              s = if(l>.5, d/(2-maxv-minv), d/(maxv+minv));
              if(maxv==rgb_1, h = (rgb_2 - rgb_3) / d + if(rgb_3 < rgb_2, 6, 0));
              if(maxv==rgb_2, h = (rgb_3 - rgb_1) / d + 2);
              if(maxv==rgb_3, h = (rgb_1 - rgb_2) / d + 4);
               
             	h = h/6;
            );
            [h,s,l]
          );

          barycentric(p) := (
            M = inverse(transpose([B.homog, K.homog, L.homog]));
            M*[p_1,p_2,1]
          );

          invbarycentric(lambda) := (
            M = transpose([B.homog, K.homog, L.homog]);
            M*lambda
          );

          readcolor(lambda) := (
            beta = arctan2(B-A);
            basecolor = if(active, hue(beta/(2*pi)), [.5,.5,.5]);
            lambda_1*basecolor+lambda_2*[1,1,1]
          );
          
          activate(color) := (
            if(max(color)>1, color=color/max(color));//I do not understand why this sometimes happen
            active = true;
            hsl = rgb2hsl(color);
            B.xy = (cos(hsl_1*2*pi),sin(hsl_1*2*pi));
            scol = hue(hsl_1);
            mi = min(color);
            ma = max(color);
            b = [ma-mi, mi, 1-ma];
            U.homog = invbarycentric(b);
            change = false;
          );
          deactivate() := (
            active = false;
          );
          
          active = false;

          fullalpha(c) := (c_1,c_2,c_3,1);
        </script>
        <script id="colorwheeldraw" type="text/x-cindyscript">
          colorplot(
            lambda = barycentric(#);
            if(min(lambda)>=0,
               fullalpha(readcolor(lambda)),
               if(.9 < |#| & |#|<1.1,
                  phi = arctan2(#);
                  fullalpha(if(active, hue(phi/(2*pi)), [.5,.5,.5]) ),
                  [0,0,0,0]
                 )
              )
          );

          U.color = readcolor(barycentric(U.xy));
      </script>
      <script id="colorwheelmouseclick" type="text/x-cindyscript">
        p = mouse();
        if(.9 < |p| & |p|<1.1,
          B.xy = p;
          U.homog = invbarycentric(prevbarycentric);
          ,
          b = barycentric(p);
          if(max(b)<=1 & min(b)>=0,
            U.homog = invbarycentric(b);
          )
        );
        
      </script>
      <script id="colorwheelmove" type="text/x-cindyscript">
            if(mover()==B,
              U.homog = invbarycentric(prevbarycentric);
              change = true;
            );

          if(mover()==U,
             b = barycentric(U.xy);
             b = apply(b, max(0, min(1, #)));
             U.homog = invbarycentric(b);
             change = true;
            );

          prevbarycentric = barycentric(U.xy);
          if(active & change, javascript("Inspector.updatecolor('" + readcolor(barycentric(U.xy)) + "')"));
        </script>    
      </div>
    </div>
  </div>`,
  
  contents: null,
  colorwheel: null,
  
  init: function() {
    this.contents = document.getElementById('inspector-contents');
  },
  
  enter: function() {
    //init CindyJS only if it is visible
    if(!this.colorwheel) {
      this.colorwheel = CindyJS( //minified from colorwheel.html    
        {scripts:"colorwheel*",defaultAppearance:{dimDependent:.7,fontFamily:"sans-serif",lineSize:1,pointSize:5,textsize:12},angleUnit:"°",exclusive:false,geometry:[{name:"A",pinned:!0,type:"Free",visible:!1,pos:[0,0,1]},{alpha:1,args:["A"],clip:"none",color:[0,0,1],labeled:!0,name:"C0",pinned:!0,radius:1,type:"CircleMr",visible:!1,pos:{xx:1,yy:1,zz:-1,xy:0,xz:0,yz:0}},{alpha:.8,args:["C0"],color:[1,1,1],labeled:!1,name:"B",pinned:!1,size:8,type:"PointOnCircle",visible:!0,pos:[.9213086331205577,.38883210070354246,1]},{alpha:0,color:[1,1,1],labeled:!1,name:"C",pinned:!1,size:5,type:"Free",visible:!1,pos:[-.9484732824427479,.8897276260746392,1]},{name:"D",pinned:!1,type:"Free",visible:!1,pos:[.8146924027371624,.9281276260746393,1]},{name:"E",type:"Free",visible:!1,pos:[-.948473282442748,-.9675572519083969,1]},{name:"F",type:"Free",visible:!1,pos:[1,-.5561272667786816,.6997448157198827]},{alpha:1,args:["B","A"],name:"C1",pinned:!1,type:"CircleMP",visible:!1},{args:["C0","C1"],labeled:!0,name:"Ps0",pinned:!1,type:"IntersectCirCir"},{args:["Ps0"],name:"G",pinned:!1,type:"SelectP",visible:!1,pos:[.7973927935764156,-.603460630656549,1]},{alpha:1,args:["G","B"],clip:"none",color:[0,0,1],labeled:!0,name:"C2",overhang:1,pinned:!1,size:1,type:"CircleMP",visible:!1},{alpha:0,args:["Ps0"],color:[1,0,0],labeled:!1,name:"H",pinned:!1,size:4.61,type:"SelectP",visible:!1,pos:[.12391583954414188,.9922927313600913,1]},{alpha:1,args:["H","B"],clip:"none",color:[0,0,1],labeled:!0,name:"C3",overhang:1,pinned:!1,size:1,type:"CircleMP",visible:!1},{args:["C0","C3"],labeled:!0,name:"Ps1",pinned:!1,type:"IntersectCirCir"},{alpha:0,args:["Ps1"],color:[1,0,0],labeled:!1,name:"K",pinned:!1,size:4.61,type:"SelectP",visible:!1,pos:[-.7973927935764156,.6034606306565486,1]},{args:["C0","C2"],labeled:!0,name:"Ps2",pinned:!1,type:"IntersectCirCir"},{alpha:0,args:["Ps2"],color:[1,0,0],labeled:!1,name:"L",pinned:!1,size:4.61,type:"SelectP",visible:!1,pos:[-.12391583954414201,-.9922927313600913,1]},{alpha:0,color:[1,1,1],labeled:!1,name:"M",pinned:!1,size:5,type:"Free",visible:!1,pos:[1,-.9528153834823596,-.6903820816864296]},{alpha:0,color:[1,1,1],labeled:!1,name:"N",pinned:!1,size:5,type:"Free",visible:!1,pos:[1,.985036835099836,.7137288005033846]},{alpha:0,color:[1,1,1],labeled:!1,name:"O",pinned:!1,size:5,type:"Free",visible:!1,pos:[.9869960988296488,1,-.6814044213263979]},{alpha:0,color:[1,1,1],labeled:!1,name:"P",pinned:!1,size:5,type:"Free",visible:!1,pos:[-.9547105579119286,1,-.6814044213263979]},{alpha:0,color:[1,1,1],labeled:!1,name:"Q",pinned:!1,size:5,type:"Free",pos:[1,-.9649234829217541,-.5132223310479922]},{alpha:0,color:[1,1,1],labeled:!1,name:"R",pinned:!1,size:5,type:"Free",pos:[1,.9746177131831282,.5183784864743203]},{alpha:0,color:[1,1,1],labeled:!1,name:"S",pinned:!1,size:5,type:"Free",pos:[.9903006789524735,1,-.5082444228903977]},{alpha:0,color:[1,1,1],labeled:!1,name:"T",pinned:!1,size:5,type:"Free",pos:[-.9804504549313998,1,-.5082444228903977]},{alpha:1,color:[.8015385103893122,.39087848746973164,.13772308377993725],labeled:!1,name:"U",pinned:!1,size:5,type:"Free",pos:[.47716696671629083,.14429131220616537,1]},{alpha:0,color:[1,1,1],labeled:!1,name:"V",size:5,type:"Free",pos:[1,-.9720864193788861,-.4084177708495713]},{alpha:0,color:[1,1,1],labeled:!1,name:"W",size:5,type:"Free",pos:[1,.9798423573317554,.4116763935670684]},{alpha:0,color:[1,1,1],labeled:!1,name:"X",size:5,type:"Free",pos:[.9922660479505029,1,-.40525908739365823]},{alpha:0,color:[1,1,1],labeled:!1,name:"Y",size:5,type:"Free",pos:[-.984411770328131,1,-.40525908739365823]},{alpha:0,color:[1,1,1],labeled:!1,name:"Z",size:5,type:"Free",pos:[1,-.976819984506868,-.33915857605177996]},{alpha:0,color:[1,1,1],labeled:!1,name:"P0",size:5,type:"Free",pos:[1,.9832832939593279,.34140268127612683]},{alpha:0,color:[1,1,1],labeled:!1,name:"P1",size:5,type:"Free",pos:[.9935691318327976,1,-.33697749196141485]},{alpha:0,color:[1,1,1],labeled:!1,name:"P2",size:5,type:"Free",pos:[-.9870382115976035,1,-.33697749196141485]}],ports:[{id:"colorwheelCanvas",transform:[{visibleRect:[-1.2,-1.2,1.2,1.2]}]}],use:["CindyGL"],autoplay:!1,behavior:[]
      });
    }
    
    cdy.evokeCS(`javascript("Inspector.update('" + (selpts++sellns++selcns) + "')")`);
  },
  
  leave: function() {
    if(this.colorwheel) {
      this.colorwheel.evokeCS('deactivate()');
    }
  },
  
  update: function(str) {
    if(document.getElementById('inspector-window').style.display=="none")
      return;
    
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
        if(!elementswithkey[key]) elementswithkey[key] = [];
        elementswithkey[key].push(i);
      }
    }
    
    if(!elementswithkey.hasOwnProperty("color")) {
      if(this.colorwheel) {
        this.colorwheel.evokeCS('deactivate()');
      }
    };
    
    for(let key in elementswithkey) {
      if(key == "type" || key=="args" || key=="name") continue;
      if(elementswithkey[key].length==0) continue;
      let firstel = els[elementswithkey[key][0]];  
      let value = firstel[key];
      let allequal = true;
      for(let j = 1; allequal && j<elementswithkey[key].length; j++) {
        if(JSON.stringify(els[elementswithkey[key][j]][key]) != JSON.stringify(value)) allequal = false;
      }
      let elnames = elementswithkey[key].map(i=>els[i].name);
      if(key=="color") {
        this.colorelements = elnames;
        if(this.colorwheel) this.colorwheel.evokeCS(`activate([${value}])`);
      } else {
          innerhtml += `<div><span style="color:rgb(150,150,150)">${elnames}</span> <label for="${key}">${key}: </label>${this.createinput(key, value, elnames, allequal)}`;
      }
      
    }
    this.contents.innerHTML = innerhtml;
  },
  
  updatecolor: function(color) {
    for(let i in this.colorelements) {
      let el = this.colorelements[i];
      cdy.evokeCS(`${el}.color = ${color}`);
    }
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
        if(mval>1) { // I do not undestand why this happens sometimes
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
