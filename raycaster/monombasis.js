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

var sumdict = function (a, b) {
  let r = {};
  for(let i in a) {
    r[i] = a[i];
  }
  for(let i in b) {
    r[i] = r[i] || 0;
    r[i] = r[i] + b[i];
  }
  return r;
};

var subdict = function (a, b) {
  let r = {};
  for(let i in a) {
    r[i] = a[i];
  }
  for(let i in b) {
    r[i] = r[i] || 0;
    r[i] = r[i] - b[i];
  }
  return r;
};

var decomposeexp = function(a) {
  a = a.split(':');
  return [0,1,2].map(i => (a[i]|0) );
};

var sumexps = function(a, b) {
  a = a.split(':');
  b = b.split(':');
  return [0,1,2].map(i => (a[i]|0) + (b[i]|0)).join(':');
};

var multdict = function(a, b) {
  r = {};
  for(let ae in a) {
    for(let be in b) {
        se = sumexps(ae, be);
        r[se] = r[se] || 0;
        r[se] += (a[ae]*b[be]);
    }
  }
  return r;
};

var power = function(poly, s) {
  //exponentiating by squaring
  if(s === 0) return {'0:0:0': 1};
  else if(s&1) return multdict(power(poly, s-1), poly);
  else {
    r = power(poly, s/2);
    return multdict(r, r);
  }
};



CindyJS.registerPlugin(1, "monombasis", function(api) { 
  
  var monombasis = function(ex) {
    var v0 = api.evaluate(ex);
    if(v0 !== api.nada) {
      return {
        '0:0:0': v0.value.real
      };
    } else { //ex contains a variable
      if(ex.ctype === "variable") {
        let r = {};
        r[["x","y","z"].map(a => a == ex.name ? 1 : 0).join(':')] = 1;
        return r;
      } else if(ex.ctype === "infix") {
        let a = monombasis(ex.args[0]);
        let b = monombasis(ex.args[1]);
        if(ex.oper==="*") {
          return multdict(a, b);
        } else if(ex.oper==="+") {
          return sumdict(a, b);
        } else if(ex.oper==="-") {
          return subdict(a, b);
        } else if(ex.oper==="^") {
          return power(a, b["0:0:0"]);
        }
      }
    }
  };
    api.defineFunction("monombasis", 1, function(args, modifs) {      
      let basis = monombasis(args[0]);
      let exps = [];
      let coeff = [];
      for(let ex in basis) {
        coeff.push(real(basis[ex]));
        exps.push(
          turnIntoCSList(decomposeexp(ex).map(real))
        );
      }
      return turnIntoCSList([turnIntoCSList(coeff), turnIntoCSList(exps)]);
      /*
        return {
            ctype: "string",
            value: "Hello, " + api.instance.niceprint(arg0)
        };*/
    });
});
