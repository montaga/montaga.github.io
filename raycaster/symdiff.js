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

var csfun1 = function(oper, a, b) {
  return {
    "ctype": "function",
    "oper": oper + "$1",
    "args": [a],
    "modifs": {}
  };
};

var csfun2 = function(oper, a, b) {
  return {
    "ctype": "function",
    "oper": oper + "$2",
    "args": [a, b],
    "modifs": {}
  };
};

var diff = {
  "sin$1": x => csfun1("cos", x),
  "cos$1": x => csfun2("sub", real(0), csfun1("sin", x)),
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

var isval = function(ex, v) {
  return (ex && ex.ctype === "number" && ex.value.imag === 0 && ex.value.real === v);
};

//replaces 1*a->a, 0*a->0, a+0->a, a-0 = a; a^1->a
var simplify = function(ex) {
  if (ex.args) {
    ex.args = ex.args.map(simplify);
  }
  if (ex.oper === "add$2" || ex.oper === "+") {
    if (isval(ex.args[0], 0)) return (ex.args[1]);
    if (isval(ex.args[1], 0)) return (ex.args[0]);

  }
  if (ex.oper === "sub$2" || ex.oper === "-") {
    if (isval(ex.args[1], 0)) return (ex.args[0]);
  } else if (ex.oper === "mult$2" || ex.oper === "*") {
    if (isval(ex.args[0], 0)) return real(0);
    if (isval(ex.args[1], 0)) return real(0);
    if (isval(ex.args[0], 1)) return (ex.args[1]);
    if (isval(ex.args[1], 1)) return (ex.args[0]);
  } else if (ex.oper === "pow$2" || ex.oper === "^") {
    if (isval(ex.args[1], 1)) return (ex.args[0]);
  }
  return ex;
};

CindyJS.registerPlugin(1, "symdiff", function(api) {
  var symdiff = function(ex, vmap) {
    if (ex.ctype === "variable") {
      if (vmap[ex.name])
        return vmap[ex.name];
      else
        return real(0);
    } else if (ex.ctype === "number") {
      return real(0);
    } else if (ex.ctype === "infix") {
      let a = ex.args[0];
      let b = ex.args[1];
      let da = symdiff(ex.args[0], vmap);
      let db = symdiff(ex.args[1], vmap);
      if (ex.oper === "*") {
        return csfun2("add", csfun2("mult", a, db), csfun2("mult", da, b));
      } else if (ex.oper === "/") {
        return csfun2("div", csfun2("sub", csfun2("mult", da, b), csfun2("mult", a, db)), csfun2("mult", b, b));
      } else if (ex.oper === "+") {
        return csfun2("add", da, db);
      } else if (ex.oper === "-") {
        return csfun2("sub", da, db);
      } else if (ex.oper === "^") { //assume exponent is constant
        if(b.ctype === "number")
          return csfun2("mult", csfun2("mult", b, csfun2("pow", a, real(b.value.real-1))), da);
        else if(isval(db, 0))
          return csfun2("mult", csfun2("mult", b, csfun2("pow", a, csfun2("sub", b, real(1)))), da);
      } else if (ex.oper === ";") { //assume no variable now depends on vmap
        return db;
      }
    } else if (ex.ctype === "function") {
      let myfun = api.getMyfunction(ex.oper);

      if (myfun) {
        let res = real(0);
        let rmap = {};
        for (let i in ex.args) {
          let vname = myfun.arglist[i].name;
          rmap[vname] = ex.args[i];
        }

        for (let i in ex.args) {
          let dx = symdiff(ex.args[i], vmap);
          if (!isval(dx, 0)) {
            let vname = myfun.arglist[i].name;
            let nvmap = {};
            nvmap[vname] = real(1);
            let df = symdiff(cloneExpression(myfun.body), nvmap);

            res = csfun2("add", res,
              csfun2("mult", recreplace(df, rmap), dx)
            );
          }
        }
        return res;
        //return symdiff(cloneExpression(myfun.body), nvmap);
      } else if (diff[ex.oper]) {
        return csfun2("mult", diff[ex.oper](ex.args[0]), symdiff(ex.args[0], vmap));
      }
    }
    if (ex.oper) {
      console.error("do not know hot to diff oper " + ex.oper);
    } else {
      console.error('dont know how to diff');
      console.log(ex);
    }
    return real(0);
  };

  //this computes the symbolic differentation of a function and inserts its symbolic expreassion as # in the second argument, which will be evaluated then.
  //usual usage symdiff(x^5, x, dxf(x,y,z):=#);
  api.defineFunction("symdiff", 3, function(args, modifs) {
    vmap = {};
    vmap[args[1].name] = real(1);

    let diffex = simplify(symdiff(cloneExpression(args[0]), vmap));

    return api.evaluate(
      recreplace(cloneExpression(args[2]), {
        '#': diffex
      }) //we need cloneExpression here to force a new function generation
    );
  });
});
