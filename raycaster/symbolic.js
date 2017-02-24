CindyJS.registerPlugin(1, "symbolic", function(api) {

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

  var fun = function(oper, args) {
    return {
      "ctype": "function",
      "oper": oper,
      "args": args,
      "modifs": {}
    };
  };

  var difffun = {
    "sin$1": x => [fun("cos$1", [x[0]])],
    "cos$1": x => [fun("sub$2", [real(0), fun("sin$1", [x[0]])])],
    "add$2": x => [real(1), real(1)],
    "sub$2": x => [real(1), real(-1)],
    "mult$2": x => [x[1], x[0]],
    "div$2": x => [
      fun("div$2", [real(1), x[1]]),
      fun("div$2", [fun("sub$2", [real(0), x[0]]), fun("mult$2", [x[1], x[1]])])
    ],
    "pow$2": x => [
      fun("mult$2", [x[1], fun("pow$2", [x[0], fun("sub$2", [x[1], real(1)])])]),
      fun("mult$2", [fun("log$1", [x[0], fun("pow$2", [x[0], x[1]])])])
    ],
    ";": x => (x[1].ctype == "void") ? [real(1), real(0)] : [real(0), real(1)],
  };

  var oo = Infinity;

  var degfun = {
    "sin$1": (x, vmap) => Infinity,
    "cos$1": (x, vmap) => Infinity,
    "add$2": (x, vmap) => Math.max(degree(x[0], vmap), degree(x[1], vmap)),
    "sub$2": (x, vmap) => Math.max(degree(x[0], vmap), degree(x[1], vmap)),
    "mult$2": (x, vmap) => degree(x[0], vmap) + degree(x[1], vmap),
    "div$2": (x, vmap) => degree(x[1], vmap) === 0 ? degree(x[0], vmap) : Infinity,
    "pow$2": (x, vmap) => degree(x[1], vmap) === 0 ? degree(x[0], vmap) * api.evaluate(x[1]).value.real : Infinity,
    ";": function(x, vmap) {
      if (x[1].ctype === "void") {
        return degree(x[0], vmap);
      } else {
        api.evaluate(x[0]);
        return degree(x[1], vmap);
      }
    }
  };

  var opmap = {};
  opmap['+'] = 'add$2';
  opmap['-'] = 'sub$2';
  opmap['*'] = 'mult$2';
  opmap['/'] = 'div$2';
  opmap['^'] = 'pow$2';




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

      if (ex.args.every(e => e.ctype === 'number')) {
        return api.evaluate(ex);
      }
    }
    if (ex.oper === "add$2" || ex.oper === "+") {
      if (isval(ex.args[0], 0)) return (ex.args[1]);
      if (isval(ex.args[1], 0)) return (ex.args[0]);
    } else if (ex.oper === "sub$2" || ex.oper === "-") {
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

  var symdiff = function(ex, vmap) {
    if (ex.ctype === "variable") {
      if (vmap[ex.name])
        return vmap[ex.name];
      else
        return real(0);
    } else if (ex.ctype === "number") {
      return real(0);
    } else if (ex.ctype === "infix" || ex.ctype === "function") {
      let myfun = api.getMyfunction(ex.oper);


      let res = real(0);

      let rmap = {};
      if (myfun) {
        for (let i in ex.args) {
          let vname = myfun.arglist[i].name;
          rmap[vname] = ex.args[i];
        }
      }

      for (let i in ex.args) {
        let dx = symdiff(ex.args[i], vmap);
        let df = real(0);
        if (!isval(dx, 0)) {
          if (myfun) {
            let vname = myfun.arglist[i].name;
            let nvmap = {};
            nvmap[vname] = real(1);
            df = recreplace(symdiff(cloneExpression(myfun.body), nvmap), rmap);
          } else if (difffun[opmap[ex.oper] || ex.oper]) {
            df = difffun[opmap[ex.oper] || ex.oper](ex.args)[i];
          }
          if (!isval(df, 0)) {
            if (!isval(dx, 1))
              df = fun("mult$2", [df, dx]);

            if (isval(res, 0))
              res = df;
            else
              res = fun("add$2", [res, df]);
          }
        }
      }
      return res;
    }
    console.error('Do not know how to differentiate:');
    console.log(ex);
    return real(0);
  };

  //this computes the symbolic differentation of a function and inserts its symbolic expreassion as # in the third argument, which will be evaluated then.
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

  //this simplifies a function and inserts its symbolic expreassion as # in the second argument, which will be evaluated then.
  //usual usage simplify(x^5*x^4, f(x):=#);
  api.defineFunction("simplify", 2, function(args, modifs) {
    return api.evaluate(
      recreplace(cloneExpression(args[1]), {
        '#': simplify(cloneExpression(args[0]))
      }) //we need cloneExpression here to force a new function generation
    );
  });

  var degree = function(ex, vmap) {
      if (ex.ctype === "variable") {
        if (vmap[ex.name])
          return vmap[ex.name];
        else
          return 0;
      } else if (ex.ctype === "number") {
        return 0;
      } else if (ex.ctype === "infix" || ex.ctype === "function") {
        if (ex.oper!=";" && ex.args.every(e => degree(e, vmap) === 0)) return 0;
        let myfun = api.getMyfunction(ex.oper);

        if (myfun) {
          let nvmap = {};
          for (let i in ex.args) {
            let vname = myfun.arglist[i].name;
            nvmap[vname] = degree(ex.args[i], vmap);
          }
          return degree(simplify(cloneExpression(myfun.body)), nvmap);
        }
        let cdegfun = degfun[opmap[ex.oper] || ex.oper];
        if (cdegfun)
          return cdegfun(ex.args, vmap);
      } else if(ex.ctype === "void")
        return 0;
      console.log("Do not know how to compute degree of:");
      console.log(ex);
      return oo;
    }
    //this computes the degree of an expression (or an upper bound if the expression cannot be simplified).
    //The variables (up to 3) have to be given as the consecutive arguments.
    //If the function is not an polynomial in the variables then -1 is returned
    //usual usage degree(x^5*y^2+x*a^10, x, y) == 7;

  for (let n = 1; n <= 3; n++) {
    api.defineFunction("degree", 1 + n, function(args, modifs) {
      let vmap = {};
      for (let i in args)
        if (i >= 1) {
          if (args[i].ctype === 'variable')
            vmap[args[i].name] = 1;
          else
            return nada;
        }

      let deg = degree(simplify(cloneExpression(args[0])), vmap);
      if (deg == oo) deg = -1;
      return real(deg);
    });
  }


});
