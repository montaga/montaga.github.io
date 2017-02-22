var N = 1000; //maximal number of computed pixels per refinecpucolorplot()

/**
 * clones expression while ignoring  pointer-references to the same child
 */
function cloneExpression(obj) {
  var copy;
  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;
  // Handle Object
  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneExpression(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (['oper',
            'impl',
            'args',
            'ctype',
            'stack',
            'name',
            //'modifs',
            'arglist',
            'value',
            'real',
            'imag',
            'key',
            'obj',
            'body'
          ].indexOf(attr) >= 0)
          copy[attr] = cloneExpression(obj[attr]);
        //else console.log("Did not clone " + attr);
        if (obj['modifs']) copy['modifs'] = obj['modifs']; //modifs cannot be handeled in recursion properly
      }
    }
    return copy;
  }
}

var turnIntoCSList = function(l) {
  return {
    'ctype': 'list',
    'value': l
  };
};

var real = function(r) {
  return {
    "ctype": "number",
    "value": {
      'real': r,
      'imag': 0
    }
  };
};

var recreplace = function(ex, rmap) {
  if (ex.ctype === "variable" && rmap[ex.name]) {
    return rmap[ex.name];
  } else {
    if (ex.args)
      ex.args = ex.args.map(e => recreplace(e, rmap));
    return ex;
  }
};


var mycanvas;

function transf(api, px, py) { //copied from Operators.js
  let m = api.getInitialMatrix();
  let xx = px - m.tx;
  let yy = py + m.ty;
  let x = (xx * m.d - yy * m.b) / m.det;
  let y = -(-xx * m.c + yy * m.a) / m.det;
  return {
    x: x,
    y: y
  };
};

function computeLowerLeftCorner(api) {
  let ch = api.instance['canvas']['clientHeight'];
  return transf(api, 0, ch);
}

function computeLowerRightCorner(api) {
  let cw = api.instance['canvas']['clientWidth'];
  let ch = api.instance['canvas']['clientHeight'];
  return transf(api, cw, ch);
}

function computeUpperLeftCorner(api) {
  return transf(api, 0, 0);
}

function initIfRequired() {
  if (mycanvas)
    return;
  mycanvas = (document.createElement("canvas"));
  mycanvas.id = "mycanvas";
  mycanvas.style.display = "none";
  mycanvas.width = mycanvas.height = 0;
  document.body.appendChild(mycanvas);
};

CindyJS.registerPlugin(1, "cpucolorplot", function(api) {
  api.defineFunction("cpucolorplot", 2, function(args, modifs) {
    initIfRequired();
    let factor = api.evaluate(args[1]).value.real;
    coord = turnIntoCSList([0, 0].map(real));
    let prog = recreplace(cloneExpression(args[0]), {
      '#': coord
    });

    let cw = api.instance['canvas']['clientWidth']; //CSS pixels
    let ch = api.instance['canvas']['clientHeight'];

    let iw = api.instance['canvas']['width']; //internal measures. might be twice as cw on HiDPI-Displays
    let ih = api.instance['canvas']['height'];
    iw /= factor;
    ih /= factor;
    iw = Math.round(iw);
    ih = Math.round(ih);
    mycanvas.width = iw;
    mycanvas.height = ih;
    let ctx = mycanvas.getContext('2d');
    if(!id)
      id = ctx.createImageData(iw, ih);

    let ul = computeUpperLeftCorner(api);
    let ll = computeLowerLeftCorner(api)
    let lr = computeLowerRightCorner(api)

    for (let x = 0; x < iw; x++) {
      for (let y = 0; y < ih; y++) {
        idx = 4 * (y * iw + x);

        coord.value[0].value.real = ll.x + (x+.5) * (lr.x - ll.x) / iw;
        coord.value[1].value.real = ul.y + (y+.5) * (ll.y - ul.y) / ih;


        let col = api.evaluate(prog);

        let r = 0,
          g = 0,
          b = 0,
          a = 1;
        if (col.ctype === 'number') {
          r = g = b = col.value.real;
        } else if (col.ctype === 'list' && col.value.length === 3) {
          r = col.value[0].value.real;
          g = col.value[1].value.real;
          b = col.value[2].value.real;
        } else if (col.ctype === 'list' && col.value.length === 4) {
          r = col.value[0].value.real;
          g = col.value[1].value.real;
          b = col.value[2].value.real;
          a = col.value[3].value.real;
        }

        id.data[idx + 0] = r * 255;
        id.data[idx + 1] = g * 255;
        id.data[idx + 2] = b * 255;
        id.data[idx + 3] = a * 255;
      }
    }
    ctx.putImageData(id, 0, 0);



    //compileAndRender(prog, computeLowerLeftCorner(api), computeLowerRightCorner(api), iw, ih, null);

    let csctx = api.instance['canvas'].getContext('2d');
    csctx.drawImage(mycanvas, 0, 0, iw, ih, 0, 0, cw, ch);


    /*
        let diffex = simplify(symdiff(cloneExpression(args[0]), vmap));

        return api.evaluate(
          recreplace(cloneExpression(args[2]), {
            '#': diffex
          }) //we need cloneExpression here to force a new function generation
        );
        */
    return api.nada;
  });
  
  api.defineFunction("cpucolorplotlast", 0, function(args, modifs) {
    let cw = api.instance['canvas']['clientWidth']; //CSS pixels
    let ch = api.instance['canvas']['clientHeight'];
    
    let csctx = api.instance['canvas'].getContext('2d');
    csctx.drawImage(mycanvas, 0, 0, mycanvas.width, mycanvas.height, 0, 0, cw, ch);
  });
});
