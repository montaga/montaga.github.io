CindyJS.registerPlugin(1, "shapeop", function(api) {
  var real = function(r) {
    return {
      "ctype": "number",
      "value": {
        'real': r,
        'imag': 0
      }
    };
  };
  
  var turnIntoCSList = function(l) {
    return {
      'ctype': 'list',
      'value': l
    };
  };

  
  api.defineFunction("dst", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    var a = api.evaluate(args[1]);
    var ans = 0;
    if (a.type === "polygon") {
        ans = 1e10;
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt = a.value[j][i];
            ans = Math.min(ans,Math.hypot(pt.X-x.x,pt.Y-x.y));
        }}
    }
    return real(ans);
  });
  
  api.defineFunction("scnfdst", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    var a = api.evaluate(args[1]);
    var ans = 0;
    if (a.type === "polygon") {
        ans = 1e10;
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt = a.value[j][i];
            ans = Math.min(ans,Math.abs( Math.atan2(x.x,x.y)-Math.atan2(pt.X,pt.Y)) <0.02 ? Math.hypot(pt.X-x.x,pt.Y-x.y) : Math.hypot(x.x,x.y)+Math.hypot(pt.X,pt.Y));
        }}
    }
    return real(ans);
  });
  
  api.defineFunction("riverdst", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    var a = api.evaluate(args[1]);
    var ans = 0;
    if (a.type === "polygon") {
        ans = 1e10;
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt = a.value[j][i];
            ans = Math.min(ans, Math.abs(x.x-pt.X) <1e-4 ? Math.abs(pt.Y-x.y) : Math.abs(pt.X-x.x)+Math.abs(x.y)+Math.abs(pt.Y));
        }}
    }
    return real(ans);
  });
  
  
  api.defineFunction("manhattendst", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    var a = api.evaluate(args[1]);
    var ans = 0;
    if (a.type === "polygon") {
        ans = 1e10;
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt = a.value[j][i];
            ans = Math.min(ans,(Math.abs(pt.X-x.x) + Math.abs(pt.Y-x.y)));
        }}
    }
    return real(ans);
  });
  
  api.defineFunction("boxdst", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    var a = api.evaluate(args[1]);
    var ans = 0;
    if (a.type === "polygon") {
        ans = 1e10;
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt = a.value[j][i];
            ans = Math.min(ans,Math.max(Math.abs(pt.X-x.x), Math.abs(pt.Y-x.y)));
        }}
    }
    return real(ans);
  });
  
  var ccw = function(a, b, c) {
    var det = (
      a.X*b.Y +
      b.X*c.Y +
      c.X*a.Y -
      a.X*c.Y -
      b.X*a.Y -
      c.X*b.Y);
    return det>0;
  };
  
  var bool = function(b) {
      return {
          ctype: "boolean",
          value: b
      };
  };
  
  api.defineFunction("inside", 2, function(args, modifs) {
    var x = api.extractPoint(api.evaluate(args[0]));
    
    x.X = x.x;
    x.Y = x.y;
    
    var a = api.evaluate(args[1]);
    var cnt = 0;
    if (a.type === "polygon") {
        for (j = 0; j < a.value.length; j++) {
        for (i = 0; i < a.value[j].length; i++) {
            var pt0 = a.value[j][i];
            var pt1 = a.value[j][(i+1)%a.value[j].length];
            var m0 = pt0.Y<pt1.Y ? pt0:pt1;
            var m1 = pt0.Y<pt1.Y ? pt1:pt0;
            if(m0.Y <= x.Y && x.Y < m1.Y) {
              if(ccw(m0, m1, x)) cnt++;
            }
        }}
    }
    return bool(cnt%2==1);
  });
});
