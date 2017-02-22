var N = 500; //maximal number of computed pixels per refinecpucolorplot()
var startidx = 0;
var id; //id = ctx.createImageData(0, 0, iw, ih);

var prog;
var coord;
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
  var m = api.getInitialMatrix();
  var xx = px - m.tx;
  var yy = py + m.ty;
  var x = (xx * m.d - yy * m.b) / m.det;
  var y = -(-xx * m.c + yy * m.a) / m.det;
  return {
    x: x,
    y: y
  };
};

function computeLowerLeftCorner(api) {
  var ch = api.instance['canvas']['clientHeight'];
  return transf(api, 0, ch);
}

function computeLowerRightCorner(api) {
  var cw = api.instance['canvas']['clientWidth'];
  var ch = api.instance['canvas']['clientHeight'];
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

  function refine(api, prog, coord) {
    var cw = api.instance['canvas']['clientWidth']; //CSS pixels
    var ch = api.instance['canvas']['clientHeight'];

    var iw = api.instance['canvas']['width']; //internal measures. might be twice as cw on HiDPI-Displays
    var ih = api.instance['canvas']['height'];


    var ul = computeUpperLeftCorner(api);
    var ll = computeLowerLeftCorner(api)
    var lr = computeLowerRightCorner(api)

/*
    let likenvironment = function(x, y, S) {
      let ret = true;
      for (let c = 0; c < 3 && ret; c++) {
        ret = ret && id.data[4 * (y * iw + x) + c] === 178;
        ret = ret && id.data[4 * (y * iw + x-2*S) + c] === 178;
        ret = ret && id.data[4 * (y * iw + x+(2*S)) + c] === 178;
        ret = ret && id.data[4 * ((y+2*S) * iw + x) + c] === 178;
        ret = ret && id.data[4 * ((y-2*S) * iw + x) + c] === 178;
      }
      return ret;

      //let ret = true;
      for (let c = 0; c < 4 && ret; c++) {
        let tval = id.data[4 * (y * iw + x) + c];
        ret = ret && tval == id.data[4 * (y * iw + x - S) + c];
        ret = ret && tval == id.data[4 * (y * iw + x + 2 * S) + c];
        ret = ret && tval == id.data[4 * ((y - S) * iw + x) + c];
        ret = ret && tval == id.data[4 * ((y + 2 * S) * iw + x) + c];
      }
      return ret;
    };*/

    var idx = 0;
    var S = 1;
    while (S < iw && S < ih) S *= 2;
    running = true;
    while (running && S >= 1) {
      var add = Math.floor(iw / S) * Math.floor(ih / S);
      if (idx + add <= startidx)
        idx += add;
      else
        for (var x = 0; x < iw && running; x += S) {
          var add = Math.floor(ih / S);
          if (idx + add <= startidx)
            idx += add;
          else
            for (var y = 0; y < ih; y += S) {
              /*
              if (S <= 32 && likenvironment(x, y, S)) { //trick to accellerate raycasting with almost equal colored background
                //console.log("skip");
                idx++;
                startidx++;
              } else*/ if (startidx <= idx && idx < startidx + N) {
                coord.value[0].value.real = ll.x + (x + S / 2) * (lr.x - ll.x) / iw;
                coord.value[1].value.real = ul.y + (y + S / 2) * (ll.y - ul.y) / ih;

                var col = api.evaluate(prog);

                var r = 0,
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

                for (var dx = 0; dx < S; dx++)
                  for (var dy = 0; dy < S; dy++) {
                    var pidx = 4 * ((y + dy) * iw + x + dx);
                    id.data[pidx + 0] = r * 255;
                    id.data[pidx + 1] = g * 255;
                    id.data[pidx + 2] = b * 255;
                    id.data[pidx + 3] = a * 255;
                  }
              } else if (idx >= startidx + N) {
                running = false;
                break;
              }
              idx++;
            }

        }
      S /= 2;
    }

    var ctx = mycanvas.getContext('2d');
    ctx.putImageData(id, 0, 0);



    //compileAndRender(prog, computeLowerLeftCorner(api), computeLowerRightCorner(api), iw, ih, null);
    startidx += N;
    var csctx = api.instance['canvas'].getContext('2d');
    csctx.drawImage(mycanvas, 0, 0, iw, ih, 0, 0, cw, ch);
  };

  api.defineFunction("cpucolorplot", 1, function(args, modifs) {
    initIfRequired();
    var iw = api.instance['canvas']['width']; //internal measures. might be twice as cw on HiDPI-Displays
    var ih = api.instance['canvas']['height'];
    if (mycanvas.width != iw) mycanvas.width = iw;
    if (mycanvas.width != ih) mycanvas.height = ih;
    if (!id) {
      var ctx = mycanvas.getContext('2d');
      id = ctx.createImageData(iw, ih);
    }

    coord = turnIntoCSList([0, 0].map(real));
    prog = recreplace(cloneExpression(args[0]), {
      '#': coord
    });
    startidx = 0;
    refine(api, prog, coord);

    return api.nada;
  });

  api.defineFunction("refinecpucolorplot", 1, function(args, modifs) {
    refine(api, prog, coord);
    return api.nada;
  });

  api.defineFunction("cpucolorplotlast", 0, function(args, modifs) {
    var cw = api.instance['canvas']['clientWidth']; //CSS pixels
    var ch = api.instance['canvas']['clientHeight'];

    var csctx = api.instance['canvas'].getContext('2d');
    csctx.drawImage(mycanvas, 0, 0, mycanvas.width, mycanvas.height, 0, 0, cw, ch);
  });
});
