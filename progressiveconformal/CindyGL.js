(function(){
'use strict';
var cgl_resources = {"addc":"vec2 addc(vec2 a,vec2 b){\nreturn a+b;\n}\n", "addpoints":"vec2 addpoints(vec3 a,vec3 b){\nreturn dehomogenize(a) +dehomogenize(b);\n}\n", "arccosc":"vec2 arccosc(vec2 a){\nvec2 t2=multc(a,negc(a));\nvec2 tmp=sqrtc(addc(vec2(1.0,0.0),t2));\nvec2 tmp1=addc(multc(a,vec2(0.0,1.0)),tmp);\nvec2 erg=addc(multc(logc(tmp1),vec2(0.0,1.0)),vec2(pi*0.5,0.0));\nreturn erg;\n}\n", "arccosf":"vec2 arccosf(float z){\nif(abs(z)<=1.)return vec2(acos(z),0.);\nelse if(z>1.)return vec2(0,log(z+sqrt(z*z-1.)));\nelse return vec2(pi, -log(-z+sqrt(z*z-1.)));\n}\n", 
"arcsinc":"vec2 arcsinc(vec2 a){\nvec2 t2=multc(a,negc(a));\nvec2 tmp=sqrtc(addc(vec2(1.0,0.0),t2));\nvec2 tmp1=addc(multc(a,vec2(0.0,1.0)),tmp);\nvec2 erg=multc(logc(tmp1),vec2(0.0,-1.0));\nreturn erg;\n}\n", "arcsinf":"vec2 arcsinf(float z){\nif(abs(z)<=1.)return vec2(asin(z),0.);\nelse if(z>1.)return vec2(pi*.5, -log(z+sqrt(z*z-1.)));\nelse return vec2(-pi*.5,log(-z+sqrt(z*z-1.)));\n}\n", "arctan2c":"\n\n\n\nvec2 arctan2c(vec2 x,vec2 y){\nvec2 r=logc(divc(x+vec2(-y.y,y.x),sqrtc(multc(x,x)+multc(y,y))));\nreturn vec2(r.y, -r.x);\n}\n", 
"arctan2cvec2":"vec2 arctan2cvec2(cvec2 v){\nreturn arctan2c(v.real,v.imag);\n}\n", "arctan2vec2":"float arctan2vec2(vec2 v){\nreturn atan(v.y,v.x);\n}\n", "arctanc":"vec2 arctanc(vec2 a){\nvec2 t1=logc(addc(multc(a,vec2(0.0,-1.0)),vec2(1.0,0.0)));\nvec2 t2=logc(addc(multc(a,vec2(0.0,1.0)),vec2(1.0,0.0)));\nvec2 erg=multc(subc(t1,t2),vec2(0.0,0.5));\nreturn erg;\n}\n", "blue":"vec3 blue(float f)\n{\nreturn vec3(0.,0.,clamp(f,0.,1.));\n}\n", "cimag":"float imagc(vec2 a){\nreturn a.y;\n}\n", "conjugate":"vec2 conjugate(vec2 a){\nreturn vec2(a.x, -a.y);\n}\n", 
"copytexture_f":"#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform sampler2D sampler;\nvarying vec2 cgl_pixel;\n\nvoid main(void){\ngl_FragColor=texture2D(sampler,cgl_pixel);\n}\n", "copytexture_v":"attribute vec3 aPos;\nattribute vec2 aTexCoord;\nvarying vec2 cgl_pixel;\n\nvoid main(void){\ngl_Position=vec4(aPos,1.);\ncgl_pixel=aTexCoord;\n}\n", "cosc":"vec2 cosc(vec2 a){\n\nfloat n=exp(a.y);\nfloat imag1=n*sin(-a.x);\nfloat real1=n*cos(-a.x);\nn=exp(-a.y);\nfloat imag2=n*sin(a.x);\nfloat real2=n*cos(a.x);\nfloat i= (imag1+imag2) /2.0;\nfloat r= (real1+real2) /2.0;\n\nreturn vec2(r,i);\n}\n", 
"creal":"float realc(vec2 a){\nreturn a.x;\n}\n", "dehomogenize":"vec2 dehomogenize(vec3 z){\nreturn vec2(z.x,z.y)/z.z;\n}\n", "dehomogenizex":"float dehomogenizex(vec3 z){\nreturn z.x/z.z;\n}\n", "dehomogenizey":"float dehomogenizey(vec3 z){\nreturn z.y/z.z;\n}\n", "det2":"float det2(mat2 a){\nreturn a[0][0]*a[1][1] -a[0][1]*a[1][0];\n}\n", "det3":"float det3(mat3 a){\nreturn dot(cross(a[0],a[1]),a[2]);\n}\n", "det3v":"float det3v(vec3 a,vec3 b,vec3 c){\nreturn dot(cross(a,b),c);\n}\n", "det4":"float det4(mat4 a){\nfloat s00=a[0][0]*a[1][1] -a[0][1]*a[1][0],\ns01=a[0][0]*a[1][2] -a[0][2]*a[1][0],\ns02=a[0][0]*a[1][3] -a[0][3]*a[1][0],\ns03=a[0][1]*a[1][2] -a[0][2]*a[1][1],\ns04=a[0][1]*a[1][3] -a[0][3]*a[1][1],\ns05=a[0][2]*a[1][3] -a[0][3]*a[1][2],\ns06=a[2][0]*a[3][1] -a[2][1]*a[3][0],\ns07=a[2][0]*a[3][2] -a[2][2]*a[3][0],\ns08=a[2][0]*a[3][3] -a[2][3]*a[3][0],\ns09=a[2][1]*a[3][2] -a[2][2]*a[3][1],\ns10=a[2][1]*a[3][3] -a[2][3]*a[3][1],\ns11=a[2][2]*a[3][3] -a[2][3]*a[3][2];\nreturn s00*s11-s01*s10+s02*s09+s03*s08-s04*s07+s05*s06;\n}\n", 
"divc":"vec2 divc(vec2 a,vec2 b){\nreturn vec2(dot(a,b),dot(a,vec2(-b.y,b.x)))/dot(b,b);\n}\n", "divfc":"vec2 divfc(float a,vec2 b){\nreturn a*vec2(b.x,-b.y)/dot(b,b);\n}\n", "expc":"vec2 expc(vec2 a){\nfloat n=exp(a.x);\nfloat r=n*cos(a.y);\nfloat i=n*sin(a.y);\nreturn vec2(r,i);\n}\n", "float2color":"vec4 float2color(float f)\n{\nreturn vec4(f,f,f,1.);\n}\n", "gray":"vec3 gray(float f)\n{\nf=clamp(f,0.,1.);\nreturn vec3(f,f,f);\n}\n", "green":"vec3 green(float f)\n{\nreturn vec3(0.,clamp(f,0.,1.),0.);\n}\n", 
"hsv2rgb":"vec3 hsv2rgb(vec3 c)\n{\nvec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);\nvec3 p=abs(fract(c.xxx+K.xyz) *6.0-K.www);\nreturn c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);\n}\n", "hue":"vec3 hue(float a){\nreturn hsv2rgb(vec3(a,1.,1.));\n}\n", "imagc":"float imagc(vec2 a){\nreturn a.y;\n}\n", "invc":"vec2 invc(vec2 a){\nfloat n=a.x*a.x+a.y*a.y;\nreturn vec2(a.x/n,-a.y/n);\n}\n", "logc":"vec2 logc(vec2 a){\nfloat re=a.x;\nfloat im=a.y;\nfloat s=sqrt(re*re+im*im);\nfloat i=im;\nfloat imag=atan(im,re);\nif(i<0.0){\nimag+= (2.0*pi);\n}\nif(i==0.0&&re<0.0){\nimag=pi;\n}\nif(imag>pi){\nimag-= (2.0*pi);\n};\nfloat real=log(s);\n\nreturn vec2(real,imag);\n}\n", 
"logr":"vec2 logr(float a){\nif(a>=0.)return vec2(log(a),0);\nelse return vec2(log(-a),pi);\n}\n", "mat2complex":"mat4 mat2complex(mat2 a)\n{\nreturn mat4(\nvec4(a[0][0],0,a[0][1],0),\nvec4(0,a[0][0],0,a[0][1]),\nvec4(a[1][0],0,a[1][1],0),\nvec4(0,a[1][0],0,a[1][1])\n);\n}\n", "multc":"vec2 multc(vec2 a,vec2 b){\nreturn vec2(dot(a,vec2(b.x,-b.y)),dot(a,b.yx));\n}\n", "negc":"vec2 negc(vec2 a){\nreturn vec2(-a.x,-a.y);\n}\n", "powc":"vec2 powc(vec2 a,vec2 b){\nreturn(b.x==0. &&b.y==0.) ?vec2(1.,0.) : ((a.x==0. &&a.y==0.) ?vec2(0.) :expc(multc(logc(a),b)));\n}\n", 
"powi":"float powi(float a,int b){\nif(mod(float(b),2.) < .5)\nreturn pow(abs(a),float(b));\nelse\nreturn sign(a)*pow(abs(a),float(b));\n}\n", "random":"uniform float rnd_;\n\nfloat last_rnd= .1231;\nfloat random(){\nfloat a=fract(132422.21*sin(dot(plain_pixel,343433.671228*vec2(.176574+last_rnd, .1131+rnd_))));\nfloat b=fract(last_rnd*2321.2312*sin(dot(plain_pixel+vec2(rnd_,last_rnd),plain_pixel) *43758.5453));\nlast_rnd=fract(rnd_ +last_rnd+a+b);\nreturn last_rnd;\n}\n", "randomnormal":"float randomnormal(){\nreturn sqrt(-2. *log(random())) *cos(6.283185307179586*random());\n}\n", 
"realc":"float realc(vec2 a){\nreturn a.x;\n}\n", "red":"vec3 red(float f)\n{\nreturn vec3(clamp(f,0.,1.),0.,0.);\n}\n", "rgb2hsv":"vec3 rgb2hsv(vec3 c)\n{\nvec4 K=vec4(0.0, -1.0/3.0,2.0/3.0, -1.0);\nvec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));\nvec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));\n\nfloat d=q.x-min(q.w,q.y);\nfloat e=1.0e-10;\nreturn vec3(abs(q.z+ (q.w-q.y) / (6.0*d+e)),d/ (q.x+e),q.x);\n}\n", "sinc":"\n\nvec2 sinc(vec2 a){\n\nfloat n=exp(a.y);\nfloat imag1=n*sin(-a.x);\nfloat real1=n*cos(-a.x);\nn=exp(-a.y);\nfloat imag2=n*sin(a.x);\nfloat real2=n*cos(a.x);\nfloat r= -(imag1-imag2) /2.0;\nfloat i= (real1-real2) /2.0;\n\nreturn vec2(r,i);\n}\n", 
"sqrtc":"vec2 sqrtc(vec2 a){\nreturn expc(multc(logc(a),vec2(0.5,0.0)));\n}\n", "sqrtf":"vec2 sqrtf(float a){\nif(a>=0.)return vec2(sqrt(a),0.);\nelse return vec2(0.,sqrt(-a));\n}\n", "standardFragmentHeader":"#ifdef GL_ES\nprecision highp float;\nprecision highp int;\n#endif\n\n#define pi 3.141592653589793\n\nvarying vec2 cgl_pixel;\nvarying vec2 plain_pixel;\n", "subc":"vec2 subc(vec2 a,vec2 b){\nreturn a-b;\n}\n", "subpoints":"vec2 subpoints(vec3 a,vec3 b){\nreturn dehomogenize(a) -dehomogenize(b);\n}\n", 
"tanc":"vec2 tanc(vec2 a){\nvec2 s=sinc(a);\nvec2 c=cosc(a);\nreturn divc(s,c);\n}\n", "vec2complex":"vec4 vec2complex(vec2 a)\n{\nreturn vec4(a.x,0.,a.y,0);\n}\n", "vshader":"attribute vec3 aPos;\nattribute vec2 aTexCoord;\nvarying vec2 cgl_pixel;\nvarying vec2 plain_pixel;\nuniform mat3 transformMatrix;\nvoid main(void){\ngl_Position=vec4(aPos,1.);\nplain_pixel=aTexCoord;\nvec3 r=transformMatrix*vec3(plain_pixel,1);\ncgl_pixel=r.xy/r.z;\n}\n"};
var isinitialized = false;
var glcanvas;
var tmpcanvas;
var dummycanvas;
var dummyimage;
var gl;
var nada;
var can_use_texture_half_float = false;
var halfFloat;
var can_use_texture_float = false;
var use8bittextures = false;
var oo = 1 << 30;
var requiredcompiletime = 1;
var subtypegen = {};
var subtype = [];
var next = [];
function initGLIfRequired() {
  if (isinitialized) {
    return;
  }
  glcanvas = document.createElement("canvas");
  glcanvas.id = "glcanvas";
  glcanvas.style.display = "none";
  glcanvas.width = glcanvas.height = 0;
  document.body.appendChild(glcanvas);
  tmpcanvas = document.createElement("canvas");
  tmpcanvas.id = "tmpcanvas";
  tmpcanvas.style.display = "none";
  tmpcanvas.width = tmpcanvas.height = 0;
  document.body.appendChild(tmpcanvas);
  dummycanvas = document.createElement("canvas");
  dummycanvas.id = "dummycanvas";
  dummycanvas.style.display = "none";
  dummycanvas.width = dummycanvas.height = 1;
  document.body.appendChild(dummycanvas);
  dummyimage = {"ctype":"image", "value":{"img":dummycanvas, "width":1, "height":1, "ready":true, "live":false, "generation":0, "whenReady":function(f) {
    return;
  }}};
  var errorInfo = "Unknown";
  function onContextCreationError(e) {
    glcanvas.removeEventListener("webglcontextcreationerror", onContextCreationError, false);
    if (e.statusMessage) {
      errorInfo = e.statusMessage;
    }
  }
  glcanvas.addEventListener("webglcontextcreationerror", onContextCreationError, false);
  var contextAttributes = {};
  var useWebXR = typeof CindyJS._pluginRegistry.CindyXR !== "undefined";
  if (useWebXR) {
    contextAttributes["xrCompatible"] = true;
  }
  gl = glcanvas.getContext("webgl", contextAttributes);
  if (!gl) {
    gl = glcanvas.getContext("experimental-webgl", contextAttributes);
  }
  if (!gl) {
    throw new GlError("Could not obtain a WebGL context.\nReason: " + errorInfo);
  }
  CindyGL.gl = gl;
  glcanvas.removeEventListener("webglcontextcreationerror", onContextCreationError, false);
  if (!use8bittextures) {
    can_use_texture_float = gl.getExtension("OES_texture_float") && gl.getExtension("OES_texture_float_linear");
    if (!can_use_texture_float) {
      console.error("Your browser does not suppert OES_texture_float, trying OES_texture_half_float...");
      halfFloat = gl.getExtension("OES_texture_half_float");
      can_use_texture_half_float = halfFloat && gl.getExtension("OES_texture_half_float_linear");
      if (!can_use_texture_half_float) {
        console.error("Your browser does not suppert OES_texture_half_float, will use 8-bit textures.");
      }
    }
    if (navigator.userAgent.match(/(iPad|iPhone)/i)) {
      console.log("You are using an iPhone/iPad.");
      can_use_texture_float = can_use_texture_half_float = false;
      if (gl.getExtension("OES_texture_half_float") && gl.getExtension("OES_texture_half_float_linear") && gl.getExtension("EXT_color_buffer_half_float")) {
        can_use_texture_half_float = true;
      } else {
        console.error("Your browser does not suppert writing to half_float textures, we will use 8-bit textures.");
      }
    }
  }
  isinitialized = true;
}
;function cloneExpression(obj) {
  var copy;
  if (null == obj || "object" != typeof obj) {
    return obj;
  }
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
        if (["oper", "impl", "args", "ctype", "stack", "name", "arglist", "value", "real", "imag", "key", "obj", "body"].indexOf(attr) >= 0) {
          copy[attr] = cloneExpression(obj[attr]);
        }
        if (obj["modifs"]) {
          copy["modifs"] = obj["modifs"];
        }
      }
    }
    return copy;
  }
}
function expressionsAreEqual(a, b) {
  if (null == a || "object" != typeof a) {
    return a === b;
  }
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length) {
      return false;
    }
    for (var i = 0, len = a.length; i < len; i++) {
      if (!expressionsAreEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else {
    if (a instanceof Object && b instanceof Object) {
      var l = ["oper", "impl", "args", "ctype", "stack", "name", "modifs", "arglist", "value", "real", "imag", "key", "obj", "body"];
      for (var i$0 = 0; i$0 < l.length; i$0++) {
        var attr = l[i$0];
        if (!expressionsAreEqual(a[attr], b[attr])) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
function signaturesAreEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (isprimitive(a) || isprimitive(b)) {
    return a === b;
  }
  for (var key in a) {
    if (a.hasOwnProperty(key)) {
      if (!b.hasOwnProperty(key)) {
        return false;
      }
      if (!signaturesAreEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  for (var key$1 in b) {
    if (b.hasOwnProperty(key$1)) {
      if (!a.hasOwnProperty(key$1)) {
        return false;
      }
    }
  }
  return true;
}
function getPlainName(oper) {
  if (oper.indexOf("$") === -1) {
    return oper;
  } else {
    return oper.substr(0, oper.indexOf("$"));
  }
}
function guessTypeOfValue(tval) {
  if (tval["ctype"] === "boolean") {
    return type.bool;
  } else {
    if (tval["ctype"] === "number") {
      var z = tval["value"];
      if (Math.abs(z["imag"]) < 1e-5) {
        if ((z["real"] | 0) === z["real"]) {
          return type.int;
        } else {
          return type.float;
        }
      } else {
        return type.complex;
      }
    } else {
      if (tval["ctype"] === "list") {
        var l = tval["value"];
        if (l.length === 3) {
          if (tval["usage"] === "Point") {
            return type.point;
          } else {
            if (tval["usage"] === "Line") {
              return type.line;
            }
          }
        }
        if (l.length > 0) {
          var ctype = guessTypeOfValue(l[0]);
          for (var i = 1; i < l.length; i++) {
            ctype = lca(ctype, guessTypeOfValue(l[i]));
          }
          if (ctype) {
            return {type:"list", length:l.length, parameters:ctype};
          }
        }
      } else {
        if (tval["ctype"] === "string" || tval["ctype"] === "image") {
          return type.image;
        } else {
          if (tval["ctype"] === "geo" && tval["value"]["kind"] === "L") {
            return type.line;
          }
        }
      }
    }
  }
  console.error("Cannot guess type of the following type:");
  console.log(tval);
  return false;
}
var helpercnt = 0;
function generateUniqueHelperString() {
  helpercnt++;
  return "_h" + helpercnt;
}
function enlargeCanvasIfRequired(sizeX, sizeY) {
  if (sizeX > glcanvas.width || sizeY > glcanvas.height) {
    glcanvas.width = Math.ceil(sizeX);
    glcanvas.height = Math.ceil(sizeY);
  }
}
function realfromCindyScriptCommand(api, cscmd) {
  if (!api.instance.parsecache) {
    api.instance.parsecache = {};
  }
  if (!api.instance.parsecache[cscmd]) {
    api.instance.parsecache[cscmd] = api.instance.parse(cscmd);
  }
  var val = api.evaluate(api.instance.parsecache[cscmd]);
  if (val["ctype"] && val["ctype"] === "number") {
    return val["value"]["real"];
  } else {
    return 0;
  }
}
function computeLowerLeftCorner(api) {
  return {x:realfromCindyScriptCommand(api, "(screenbounds()_4).x"), y:realfromCindyScriptCommand(api, "(screenbounds()_4).y")};
}
function computeLowerRightCorner(api) {
  return {x:realfromCindyScriptCommand(api, "(screenbounds()_3).x"), y:realfromCindyScriptCommand(api, "(screenbounds()_3).y")};
}
function computeUpperLeftCorner(api) {
  return {x:realfromCindyScriptCommand(api, "(screenbounds()_1).x"), y:realfromCindyScriptCommand(api, "(screenbounds()_1).y")};
}
var floatView = new Float32Array(1);
var int32View = new Int32Array(floatView.buffer);
function toHalf(fval) {
  floatView[0] = fval;
  var fbits = int32View[0];
  var sign = fbits >> 16 & 32768;
  var val = (fbits & 2147483647) + 4096;
  if (val >= 1199570944) {
    if ((fbits & 2147483647) >= 1199570944) {
      if (val < 2139095040) {
        return sign | 31744;
      }
      return sign | 31744 | (fbits & 8388607) >> 13;
    }
    return sign | 31743;
  }
  if (val >= 947912704) {
    return sign | val - 939524096 >> 13;
  }
  if (val < 855638016) {
    return sign;
  }
  val = (fbits & 2147483647) >> 23;
  return sign | (fbits & 8388607 | 8388608) + (8388608 >>> val - 102) >> 126 - val;
}
function decodeFloat16(binary) {
  var exponent = (binary & 31744) >> 10;
  var fraction = binary & 1023;
  return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6.103515625e-5 * (fraction / 1024));
}
var toByte = function(f) {
  return f * 255;
};
function createPixelArrayFromFloat(samples) {
  if (can_use_texture_float) {
    return new Float32Array(samples);
  }
  if (can_use_texture_half_float) {
    var newsamples = new Uint16Array(samples.length);
    for (var i = 0; i < samples.length; i++) {
      newsamples[i] = toHalf(samples[i]);
    }
    return newsamples;
  } else {
    var newsamples$2 = new Uint8Array(samples.length);
    for (var i$3 = 0; i$3 < samples.length; i$3++) {
      newsamples$2[i$3] = toByte(samples[i$3]);
    }
    return newsamples$2;
  }
}
function createPixelArrayFromUint8(samples) {
  if (can_use_texture_float) {
    var newsamples = new Float32Array(samples.length);
    for (var i = 0; i < samples.length; i++) {
      newsamples[i] = samples[i] / 255.;
    }
    return newsamples;
  }
  if (can_use_texture_half_float) {
    var newsamples$4 = new Uint16Array(samples.length);
    for (var i$5 = 0; i$5 < samples.length; i$5++) {
      newsamples$4[i$5] = toHalf(samples[i$5] / 255.);
    }
    return newsamples$4;
  } else {
    return new Uint8Array(samples);
  }
}
function createPixelArray(size) {
  if (can_use_texture_float) {
    return new Float32Array(size);
  }
  if (can_use_texture_half_float) {
    return new Uint16Array(size);
  } else {
    return new Uint8Array(size);
  }
}
function getPixelType() {
  if (can_use_texture_float) {
    return gl.FLOAT;
  }
  if (can_use_texture_half_float) {
    return halfFloat.HALF_FLOAT_OES;
  } else {
    return gl.UNSIGNED_BYTE;
  }
}
function toFloat(samples) {
  var res = [];
  for (var i = 0; i < samples.length; i++) {
    if (can_use_texture_float) {
      res.push(samples[i]);
    } else {
      if (can_use_texture_half_float) {
        res.push(decodeFloat16(samples[i]));
      } else {
        res.push(samples[i] / 255);
      }
    }
  }
  return res;
}
function smallestPowerOfTwoGreaterOrEqual(a) {
  var ans = 1;
  while (ans < a) {
    ans <<= 1;
  }
  return ans;
}
;function generateCanvasWrapperIfRequired(imageobject, api, properties) {
  if (imageobject["canvaswrapper"]) {
    if (imageobject.ready && (imageobject["canvaswrapper"].canvas == dummyimage || imageobject["canvaswrapper"].sizeX != imageobject.width || imageobject["canvaswrapper"].sizeY != imageobject.height)) {
      delete imageobject["canvaswrapper"];
      imageobject["canvaswrapper"] = generateCanvasWrapperIfRequired(imageobject, api, properties);
    }
    if (properties) {
      imageobject["canvaswrapper"].updateReadingProperties(properties);
    }
  } else {
    imageobject["canvaswrapper"] = new CanvasWrapper(imageobject.ready ? imageobject : dummyimage, properties || {interpolate:true, mipmap:false, repeat:false, clamptoedge:false});
    if (!imageobject.ready) {
      console.log("Image is not ready yet.");
    }
  }
  return imageobject["canvaswrapper"];
}
function CanvasWrapper(canvas, properties) {
  this.canvas = canvas;
  this.properties = properties;
  this.sizeX = canvas.width;
  this.sizeY = canvas.height;
  this.updateInternalTextureMeasures();
  this.ratio = canvas.height / canvas.width;
  this.it = 0;
  this.textures = [];
  this.framebuffers = [];
  this.generation = -1;
  this.bindTexture();
  canvas["drawTo"] = this.drawTo.bind(this);
  canvas["readPixels"] = this.readPixels.bind(this);
  canvas["cdyUpdate"] = this.copyTextureToCanvas.bind(this);
  var rawData = createPixelArray(this.sizeXP * this.sizeYP * 4);
  for (var j = 0; j < 2; j++) {
    this.textures[j] = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.textures[j]);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.sizeXP, this.sizeYP, 0, gl.RGBA, getPixelType(), rawData);
    if (properties.mipmap) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, properties.interpolate ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, properties.interpolate ? gl.LINEAR : gl.NEAREST);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, properties.interpolate ? gl.LINEAR : gl.NEAREST);
    if (properties.clamptoedge) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    this.framebuffers[j] = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[j]);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[j], 0);
  }
  this.shaderProgram = new ShaderProgram(gl, cgl_resources["copytexture_v"], cgl_resources["copytexture_f"]);
  var posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  var vertices = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
  var aPosLoc = gl.getAttribLocation(this.shaderProgram.handle, "aPos");
  gl.enableVertexAttribArray(aPosLoc);
  var aTexLoc = gl.getAttribLocation(this.shaderProgram.handle, "aTexCoord");
  gl.enableVertexAttribArray(aTexLoc);
  var texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  var texCoordOffset = vertices.byteLength;
  gl.bufferData(gl.ARRAY_BUFFER, texCoordOffset + texCoords.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
  gl.bufferSubData(gl.ARRAY_BUFFER, texCoordOffset, texCoords);
  gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, texCoordOffset);
}
CanvasWrapper.prototype.textures;
CanvasWrapper.prototype.framebuffers;
CanvasWrapper.prototype.sizeX;
CanvasWrapper.prototype.sizeY;
CanvasWrapper.prototype.ratio;
CanvasWrapper.prototype.lastframecount;
CanvasWrapper.prototype.canvas;
CanvasWrapper.prototype.generation;
CanvasWrapper.prototype.it;
CanvasWrapper.prototype.shaderProgram;
CanvasWrapper.prototype.updateReadingProperties = function(properties) {
  var oldproperties = this.properties;
  if (properties && (properties.repeat != oldproperties.repeat || properties.clamptoedge != oldproperties.clamptoedge || properties.mipmap != oldproperties.mipmap || properties.interpolate != oldproperties.interpolate)) {
    this.properties = properties;
    for (var j = 0; j < 2; j++) {
      gl.bindTexture(gl.TEXTURE_2D, this.textures[j]);
      if (properties.mipmap) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, properties.interpolate ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_LINEAR);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, properties.interpolate ? gl.LINEAR : gl.NEAREST);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, properties.interpolate ? gl.LINEAR : gl.NEAREST);
      if (properties.clamptoedge) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
    }
  }
};
CanvasWrapper.prototype.updateInternalTextureMeasures = function() {
  if (this.properties.clamptoedge && this.properties.interpolate && !this.properties.repeat && !this.properties.mipmap) {
    this.sizeXP = this.sizeX;
    this.sizeYP = this.sizeY;
  } else {
    this.sizeXP = smallestPowerOfTwoGreaterOrEqual(this.sizeX + this.sizeX / 2 * (this.properties.mipmap && this.properties.repeat));
    this.sizeYP = smallestPowerOfTwoGreaterOrEqual(this.sizeY + this.sizeY / 2 * (this.properties.mipmap && this.properties.repeat));
  }
};
CanvasWrapper.prototype.bindTexture = function() {
  gl.bindTexture(gl.TEXTURE_2D, this.textures[this.it]);
};
CanvasWrapper.prototype.bindFramebuffer = function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.it ^ 1]);
  this.it ^= 1;
};
CanvasWrapper.prototype.copyTextureToCanvas = function() {
  var context = null;
  if (this.canvas.img.hasOwnProperty("getContext")) {
    context = this.canvas.img.getContext("2d");
  } else {
    this.canvas.img = document.createElement("canvas");
    this.canvas.img.style.display = "none";
    this.canvas.img.width = this.sizeX;
    this.canvas.img.height = this.sizeY;
    context = this.canvas.img.getContext("2d");
  }
  context.clearRect(0, 0, this.sizeX, this.sizeY);
  this.drawTo(context, 0, 0);
  this.canvas.img.generation++;
};
CanvasWrapper.prototype.reloadIfRequired = function() {
  if (this.canvas.live && (this.canvas.img.webkitDecodedFrameCount || this.canvas.img.mozDecodedFrames) && this.lastframecount >= (this.canvas.img.webkitDecodedFrameCount || this.canvas.img.mozDecodedFrames)) {
    return;
  }
  if (!this.canvas.live && (!this.canvas.ready || this.generation >= this.canvas.generation)) {
    return;
  }
  if (this.sizeX != this.canvas.width || this.sizeY != this.canvas.height) {
    this.sizeX = this.canvas.width;
    this.sizeY = this.canvas.height;
    this.updateInternalTextureMeasures();
    var rawData = createPixelArray(this.sizeXP * this.sizeYP * 4);
    for (var j = 0; j < 2; j++) {
      gl.bindTexture(gl.TEXTURE_2D, this.textures[j]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.sizeXP, this.sizeYP, 0, gl.RGBA, getPixelType(), rawData);
    }
  }
  this.bindTexture();
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  if (!this.properties.repeat) {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, getPixelType(), this.canvas.img);
  } else {
    tmpcanvas.width = this.sizeXP;
    tmpcanvas.height = this.sizeYP;
    var ctx = tmpcanvas.getContext("2d");
    ctx.drawImage(this.canvas.img, 0, this.sizeYP - this.sizeY);
    ctx.drawImage(this.canvas.img, this.sizeX, this.sizeYP - this.sizeY);
    ctx.drawImage(this.canvas.img, 0, this.sizeYP - 2 * this.sizeY);
    ctx.drawImage(this.canvas.img, this.sizeX, this.sizeYP - 2 * this.sizeY);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, getPixelType(), tmpcanvas);
  }
  if (this.properties.mipmap) {
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  this.generation = this.canvas.generation;
  this.lastframecount = Math.min(this.lastframecount + 1, this.canvas.img.webkitDecodedFrameCount || this.canvas.img.mozDecodedFrames);
};
CanvasWrapper.prototype.drawTo = function(context, x, y) {
  enlargeCanvasIfRequired(this.sizeXP, this.sizeYP);
  gl.viewport(0, 0, this.sizeXP, this.sizeYP);
  this.shaderProgram.use(gl);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.textures[this.it]);
  this.shaderProgram.uniform["sampler"]([0]);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.flush();
  context.drawImage(glcanvas, 0, glcanvas.height - this.sizeY, this.sizeX, this.sizeY, x, y, this.sizeX, this.sizeY);
};
CanvasWrapper.prototype.readPixels = function(x, y, width, height) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[this.it]);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[this.it], 0);
  var pixels = createPixelArray(width * height * 4);
  gl.readPixels(x, this.sizeY - y - height, width, height, gl.RGBA, getPixelType(), pixels);
  var res = [];
  for (var i = height - 1; i >= 0; i--) {
    res = res.concat(toFloat(pixels.slice(i * width * 4, (i + 1) * width * 4)));
  }
  return res;
};
CanvasWrapper.prototype.setPixel = function(x, y, color) {
  this.bindTexture();
  var colordata = [color[0], color[1], color[2], 1];
  gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y, 1, 1, gl.RGBA, getPixelType(), createPixelArrayFromFloat(colordata));
  var context = this.canvas.img.getContext("2d");
  var id = context.createImageData(1, 1);
  id.data.d = colordata;
  context.putImageData(id, x, y);
};
function Renderer(api, expression) {
  this.api = api;
  this.expression = expression;
  this.rebuild();
}
Renderer.prototype.cpguniforms;
Renderer.prototype.vertexShaderCode;
Renderer.prototype.fragmentShaderCode;
Renderer.prototype.shaderProgram;
Renderer.prototype.api;
Renderer.prototype.expression;
Renderer.prototype.canvaswrapper;
Renderer.prototype.texturereaders;
Renderer.prototype.generations;
Renderer.prototype.rebuild = function() {
  var cb = new CodeBuilder(this.api);
  var cpg = cb.generateColorPlotProgram(this.expression);
  this.cpguniforms = cpg.uniforms;
  this.texturereaders = cpg.texturereaders;
  this.generations = cpg.generations;
  this.fragmentShaderCode = cgl_resources["standardFragmentHeader"] + cpg.code;
  this.vertexShaderCode = cgl_resources["vshader"];
  this.shaderProgram = new ShaderProgram(gl, this.vertexShaderCode, this.fragmentShaderCode);
  var posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  var vertices = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
  var aPosLoc = gl.getAttribLocation(this.shaderProgram.handle, "aPos");
  gl.enableVertexAttribArray(aPosLoc);
  var aTexLoc = gl.getAttribLocation(this.shaderProgram.handle, "aTexCoord");
  gl.enableVertexAttribArray(aTexLoc);
  var texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  var texCoordOffset = vertices.byteLength;
  gl.bufferData(gl.ARRAY_BUFFER, texCoordOffset + texCoords.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
  gl.bufferSubData(gl.ARRAY_BUFFER, texCoordOffset, texCoords);
  gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, texCoordOffset);
};
function transpose3(m) {
  return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
}
Renderer.prototype.setTransformMatrix = function(a, b, c) {
  var m = [b.x - a.x, c.x - a.x, a.x, b.y - a.y, c.y - a.y, a.y, 0, 0, 1];
  if (this.shaderProgram.uniform.hasOwnProperty("transformMatrix")) {
    this.shaderProgram.uniform["transformMatrix"](transpose3(m));
  }
};
Renderer.prototype.setUniforms = function() {
  var $jscomp$this = this;
  function setUniform(setter, t, val) {
    if (!setter) {
      return;
    }
    if (typeof setter === "function") {
      switch(t) {
        case type.complex:
          setter([val["value"]["real"], val["value"]["imag"]]);
          break;
        case type.bool:
          if (val["value"]) {
            setter([1]);
          } else {
            setter([0]);
          }
          break;
        case type.int:
        case type.float:
          setter([val["value"]["real"]]);
          break;
        case type.point:
        case type.line:
          if (val.ctype === "geo") {
            setter(val["value"]["homog"]["value"].map(function(x) {
              return x["value"]["real"];
            }));
          } else {
            if (val.ctype === "list" && val["value"].length === 2) {
              setter(val["value"].map(function(x) {
                return x["value"]["real"];
              }).concat([1]));
            } else {
              if (val.ctype === "list" && val["value"].length === 3) {
                setter(val["value"].map(function(x) {
                  return x["value"]["real"];
                }));
              }
            }
          }
          break;
        default:
          if (t.type === "list" && t.parameters === type.float) {
            setter(val["value"].map(function(x) {
              return x["value"]["real"];
            }));
            break;
          } else {
            if (t.type === "list" && t.parameters.type === "list" && t.parameters.parameters === type.float) {
              var m = [];
              for (var j = 0; j < t.length; j++) {
                for (var i = 0; i < t.parameters.length; i++) {
                  m.push(val["value"][j]["value"][i]["value"]["real"]);
                }
              }
              setter(m);
              break;
            }
          }
          console.error("Don't know how to set uniform of type " + typeToString(t) + ", to " + val);
          break;
      }
    } else {
      if (t.type === "list") {
        var d = depth(t);
        var fp = finalparameter(t);
        if (d === 1 && fp === type.float) {
          var n = t.length;
          var s = sizes(n);
          var cum = 0;
          for (var k in s) {
            setUniform(setter["a" + k], type.vec(s[k]), {"ctype":"list", "value":range(s[k]).map(function(l) {
              return val["value"][cum + l];
            })});
            cum += s[k];
          }
          return;
        }
        for (var k$6 = 0; k$6 < t.length; k$6++) {
          setUniform(setter["a" + k$6], t.parameters, {"ctype":"list", "value":val["value"][k$6]["value"]});
        }
        return;
      } else {
        console.error("Don't know how to set uniform of type " + typeToString(t) + ", to");
        console.log(val);
      }
    }
  }
  for (var uname in this.cpguniforms) {
    var val = this.api.evaluateAndVal(this.cpguniforms[uname].expr);
    var t = this.cpguniforms[uname].type;
    if (!issubtypeof(constant(val), t)) {
      console.log("Type of " + uname + " changed (" + typeToString(constant(val)) + " is no subtype of  " + typeToString(t) + "); forcing rebuild.");
      this.rebuild();
      this.shaderProgram.use(gl);
      this.setUniforms();
      return;
    }
    if (this.shaderProgram.uniform[uname]) {
      var setter = this.shaderProgram.uniform[uname];
      setUniform(setter, t, val);
    }
  }
  [["rnd_", function() {
    return [Math.random()];
  }], ["_lowerleft", function() {
    var pt = computeLowerLeftCorner($jscomp$this.api);
    return [pt.x, pt.y];
  }], ["_lowerright", function() {
    var pt = computeLowerRightCorner($jscomp$this.api);
    return [pt.x, pt.y];
  }]].map(function(a) {
    return $jscomp$this.shaderProgram.uniform[a[0]] && $jscomp$this.shaderProgram.uniform[a[0]](a[1]());
  });
};
Renderer.prototype.loadTextures = function() {
  var $jscomp$this = this;
  var cnt = 0;
  for (var t in this.texturereaders) {
    gl.activeTexture(gl.TEXTURE0 + cnt);
    var tr = this.texturereaders[t];
    var tname = tr.name;
    var properties = tr.properties;
    var cw = tr.returnCanvaswrapper();
    cw.reloadIfRequired();
    cw.bindTexture();
    [["_sampler" + tname, [cnt]], ["_ratio" + tname, [cw.sizeX / cw.sizeY]], ["_cropfact" + tname, [cw.sizeX / cw.sizeXP, cw.sizeY / cw.sizeYP]]].map(function(a) {
      return $jscomp$this.shaderProgram.uniform[a[0]] && $jscomp$this.shaderProgram.uniform[a[0]](a[1]);
    });
    cnt++;
  }
};
Renderer.prototype.functionGenerationsOk = function() {
  for (var fname in this.generations) {
    if (this.api.getMyfunction(fname).generation > this.generations[fname]) {
      console.log(fname + " is outdated; forcing rebuild.");
      return false;
    }
  }
  return true;
};
Renderer.prototype.render = function(a, b, sizeX, sizeY, canvaswrapper) {
  if (!this.functionGenerationsOk()) {
    this.rebuild();
  }
  var alpha = sizeY / sizeX;
  var n = {x:-(b.y - a.y) * alpha, y:(b.x - a.x) * alpha};
  var c = {x:a.x + n.x, y:a.y + n.y};
  enlargeCanvasIfRequired(sizeX, sizeY);
  if (canvaswrapper) {
    gl.viewport(0, 0, sizeX, sizeY);
  } else {
    gl.viewport(0, glcanvas.height - sizeY, sizeX, sizeY);
  }
  this.shaderProgram.use(gl);
  this.setUniforms();
  this.setTransformMatrix(a, b, c);
  this.loadTextures();
  if (canvaswrapper) {
    canvaswrapper.bindFramebuffer();
    canvaswrapper.generation = ++canvaswrapper.canvas.generation;
  } else {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.flush();
};
Renderer.prototype.renderXR = function(viewIndex) {
  if (viewIndex == 0) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.resetAttribLocations();
  }
  if (!this.functionGenerationsOk()) {
    this.rebuild();
  }
  this.shaderProgram.use(gl);
  this.setUniforms();
  this.setTransformMatrix({x:-1, y:-1}, {x:1, y:-1}, {x:-1, y:1});
  this.loadTextures();
  CindyJS._pluginRegistry.CindyXR.xrUpdateCindyGLView(gl, viewIndex);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.flush();
};
Renderer.prototype.resetAttribLocations = function() {
  var aPosLoc = gl.getAttribLocation(this.shaderProgram.handle, "aPos");
  gl.enableVertexAttribArray(aPosLoc);
  var aTexLoc = gl.getAttribLocation(this.shaderProgram.handle, "aTexCoord");
  gl.enableVertexAttribArray(aTexLoc);
  var texCoordOffset = 4 * 3 * 4;
  gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(aTexLoc, 2, gl.FLOAT, false, 0, texCoordOffset);
};
var CindyGL = function(api) {
  nada = api.nada;
  api.defineFunction("compile", 1, function(args, modifs) {
    var expr = args[0];
    var cb = new CodeBuilder(api);
    var code = cb.generateColorPlotProgram(expr);
    console.log(code);
    return {ctype:"string", value:code};
  });
  api.defineFunction("use8bittextures", 0, function(args, modifs) {
    use8bittextures = true;
    can_use_texture_float = can_use_texture_half_float = false;
    console.log("Switching to 8-bit textures mode.");
    return api.nada;
  });
  function compileAndRender(prog, a, b, width, height, canvaswrapper) {
    if (!prog.iscompiled || prog.compiletime < requiredcompiletime) {
      prog.iscompiled = true;
      prog.compiletime = requiredcompiletime;
      prog.renderer = new Renderer(api, prog);
    }
    prog.renderer.render(a, b, width, height, canvaswrapper);
    if (canvaswrapper) {
      canvaswrapper.generation = Math.max(canvaswrapper.generation, canvaswrapper.canvas.generation + 1);
    }
  }
  api.defineFunction("forcerecompile", 0, function(args, modifs) {
    requiredcompiletime++;
    return nada;
  });
  api.defineFunction("colorplot", 1, function(args, modifs) {
    initGLIfRequired();
    var prog = args[0];
    var iw = api.instance["canvas"]["width"];
    var ih = api.instance["canvas"]["height"];
    compileAndRender(prog, computeLowerLeftCorner(api), computeLowerRightCorner(api), iw, ih, null);
    var csctx = api.instance["canvas"].getContext("2d");
    csctx.save();
    csctx.setTransform(1, 0, 0, 1, 0, 0);
    csctx.drawImage(glcanvas, 0, 0, iw, ih, 0, 0, iw, ih);
    csctx.restore();
    return nada;
  });
  api.defineFunction("colorplot", 3, function(args, modifs) {
    initGLIfRequired();
    var prog = args[0];
    var a = api.extractPoint(api.evaluateAndVal(args[1]));
    var b = api.extractPoint(api.evaluateAndVal(args[2]));
    var ll = {x:Math.min(a.x, b.x), y:Math.min(a.y, b.y)};
    var lr = {x:Math.max(a.x, b.x), y:Math.min(a.y, b.y)};
    var ul = {x:Math.min(a.x, b.x), y:Math.max(a.y, b.y)};
    var iw = api.instance["canvas"]["width"];
    var ih = api.instance["canvas"]["height"];
    var cul = computeUpperLeftCorner(api);
    var clr = computeLowerRightCorner(api);
    var fx = Math.abs((a.x - b.x) / (clr.x - cul.x));
    var fy = Math.abs((a.y - b.y) / (clr.y - cul.y));
    compileAndRender(prog, ll, lr, iw * fx, ih * fy, null);
    var csctx = api.instance["canvas"].getContext("2d");
    var pt = {x:Math.min(a.x, b.x), y:Math.max(a.y, b.y)};
    var m = api.getInitialMatrix();
    var xx = iw * (ul.x - cul.x) / (clr.x - cul.x);
    var yy = ih * (ul.y - cul.y) / (clr.y - cul.y);
    csctx.save();
    csctx.setTransform(1, 0, 0, 1, 0, 0);
    csctx.drawImage(glcanvas, 0, 0, iw * fx, ih * fy, xx, yy, iw * fx, ih * fy);
    csctx.restore();
    return nada;
  });
  api.defineFunction("colorplot", 4, function(args, modifs) {
    initGLIfRequired();
    var a = api.extractPoint(api.evaluateAndVal(args[0]));
    var b = api.extractPoint(api.evaluateAndVal(args[1]));
    var name = api.evaluateAndVal(args[2]);
    var prog = args[3];
    if (!a.ok || !b.ok || name.ctype !== "string") {
      return nada;
    }
    var imageobject = api.getImage(name["value"], true);
    var canvaswrapper = generateCanvasWrapperIfRequired(imageobject, api, false);
    var cw = imageobject.width;
    var ch = imageobject.height;
    compileAndRender(prog, a, b, cw, ch, canvaswrapper);
    return nada;
  });
  api.defineFunction("colorplot", 2, function(args, modifs) {
    initGLIfRequired();
    var a = computeLowerLeftCorner(api);
    var b = computeLowerRightCorner(api);
    var name = api.evaluateAndVal(args[0]);
    var prog = args[1];
    if (name.ctype !== "string") {
      return nada;
    }
    var imageobject = api.getImage(name["value"], true);
    var canvaswrapper = generateCanvasWrapperIfRequired(imageobject, api, false);
    var cw = imageobject.width;
    var ch = imageobject.height;
    compileAndRender(prog, a, b, cw, ch, canvaswrapper);
    return nada;
  });
  api.defineFunction("setpixel", 4, function(args, modifs) {
    var name = coerce.toString(api.evaluateAndVal(args[0]));
    var x = coerce.toInt(api.evaluateAndVal(args[1]));
    var y = coerce.toInt(api.evaluateAndVal(args[2]));
    var color = coerce.toColor(api.evaluateAndVal(args[3]));
    if (!name) {
      return nada;
    }
    var imageobject = api.getImage(name, true);
    var canvaswrapper = generateCanvasWrapperIfRequired(imageobject, api, false);
    if (isFinite(x) && isFinite(y) && name && canvaswrapper && color) {
      canvaswrapper.setPixel(x, y, color);
    }
    return nada;
  });
  api.defineFunction("colorplotxr", 2, function(args, modifs) {
    initGLIfRequired();
    var viewIndex = api.evaluate(args[0])["value"]["real"];
    var prog = args[1];
    if (!prog.iscompiled || prog.compiletime < requiredcompiletime) {
      prog.iscompiled = true;
      prog.compiletime = requiredcompiletime;
      prog.renderer = new Renderer(api, prog);
    }
    prog.renderer.renderXR(viewIndex);
    return nada;
  });
};
CindyGL.gl = null;
CindyGL.generateCanvasWrapperIfRequired = generateCanvasWrapperIfRequired;
CindyGL.initGLIfRequired = initGLIfRequired;
CindyJS.registerPlugin(1, "CindyGL", CindyGL);
var list = function(n, type) {
  return {type:"list", length:n, parameters:type};
};
var constant = function(value) {
  return {type:"constant", value:value};
};
var constint = function(n) {
  return constant({"ctype":"number", "value":{"real":n, "imag":0}});
};
var type = {bool:1, int:2, float:3, complex:4, voidt:5, color:6, point:7, line:8, coordinate2d:9, image:10, vec2:list(2, 3), vec3:list(3, 3), vec4:list(4, 3), vec:function(n) {
  return list(n, 3);
}, cvec:function(n) {
  return list(n, 4);
}, mat2:list(2, list(2, 3)), mat3:list(3, list(3, 3)), mat4:list(4, list(4, 3))};
Object.freeze(type);
function typeToString(t) {
  if (1 <= t && t <= 10) {
    var l = ["bool", "int", "float", "complex", "voidt", "color", "point", "line", "coordinate2d", "image"];
    return l[t - 1];
  } else {
    if (t.type === "list") {
      return typeToString(t.parameters) + "[" + t.length + "]";
    }
    if (t.type === "constant") {
      return "const[" + JSON.stringify(t.value["value"]) + "]";
    }
    return JSON.stringify(t);
  }
}
var isrvectorspace = function(t) {
  return t.type === "list" && isrvectorspace(t.parameters) || issubtypeof(t, type.float);
};
var iscvectorspace = function(t) {
  return t.type === "list" && iscvectorspace(t.parameters) || issubtypeof(t, type.complex);
};
var isconstantint = function(t) {
  return t.type === "constant" && issubtypeof(t, type.int);
};
var generalize = function(t) {
  return t.type === "constant" ? guessTypeOfValue(t.value) : t;
};
var depth = function(t) {
  return t.type === "list" ? depth(t.parameters) + 1 : 0;
};
var finalparameter = function(t) {
  return t.parameters !== undefined ? finalparameter(t.parameters) : t;
};
var dimensionsmatch = function(a, b) {
  return depth(a) === depth(b) && (depth(a) === 0 || a.length === b.length && dimensionsmatch(a.parameters, b.parameters));
};
var getrvectorspace = function(t) {
  return issubtypeof(t, type.float) ? type.float : issubtypeof(t, type.complex) ? type.complex : {type:"list", length:t.length, parameters:getrvectorspace(t.parameters)};
};
var getcvectorspace = function(t) {
  return issubtypeof(t, type.complex) ? type.complex : {type:"list", length:t.length, parameters:getcvectorspace(t.parameters)};
};
var replaceCbyR = function(t) {
  return t === type.complex ? type.float : {type:"list", length:t.length, parameters:replaceCbyR(t.parameters)};
};
var isnativeglsl = function(t) {
  return t.type === "constant" && isnativeglsl(generalize(t)) || t === type.bool || t === type.int || t === type.float || t === type.complex || t === type.point || t === type.line || t.type === "list" && t.parameters === type.float && 1 <= t.length && t.length <= 4 || t.type === "list" && t.parameters.type === "list" && t.parameters.parameters === type.float && t.length === t.parameters.length && 2 <= t.length && t.length <= 4;
};
var isprimitive = function(a) {
  return [type.bool, type.int, type.float, type.complex].indexOf(a) !== -1;
};
var typesareequal = function(a, b) {
  return a === b || a.type === "constant" && b.type === "constant" && expressionsAreEqual(a.value, b.value) || a.type === "list" && b.type === "list" && a.length === b.length && typesareequal(a.parameters, b.parameters);
};
function issubtypeof(a, b) {
  if (typesareequal(a, b)) {
    return true;
  }
  if (!a) {
    return false;
  }
  if (isprimitive(a) && isprimitive(b)) {
    return a <= b;
  }
  if (b.type === "constant") {
    return false;
  }
  if (a.type === "constant") {
    return issubtypeof(guessTypeOfValue(a.value), b);
  }
  if (b === type.coordinate2d) {
    return issubtypeof(a, type.complex) || issubtypeof(a, type.vec2) || issubtypeof(a, type.point);
  }
  if (b === type.point) {
    return issubtypeof(a, type.vec3) || issubtypeof(a, type.vec2);
  }
  if (b === type.line) {
    return issubtypeof(a, type.vec3);
  }
  if (b === type.color) {
    return issubtypeof(a, type.float) || a.type === "list" && (a.length === 3 || a.length === 4) && issubtypeof(a.parameters, type.float);
  }
  if (a.type === "list" && b.type === "list" && a.length === b.length) {
    return issubtypeof(a.parameters, b.parameters);
  }
  return false;
}
function lca(a, b) {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  if (typesareequal(a, b)) {
    return a;
  }
  if (a.type === "constant") {
    a = guessTypeOfValue(a.value);
  }
  if (b.type === "constant") {
    b = guessTypeOfValue(b.value);
  }
  if (isprimitive(a) && isprimitive(b)) {
    return Math.max(a, b);
  }
  if (a.type === "list" && b.type === "list" && a.length === b.length) {
    var st = lca(a.parameters, b.parameters);
    if (!st) {
      return false;
    } else {
      return {type:"list", length:a.length, parameters:st};
    }
  }
  return false;
}
function first(signatures) {
  return function(args) {
    var $jscomp$loop$34 = {};
    for (var i in signatures) {
      var cur = signatures[i];
      $jscomp$loop$34.reqargs = cur[0];
      if (args.length == $jscomp$loop$34.reqargs.length && args.every(function($jscomp$loop$34) {
        return function(elem, index) {
          return issubtypeof(elem, $jscomp$loop$34.reqargs[index]);
        };
      }($jscomp$loop$34))) {
        return {args:$jscomp$loop$34.reqargs, res:cur[1], generator:cur[2]};
      }
      $jscomp$loop$34 = {reqargs:$jscomp$loop$34.reqargs};
    }
    return false;
  };
}
function inclusionfunction(toType) {
  switch(toType) {
    case type.int:
      return first([[[type.bool], type.int, usefunction("int")]]);
    case type.float:
      return first([[[type.bool], type.float, usefunction("float")], [[type.int], type.float, usefunction("float")]]);
    case type.complex:
      return first([[[type.float], type.complex, function(f) {
        return "vec2(" + f + ", 0.)";
      }]]);
    case type.color:
      return first([[[type.float], type.color, useincludefunction("float2color")], [[type.vec3], type.color, function(v) {
        return "vec4(" + v + ",1.0)";
      }], [[type.vec4], type.color, identity]]);
    case type.point:
      return first([[[type.vec2], type.point, function(v) {
        return "vec3(" + v + ",1.0)";
      }], [[type.vec3], type.point, identity]]);
    case type.line:
      return first([[[type.vec2], type.line, function(v) {
        return "vec3(" + v + ",1.0)";
      }], [[type.vec3], type.line, identity]]);
    case type.coordinate2d:
      return first([[[type.complex], type.coordinate2d, identity], [[type.vec2], type.coordinate2d, identity], [[type.point], type.coordinate2d, useincludefunction("dehomogenize")]]);
    default:
      if (toType.type === "list") {
        var fp = finalparameter(toType);
        return function(args) {
          var fromType = args[0];
          var rec = inclusionfunction(toType.parameters)([fromType.parameters]).generator;
          return {args:args, res:toType, generator:function(list, modifs, codebuilder) {
            return uselist(toType)(range(toType.length).map(function(k) {
              return rec([accesslist(fromType, k)([list], modifs, codebuilder)], modifs, codebuilder);
            }), modifs, codebuilder);
          }};
        };
      }
  }
  console.log("no inclusionfunction ->" + typeToString(toType) + " implemented yet; using identity...");
  return function(args) {
    return {args:args, res:toType, generator:identity};
  };
}
function webgltype(ctype) {
  ctype = generalize(ctype);
  switch(ctype) {
    case type.bool:
      return "bool";
    case type.int:
      return "int";
    case type.float:
      return "float";
    case type.complex:
    case type.coordinate2d:
      return "vec2";
    case type.voidt:
      return "void";
    case type.color:
      return "vec4";
    case type.point:
    case type.line:
      return "vec3";
  }
  if (ctype.type === "list" && ctype.parameters === type.float) {
    if (ctype.length == 1) {
      return "float";
    } else {
      return "vec" + ctype.length;
    }
  } else {
    if (ctype.type === "list" && ctype.parameters === type.complex) {
      return "cvec" + ctype.length;
    } else {
      if (ctype.type === "list" && ctype.parameters.type === "list" && ctype.length === ctype.parameters.length && ctype.parameters.parameters === type.float) {
        switch(ctype.length) {
          case 2:
            return "mat2";
          case 3:
            return "mat3";
          case 4:
            return "mat4";
        }
      }
    }
  }
  if (ctype.type === "list") {
    return "l" + ctype.length + "_" + webgltype(ctype.parameters);
  }
  console.error("No WebGL implementation for type " + typeToString(ctype) + " found");
}
function pastevalue(val, toType) {
  switch(toType) {
    case type.bool:
      return webgltype(toType) + "(" + val["value"] + ")";
    case type.int:
      return "" + (val["value"]["real"] | 0);
    case type.float:
      return webgltype(toType) + "(" + val["value"]["real"] + ")";
    case type.complex:
      return webgltype(toType) + "(" + val["value"]["real"] + ", " + val["value"]["imag"] + ")";
    case type.color:
      var f = val["value"]["real"];
      return "vec4(" + f + "," + f + "," + f + ",1.)";
    default:
      console.error("Dont know how to paste values of Type " + typeToString(toType) + " yet.");
  }
}
;var requires = {};
function includefunction(name, modifs, codebuilder) {
  if (codebuilder.mark("includedfunctions", name)) {
    return;
  }
  for (var i in requires[name]) {
    var f = requires[name][i];
    includefunction(f, modifs, codebuilder);
  }
  codebuilder.add("includedfunctions", name, function() {
    return cgl_resources[name];
  });
}
function useincludefunction(name) {
  return function(args, modifs, codebuilder) {
    includefunction(name, modifs, codebuilder);
    return usefunction(name)(args);
  };
}
;var range = function(n) {
  return Array.from(Array(n).keys());
};
var sizes = function(n) {
  return n <= 4 ? [n] : n == 5 ? [2, 3] : sizes(n - 4).concat([4]);
};
var computeidx = function(k, n) {
  var s = sizes(n);
  for (var i in s) {
    if (s[i] <= k) {
      k -= s[i];
    } else {
      return {first:i, second:k};
    }
  }
  console.error("Accessing index out of range");
};
function genchilds(t) {
  var fp = finalparameter(t);
  var d = depth(t);
  if (d == 1 && fp === type.float) {
    return sizes(t.length).map(function(k, i) {
      return {type:type.vec(k), name:"a" + i};
    });
  } else {
    if (d >= 1) {
      return range(t.length).map(function(i) {
        return {type:t.parameters, name:"a" + i};
      });
    }
  }
  return [];
}
function createstruct(t, codebuilder) {
  if (isnativeglsl(t)) {
    return;
  }
  var name = webgltype(t);
  codebuilder.add("structs", name, function() {
    return "struct " + name + " { " + genchilds(t).map(function(ch) {
      return createstruct(ch.type, codebuilder) || webgltype(ch.type) + " " + ch.name + ";";
    }).join("") + "};";
  });
}
function generatematmult(t, modifs, codebuilder) {
  if (isnativeglsl(t)) {
    return;
  }
  var n = t.length;
  var m = t.parameters.length;
  var name = "mult" + n + "_" + m;
  codebuilder.add("functions", name, function() {
    return webgltype(type.vec(n)) + " mult" + n + "_" + m + "(" + webgltype(t) + " a, " + webgltype(type.vec(m)) + " b){" + "return " + usevec(n)(range(n).map(function(k) {
      return usedot(m)(["a.a" + k, "b"], modifs, codebuilder);
    }), modifs, codebuilder) + ";" + "}";
  });
}
function generatesum(t, modifs, codebuilder) {
  if (isnativeglsl(t) && depth(t) <= 1) {
    return;
  }
  var n = t.length;
  var name = "sum" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t.parameters) + " " + name + "(" + webgltype(t) + " a){" + (webgltype(t.parameters) + " res = " + constantreallist(t.parameters, 0)([], modifs, codebuilder) + ";\n      " + range(n).map(function(k) {
      return "res = " + useadd(t.parameters)(["res", accesslist(t, k)(["a", k], modifs, codebuilder)], modifs, codebuilder) + ";";
    }).join("\n") + "\n        return res;\n    }");
  });
}
function generatecmatmult(t, modifs, codebuilder) {
  var n = t.length;
  var m = t.parameters.length;
  var name = "multc" + n + "_" + m;
  codebuilder.add("functions", name, function() {
    return webgltype(type.cvec(n)) + " multc" + n + "_" + m + "(" + webgltype(t) + " a, " + webgltype(type.cvec(m)) + " b){\n        return cvec" + n + "(" + range(n).map(function(k) {
      return usecdot(m)(["a.a" + k, "b"], modifs, codebuilder);
    }) + ");\n    }\n    ";
  });
}
function generatedot(n, codebuilder) {
  if (2 <= n && n <= 4) {
    return;
  }
  var name = "dot" + n;
  codebuilder.add("functions", name, function() {
    return "float dot" + n + "(vec" + n + " a, vec" + n + " b) {\n    return " + sizes(n).map(function(size, k) {
      return "dot(a.a" + k + ",b.a" + k + ")";
    }).join("+") + "; }\n    ";
  });
}
function generatecdot(n, modifs, codebuilder) {
  var name = "cdot" + n;
  codebuilder.add("functions", name, function() {
    return "vec2 cdot" + n + "(cvec" + n + " a, cvec" + n + " b) {\n      return " + range(n).map(function(k) {
      return "vec2(dot(a.a" + k + ",vec2(b.a" + k + ".x,-b.a" + k + ".y)), dot(a.a" + k + ",b.a" + k + ".yx))";
    }).join("+\n") + ";\n    }\n    ";
  });
}
function generateadd(t, modifs, codebuilder) {
  var name = "add" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(" + webgltype(t) + " a, " + webgltype(t) + " b) {\n    return " + webgltype(t) + "(" + genchilds(t).map(function(ch) {
      return webgltype(ch.type) + "(" + useadd(ch.type)(["a." + ch.name, "b." + ch.name], modifs, codebuilder) + ")";
    }).join(",") + ");\n      }";
  });
}
function generatesub(t, modifs, codebuilder) {
  var name = "sub" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(" + webgltype(t) + " a, " + webgltype(t) + " b) {\n    return " + webgltype(t) + "(" + genchilds(t).map(function(ch) {
      return webgltype(ch.type) + "(" + usesub(ch.type)(["a." + ch.name, "b." + ch.name], modifs, codebuilder) + ")";
    }).join(",") + ");\n    }";
  });
}
function generatescalarmult(t, modifs, codebuilder) {
  var name = "scalarmult" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(float a, " + webgltype(t) + " b) {\n    return " + webgltype(t) + "(" + genchilds(t).map(function(ch) {
      return webgltype(ch.type) + "(" + usescalarmult(ch.type)(["a", "b." + ch.name], modifs, codebuilder) + ")";
    }).join(",") + ");\n    }";
  });
}
function generatecscalarmult(t, modifs, codebuilder) {
  includefunction("multc", modifs, codebuilder);
  var name = "cscalarmult" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(vec2 a, " + webgltype(t) + " b) {\n    return " + webgltype(t) + "(" + genchilds(t).map(function(ch) {
      return "" + usecscalarmult(ch.type)(["a", "b." + ch.name], modifs, codebuilder);
    }).join(",") + ");\n    }";
  });
}
function usemult(t) {
  if (t === type.complex) {
    return useincludefunction("multc");
  }
  if (isnativeglsl(t)) {
    return function(args, modifs, codebuilder) {
      return useinfix("*")([args[1], args[0]]);
    };
  }
  var fp = finalparameter(t);
  if (issubtypeof(fp, type.float)) {
    return function(args, modifs, codebuilder) {
      return generatematmult(t, modifs, codebuilder) || "mult" + t.length + "_" + t.parameters.length + "(" + args.join(",") + ")";
    };
  } else {
    if (fp === type.complex) {
      return function(args, modifs, codebuilder) {
        return generatecmatmult(t, modifs, codebuilder) || "multc" + t.length + "_" + t.parameters.length + "(" + args.join(",") + ")";
      };
    }
  }
}
function usedot(n) {
  return function(args, modifs, codebuilder) {
    return generatedot(n, codebuilder) || "dot" + (2 <= n && n <= 4 ? "" : n) + "(" + args.join(",") + ")";
  };
}
function usecdot(n) {
  return function(args, modifs, codebuilder) {
    return generatecdot(n, modifs, codebuilder) || "cdot" + n + "(" + args.join(",") + ")";
  };
}
function useadd(t) {
  if (isnativeglsl(t)) {
    return useinfix("+");
  } else {
    return function(args, modifs, codebuilder) {
      return generateadd(t, modifs, codebuilder) || "add" + webgltype(t) + "(" + args.join(",") + ")";
    };
  }
}
function usesub(t) {
  if (isnativeglsl(t)) {
    return useinfix("-");
  } else {
    return function(args, modifs, codebuilder) {
      return generatesub(t, modifs, codebuilder) || "sub" + webgltype(t) + "(" + args.join(",") + ")";
    };
  }
}
function usesum(t) {
  if (isrvectorspace(t) && depth(t) == 1) {
    return function(args, modifs, codebuilder) {
      return usedot(t.length)([args[0], usevec(t.length)(Array(t.length).fill("1."), modifs, codebuilder)], modifs, codebuilder);
    };
  } else {
    return function(args, modifs, codebuilder) {
      return generatesum(t, modifs, codebuilder) || "sum" + webgltype(t) + "(" + args.join(",") + ")";
    };
  }
}
function usevec(n) {
  if (2 <= n && n <= 4) {
    return function(args) {
      return "vec" + n + "(" + args.join(",") + ")";
    };
  }
  if (n == 1) {
    return function(args) {
      return "float(" + args.join(",") + ")";
    };
  }
  var cum = 0;
  return function(args, modifs, codebuilder) {
    return createstruct(type.vec(n), codebuilder) || "vec" + n + "(" + sizes(n).map(function(s) {
      return "vec" + s + "(" + range(s).map(function(l) {
        return ++cum && args[cum - 1];
      }).join(",") + ")";
    }).join(",") + ")";
  };
}
function uselist(t) {
  var d = depth(t);
  if (isnativeglsl(t)) {
    return function(args, modifs, codebuilder) {
      return webgltype(t) + "(" + args.join(",") + ")";
    };
  }
  if (d == 1 && t.parameters === type.float) {
    return usevec(t.length);
  }
  return function(args, modifs, codebuilder) {
    return createstruct(t, codebuilder) || webgltype(t) + "(" + args.join(",") + ")";
  };
}
function accesslist(t, k) {
  var d = depth(t);
  var fp = finalparameter(t);
  if (d == 1 && fp === type.float) {
    return accessvecbyshifted(t.length, k);
  } else {
    if (isnativeglsl(t)) {
      return function(args, modifs, codebuilder) {
        return "(" + args[0] + ")[" + k + "]";
      };
    }
  }
  return function(args, modifs, codebuilder) {
    return "(" + args[0] + ").a" + k;
  };
}
function constantreallist(t, val) {
  if (isnativeglsl(t)) {
    return function(args, modifs, codebuilder) {
      return webgltype(t) + "(float(" + val + "))";
    };
  } else {
    return function(args, modifs, codebuilder) {
      return uselist(t) + "(" + genchilds(t).map(function(ch) {
        return constantreallist(ch.type, val)(args, modifs, codebuilder);
      }).join(",") + ")";
    };
  }
}
function accessvecbyshifted(n, k) {
  return function(args, modifs, codebuilder) {
    if (n == 1) {
      return args[0];
    }
    if (2 <= n && n <= 4) {
      return "(" + args[0] + ")[" + k + "]";
    }
    var idx = computeidx(k, n);
    return "(" + args[0] + ").a" + idx.first + "[" + idx.second + "]";
  };
}
function usescalarmult(t) {
  if (isnativeglsl(t)) {
    return useinfix("*");
  }
  return function(args, modifs, codebuilder) {
    return generatescalarmult(t, modifs, codebuilder) || "scalarmult" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
function usecscalarmult(t) {
  if (t === type.complex) {
    return useincludefunction("multc");
  }
  return function(args, modifs, codebuilder) {
    return generatecscalarmult(t, modifs, codebuilder) || "cscalarmult" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
function generatereverse(t, modifs, codebuilder) {
  var name = "reverse" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(" + webgltype(t) + " a){" + (webgltype(t.parameters) + " m;\n") + range(Math.floor(t.length / 2)).map(function(i) {
      var a = accesslist(t, i)(["a", i], modifs, codebuilder);
      var b = accesslist(t, t.length - 1 - i)(["a", t.length - 1 - i], modifs, codebuilder);
      return "m = " + a + "; " + a + " = " + b + "; " + b + " = m;";
    }).join("\n") + "return a;\n      }";
  });
}
function usereverse(t) {
  return function(args, modifs, codebuilder) {
    return generatereverse(t, modifs, codebuilder) || "reverse" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
function generatemax(t, modifs, codebuilder) {
  var name = "max" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t.parameters) + " " + name + "(" + webgltype(t) + " a){" + (webgltype(t.parameters) + " m = " + accesslist(t, t.length - 1)(["a", t.length - 1], modifs, codebuilder) + ";\n") + range(t.length - 1).map(function(i) {
      var a = accesslist(t, i)(["a", i], modifs, codebuilder);
      return "m = max(m," + a + ");";
    }).join("\n") + "return m;\n      }";
  });
}
function usemax(t) {
  return function(args, modifs, codebuilder) {
    return generatemax(t, modifs, codebuilder) || "max" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
function generatemin(t, modifs, codebuilder) {
  var name = "min" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t.parameters) + " " + name + "(" + webgltype(t) + " a){" + (webgltype(t.parameters) + " m = " + accesslist(t, t.length - 1)(["a", t.length - 1], modifs, codebuilder) + ";\n") + range(t.length - 1).map(function(i) {
      var a = accesslist(t, i)(["a", i], modifs, codebuilder);
      return "m = min(m," + a + ");";
    }).join("\n") + "return m;\n      }";
  });
}
function usemin(t) {
  return function(args, modifs, codebuilder) {
    return generatemin(t, modifs, codebuilder) || "min" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
function generatetranspose(t, modifs, codebuilder) {
  var name = "transpose" + webgltype(t);
  var anst = list(t.parameters.length, list(t.length, t.parameters.parameters));
  codebuilder.add("functions", name, function() {
    return webgltype(anst) + " " + name + "(" + webgltype(t) + " a){" + "return " + uselist(anst)(range(anst.length).map(function(i) {
      return uselist(anst.parameters)(range(anst.parameters.length).map(function(j) {
        return accesslist(t.parameters, i)([accesslist(t, j)(["a", j], modifs, codebuilder), i], modifs, codebuilder);
      }), modifs, codebuilder);
    }), modifs, codebuilder) + ";}";
  });
}
function usetranspose(t) {
  return function(args, modifs, codebuilder) {
    return generatetranspose(t, modifs, codebuilder) || "transpose" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
;function generatePairs(n) {
  var ans = [];
  function bitonicSort(lo, n, dir) {
    if (n > 1) {
      var m = n / 2 | 0;
      bitonicSort(lo, m, !dir);
      bitonicSort(lo + m, n - m, dir);
      bitonicMerge(lo, n, dir);
    }
  }
  function bitonicMerge(lo, n, dir) {
    if (n > 1) {
      var m = greatestPowerOfTwoLessThan(n);
      for (var i = lo; i < lo + n - m; i++) {
        compare(i, i + m, dir);
      }
      bitonicMerge(lo, m, dir);
      bitonicMerge(lo + m, n - m, dir);
    }
  }
  function compare(i, j, dir) {
    if (dir) {
      ans.push([i, j]);
    } else {
      ans.push([j, i]);
    }
  }
  function greatestPowerOfTwoLessThan(n) {
    var k = 1;
    while (k < n) {
      k = k << 1;
    }
    return k >> 1;
  }
  bitonicSort(0, n, true);
  return ans;
}
function generatesort(t, modifs, codebuilder) {
  var name = "sort" + webgltype(t);
  codebuilder.add("functions", name, function() {
    return webgltype(t) + " " + name + "(" + webgltype(t) + " a){" + (webgltype(t.parameters) + " m;\n") + generatePairs(t.length).map(function(p) {
      var a = accesslist(t, p[0])(["a", p[0]], modifs, codebuilder);
      var b = accesslist(t, p[1])(["a", p[1]], modifs, codebuilder);
      return "m = min(" + a + "," + b + "); " + b + " = max(" + a + "," + b + "); " + a + " = m;";
    }).join("\n") + "return a;\n      }";
  });
}
function usesort(t) {
  return function(args, modifs, codebuilder) {
    return generatesort(t, modifs, codebuilder) || "sort" + webgltype(t) + "(" + args.join(",") + ")";
  };
}
;function usefunction(name) {
  return function(args) {
    if (typeof "args" === "string") {
      return getPlainName(name) + "(" + args + ")";
    } else {
      return getPlainName(name) + "(" + args.join(", ") + ")";
    }
  };
}
function useinfix(inf) {
  return function(args) {
    return "(" + args.join(inf) + ")";
  };
}
function useswapinfix(inf) {
  return function(args) {
    return "(" + args.reverse().join(inf) + ")";
  };
}
var identity = function(x) {
  return x;
};
var getReal = function(c) {
  return "(" + c + ").x";
};
var getImag = function(c) {
  return "(" + c + ").y";
};
var webgl = {};
webgl["join"] = first([[[type.point, type.point], type.line, usefunction("cross")]]);
webgl["meet"] = first([[[type.line, type.line], type.point, usefunction("cross")]]);
webgl["gauss"] = first([[[type.complex], type.vec2, identity]]);
webgl["complex"] = first([[[type.vec2], type.complex, identity], [[type.point], type.complex, useincludefunction("dehomogenize")]]);
webgl["if"] = function(argtypes) {
  if (!argtypes.every(function(a) {
    return a;
  })) {
    return false;
  }
  if (argtypes.length === 2) {
    return {args:argtypes, res:argtypes[1], generator:function(args) {
      return "if(" + args[0] + ") {" + args[1] + ";}";
    }};
  } else {
    if (argtypes.length === 3) {
      var template = lca(argtypes[1], argtypes[2]);
      if (template) {
        return {args:[type.bool, template, template], res:template, generator:function(args) {
          return "(" + args[0] + " ? " + args[1] + " : " + args[2] + ")";
        }};
      } else {
        return {args:argtypes, res:type.voidt, generator:function(args) {
          return "if(" + args[0] + ") {" + args[1] + ";} else {" + args[2] + ";}";
        }};
      }
    }
  }
  return false;
};
webgl["="] = function(argtypes) {
  var match = lca(argtypes[0], argtypes[1]);
  return {args:match, res:match, generator:function(args) {
    return args[0] + " = " + args[1] + ";";
  }};
};
webgl[";"] = function(argtypes) {
  return {args:argtypes, res:argtypes[1] !== type.voidt ? argtypes[1] : argtypes[0], generator:function(args) {
    return args[0] + " ; " + args[1] + ";";
  }};
};
webgl["repeat"] = function(argtypes) {
  return (argtypes.length == 2 || argtypes.length == 3) && isconstantint(argtypes[0]) ? {args:argtypes, res:argtypes[argtypes.length - 1], generator:function(args) {
    return "";
  }} : false;
};
webgl["forall"] = function(argtypes) {
  return (argtypes.length == 2 || argtypes.length == 3) && generalize(argtypes[0]).type === "list" ? {args:argtypes, res:argtypes[argtypes.length - 1], generator:function(args) {
    return "";
  }} : false;
};
webgl["apply"] = function(argtypes) {
  return (argtypes.length == 2 || argtypes.length == 3) && generalize(argtypes[0]).type === "list" ? {args:argtypes, res:list(generalize(argtypes[0]).length, argtypes[argtypes.length - 1]), generator:function(args) {
    return "";
  }} : false;
};
webgl["sum"] = function(argtypes) {
  return argtypes.length == 1 && (isrvectorspace(argtypes[0]) || iscvectorspace(argtypes[0])) ? {args:argtypes, res:argtypes[0].parameters, generator:usesum(argtypes[0])} : false;
};
webgl["regional"] = function(argtypes) {
  return {args:argtypes, res:type.voidt, generator:function(args) {
    return "";
  }};
};
webgl["sqrt"] = first([[[type.float], type.complex, useincludefunction("sqrtf")], [[type.complex], type.complex, useincludefunction("sqrtc")]]);
webgl["abs"] = first([[[type.float], type.float, usefunction("abs")], [[type.complex], type.float, usefunction("length")], [[type.vec2], type.float, usefunction("length")], [[type.vec3], type.float, usefunction("length")], [[type.vec4], type.float, usefunction("length")]]);
webgl["abs_infix"] = webgl["abs"];
webgl["dist"] = first([[[type.float, type.float], type.float, function(x) {
  return usefunction("abs")(useinfix("-")(x));
}], [[type.complex, type.complex], type.float, function(x) {
  return usefunction("length")(useinfix("-")(x));
}], [[type.vec2, type.vec2], type.float, function(x) {
  return usefunction("length")(useinfix("-")(x));
}], [[type.vec3, type.vec3], type.float, function(x) {
  return usefunction("length")(useinfix("-")(x));
}], [[type.vec4, type.vec4], type.float, function(x) {
  return usefunction("length")(useinfix("-")(x));
}]]);
webgl["dist_infix"] = webgl["dist"];
webgl["sin"] = first([[[type.float], type.float, usefunction("sin")], [[type.complex], type.complex, useincludefunction("sinc")]]);
webgl["cos"] = first([[[type.float], type.float, usefunction("cos")], [[type.complex], type.complex, useincludefunction("cosc")]]);
webgl["tan"] = first([[[type.float], type.float, usefunction("tan")], [[type.complex], type.complex, useincludefunction("tanc")]]);
webgl["exp"] = first([[[type.float], type.float, usefunction("exp")], [[type.complex], type.complex, useincludefunction("expc")]]);
webgl["arctan"] = first([[[type.float], type.float, usefunction("atan")], [[type.complex], type.complex, useincludefunction("arctanc")]]);
webgl["arcsin"] = first([[[type.float], type.complex, useincludefunction("arcsinf")], [[type.complex], type.complex, useincludefunction("arcsinc")]]);
webgl["arccos"] = first([[[type.float], type.complex, useincludefunction("arccosf")], [[type.complex], type.complex, useincludefunction("arccosc")]]);
webgl["log"] = first([[[type.float], type.complex, useincludefunction("logr")], [[type.complex], type.complex, useincludefunction("logc")]]);
var glslstructures = [2, 3, 4].map(function(n) {
  return list(n, type.float);
}).concat([2, 3, 4].map(function(n) {
  return list(n, list(n, type.float));
}));
var glslsupportop = [type.int, type.float, type.complex].concat(glslstructures);
webgl["add"] = function(args) {
  var match = first(glslsupportop.map(function(t) {
    return [[t, t], t, useinfix("+")];
  }).concat([[[type.point, type.point], type.vec2, useincludefunction("addpoints")]]))(args);
  if (match) {
    return match;
  }
  var a = args[0];
  var b = args[1];
  if ([a, b].every(function(a) {
    return isrvectorspace(a) || iscvectorspace(a);
  }) && dimensionsmatch(a, b)) {
    var vectorspace = lca(getrvectorspace(a), getrvectorspace(b));
    return {args:[vectorspace, vectorspace], res:vectorspace, generator:useadd(vectorspace)};
  }
};
webgl["sub"] = function(args) {
  var match = first(glslsupportop.map(function(t) {
    return [[t, t], t, useinfix("-")];
  }).concat(glslsupportop.map(function(t) {
    return [[type.voidt, t], t, useinfix("-")];
  })).concat([[[type.point, type.point], type.vec2, useincludefunction("subpoints")]]))(args);
  if (match) {
    return match;
  }
  var a = args[0];
  var b = args[1];
  if ([a, b].every(function(a) {
    return isrvectorspace(a) || iscvectorspace(a);
  }) && dimensionsmatch(a, b)) {
    var vectorspace = lca(getrvectorspace(a), getrvectorspace(b));
    return {args:[vectorspace, vectorspace], res:vectorspace, generator:usesub(vectorspace)};
  }
};
webgl["+"] = webgl["add"];
webgl["-"] = webgl["sub"];
var rings = [type.int, type.float, type.complex, type.vec2, type.vec3, type.vec4];
webgl["_"] = function(args) {
  var t = generalize(args[0]);
  if (t === type.point || t === type.line) {
    t = type.vec3;
  }
  if (t.type === "list" && isconstantint(args[1])) {
    var k = Number(args[1].value["value"]["real"]);
    if (1 <= Math.abs(k) && Math.abs(k) <= t.length) {
      if (k > 0) {
        k = k - 1;
      }
      if (k < 0) {
        k = t.length + k;
      }
      return {args:args, res:t.parameters, generator:accesslist(t, k)};
    } else {
      return {args:args, res:t.parameters, generator:function(x) {
        return console.error("try to access " + k + "-th Element of " + t.length + "-list " + JSON.stringify(args[0]));
      }};
    }
  }
  return false;
};
webgl["mult"] = function(args) {
  var match = first([[[type.int, type.int], type.int, useinfix("*")], [[type.float, type.float], type.float, useinfix("*")], [[type.complex, type.float], type.complex, useinfix("*")], [[type.float, type.complex], type.complex, useinfix("*")], [[type.complex, type.complex], type.complex, useincludefunction("multc")], [[type.mat2, type.mat2], type.mat2, useswapinfix("*")], [[type.mat3, type.mat3], type.mat3, useswapinfix("*")], [[type.mat4, type.mat4], type.mat4, useswapinfix("*")], [[type.mat2, type.vec2], 
  type.vec2, useswapinfix("*")], [[type.mat3, type.vec3], type.vec3, useswapinfix("*")], [[type.mat4, type.vec4], type.vec4, useswapinfix("*")], [[type.vec2, type.mat2], type.vec2, useswapinfix("*")], [[type.vec3, type.mat3], type.vec3, useswapinfix("*")], [[type.vec4, type.mat4], type.vec4, useswapinfix("*")]])(args);
  if (match) {
    return match;
  }
  if (args.length !== 2) {
    return false;
  }
  var a = args[0];
  var b = args[1];
  if ([a, b].every(function(a) {
    return a.type === "list" && issubtypeof(a.parameters, type.float);
  }) && a.length === b.length) {
    var vectorspace = getrvectorspace(a);
    if (isnativeglsl(vectorspace)) {
      return {args:[vectorspace, vectorspace], res:type.float, generator:usefunction("dot")};
    } else {
      return {args:[vectorspace, vectorspace], res:type.float, generator:usedot(a.length)};
    }
  }
  if ([a, b].every(function(a) {
    return a.type === "list" && issubtypeof(a.parameters, type.complex);
  }) && a.length === b.length) {
    var vectorspace$7 = getcvectorspace(a);
    return {args:[vectorspace$7, vectorspace$7], res:type.complex, generator:usecdot(a.length)};
  }
  if (isrvectorspace(a) && depth(a) === 2 && isrvectorspace(b) && depth(b) === 1 && a.parameters.length === b.length) {
    return {args:[getrvectorspace(a), getrvectorspace(b)], res:type.vec(a.length), generator:usemult(getrvectorspace(a))};
  }
  if (iscvectorspace(a) && depth(a) === 2 && iscvectorspace(b) && depth(b) === 1 && a.parameters.length === b.length) {
    return {args:[getcvectorspace(a), getcvectorspace(b)], res:type.cvec(a.length), generator:usemult(getcvectorspace(a))};
  }
  var $jscomp$loop$35 = {};
  $jscomp$loop$35.swap = 0;
  for (; $jscomp$loop$35.swap < 2; $jscomp$loop$35 = {vs:$jscomp$loop$35.vs, swap:$jscomp$loop$35.swap, vs$8:$jscomp$loop$35.vs$8}, $jscomp$loop$35.swap++) {
    if (issubtypeof(args[0 ^ $jscomp$loop$35.swap], type.float) && (isrvectorspace(args[1 ^ $jscomp$loop$35.swap]) || iscvectorspace(args[1 ^ $jscomp$loop$35.swap]))) {
      $jscomp$loop$35.vs = getrvectorspace(args[1 ^ $jscomp$loop$35.swap]);
      return {args:$jscomp$loop$35.swap ? [$jscomp$loop$35.vs, type.float] : [type.float, $jscomp$loop$35.vs], res:$jscomp$loop$35.vs, generator:function($jscomp$loop$35) {
        return function(a, modifs, codebuilder) {
          return usescalarmult($jscomp$loop$35.vs)([a[0 ^ $jscomp$loop$35.swap], a[1 ^ $jscomp$loop$35.swap]], modifs, codebuilder);
        };
      }($jscomp$loop$35)};
    } else {
      if (issubtypeof(args[0 ^ $jscomp$loop$35.swap], type.complex) && iscvectorspace(args[1 ^ $jscomp$loop$35.swap])) {
        $jscomp$loop$35.vs$8 = getcvectorspace(args[1 ^ $jscomp$loop$35.swap]);
        return {args:$jscomp$loop$35.swap ? [$jscomp$loop$35.vs$8, type.complex] : [type.complex, $jscomp$loop$35.vs$8], res:$jscomp$loop$35.vs$8, generator:function($jscomp$loop$35) {
          return function(a, modifs, codebuilder) {
            return usecscalarmult($jscomp$loop$35.vs$8)([a[0 ^ $jscomp$loop$35.swap], a[1 ^ $jscomp$loop$35.swap]], modifs, codebuilder);
          };
        }($jscomp$loop$35)};
      }
    }
  }
};
webgl["*"] = webgl["mult"];
webgl["div"] = function(args) {
  var match = first([[[type.float, type.float], type.float, useinfix("/")], [[type.float, type.complex], type.complex, useincludefunction("divfc")], [[type.complex, type.float], type.complex, useinfix("/")], [[type.complex, type.complex], type.complex, useincludefunction("divc")]])(args);
  if (match) {
    return match;
  }
  if (issubtypeof(args[1], type.float) && iscvectorspace(args[0])) {
    var vectorspace = getrvectorspace(args[0]);
    if (isnativeglsl(vectorspace)) {
      return {args:[vectorspace, type.float], res:vectorspace, generator:useinfix("/")};
    }
  }
  return false;
};
webgl["/"] = webgl["div"];
webgl["re"] = first([[[type.complex], type.float, useincludefunction("realc")]]);
webgl["im"] = first([[[type.complex], type.float, useincludefunction("imagc")]]);
webgl["floor"] = first([[[type.float], type.int, function(a) {
  return "int(floor(" + a + "))";
}], [[type.complex], type.complex, usefunction("floor")]]);
webgl["round"] = first([[[type.float], type.int, function(a) {
  return "int(floor(" + a + "+.5))";
}], [[type.complex], type.complex, function(a) {
  return "floor(" + a + "+vec2(.5))";
}]]);
webgl["ceil"] = first([[[type.float], type.int, function(a) {
  return "int(ceil(" + a + "))";
}], [[type.complex], type.complex, usefunction("ceil")]]);
webgl["mod"] = first([[[type.int, type.int], type.int, function(a, cb) {
  return "int(" + usefunction("mod")("float(" + a[0] + "), float(" + a[1] + ")", cb) + ")";
}], [[type.float, type.float], type.float, usefunction("mod")], [[type.complex, type.complex], type.complex, useincludefunction("mod")]]);
webgl["random"] = first([[[], type.float, useincludefunction("random")], [[type.float], type.float, function(a, modifs, cb) {
  return useincludefunction("random")([], modifs, cb) + "*" + a[0];
}], [[type.complex], type.complex, function(a, modifs, cb) {
  return "vec2(" + useincludefunction("random")([], modifs, cb) + "," + useincludefunction("random")([], modifs, cb) + ")*" + a[0];
}]]);
webgl["randomint"] = first([[[type.int], type.int, function(a, modifs, cb) {
  return "int(floor(" + useincludefunction("random")([], modifs, cb) + "*float(" + a[0] + ")))";
}], [[type.float], type.int, function(a, modifs, cb) {
  return "int(floor(" + useincludefunction("random")([], modifs, cb) + "*floor(" + a[0] + ")))";
}]]);
webgl["randominteger"] = webgl["randomint"];
webgl["randombool"] = first([[[], type.bool, function(a, modifs, cb) {
  return "(" + useincludefunction("random")([], modifs, cb) + ">.5)";
}]]);
webgl["randomnormal"] = first([[[], type.float, useincludefunction("randomnormal")]]);
webgl["arctan2"] = first([[[type.float, type.float], type.float, function(args) {
  return "atan(" + args[1] + ", " + args[0] + ")";
}], [[type.complex, type.complex], type.complex, useincludefunction("arctan2c")], [[type.complex], type.float, useincludefunction("arctan2vec2")], [[type.vec2], type.float, useincludefunction("arctan2vec2")], [[type.cvec(2)], type.complex, useincludefunction("arctan2cvec2")]]);
["red", "green", "blue", "gray", "hue"].forEach(function(oper) {
  webgl[oper] = first([[[type.float], type.vec3, useincludefunction(oper)]]);
});
webgl["grey"] = webgl["gray"];
webgl["min"] = function(args) {
  var match = first([[[type.float, type.float], type.float, usefunction("min")]])(args);
  if (match) {
    return match;
  }
  if (args.length === 1 && depth(args[0]) === 1 && isrvectorspace(args[0])) {
    return {args:args, res:args[0].parameters, generator:usemin(args[0])};
  }
};
webgl["max"] = function(args) {
  var match = first([[[type.int, type.int], type.int, usefunction("max")], [[type.float, type.float], type.float, usefunction("max")]])(args);
  if (match) {
    return match;
  }
  if (args.length === 1 && depth(args[0]) === 1 && isrvectorspace(args[0])) {
    return {args:args, res:args[0].parameters, generator:usemax(args[0])};
  }
};
var createraise = function(k, codebuilder) {
  if (k <= 1) {
    return;
  } else {
    if (k == 2) {
      codebuilder.add("functions", "raise2", function() {
        return "float raise2(float a) { return a*a; }";
      });
    } else {
      createraise(2, codebuilder);
      var raise = function(a, k) {
        return k == 1 ? a : k & 1 ? raise(a, k - 1) + "*a" : "raise2(" + raise(a, k / 2) + ")";
      };
      var name = "raise" + k;
      codebuilder.add("functions", name, function() {
        return "float " + name + "(float a) { return " + raise("a", k) + ";}";
      });
    }
  }
};
var useraise = function(k) {
  return function(args, modifs, codebuilder) {
    return k == 0 ? "1." : k == 1 ? args[0] : createraise(k, codebuilder) || "raise" + k + "(" + args[0] + ")";
  };
};
webgl["pow"] = function(args) {
  if (isconstantint(args[1]) && issubtypeof(args[0], type.float)) {
    var k = Number(args[1].value["value"]["real"]);
    if (k >= 0) {
      return {args:[type.float, args[1]], res:type.float, generator:useraise(k)};
    }
  }
  return first([[[type.float, type.int], type.float, useincludefunction("powi")], [[type.complex, type.complex], type.complex, useincludefunction("powc")]])(args);
};
webgl["^"] = webgl["pow"];
webgl["re"] = first([[[type.complex], type.float, getReal]]);
webgl["conjugate"] = first([[[type.complex], type.complex, useincludefunction("conjugate")]]);
webgl["im"] = first([[[type.complex], type.float, getImag]]);
webgl["genList"] = function(args) {
  var n = args.length;
  if (n > 0) {
    var l = false;
    for (var i in args) {
      l = lca(l, args[i]);
    }
    if (l) {
      var t = list(n, l);
      return {args:Array(n).fill(l), res:t, generator:uselist(t)};
    }
  }
  return false;
};
webgl["&"] = first([[[type.bool, type.bool], type.bool, useinfix("&&")]]);
webgl["%"] = first([[[type.bool, type.bool], type.bool, useinfix("||")]]);
[">", "<", ">=", "<=", "==", "!="].forEach(function(oper) {
  webgl[oper] = first([[[type.int, type.int], type.bool, useinfix(oper)], [[type.float, type.float], type.bool, useinfix(oper)]]);
});
webgl["!"] = first([[[type.bool], type.bool, usefunction("!")], [[type.voidt, type.bool], type.bool, function(args) {
  return usefunction("!")([args[1]]);
}]]);
webgl["not"] = webgl["!"];
webgl["imagergb"] = first([[[type.image, type.coordinate2d], type.vec3, useimagergb2], [[type.coordinate2d, type.coordinate2d, type.image, type.coordinate2d], type.vec3, useimagergb4]]);
webgl["imagergba"] = first([[[type.image, type.coordinate2d], type.vec4, useimagergba2], [[type.coordinate2d, type.coordinate2d, type.image, type.coordinate2d], type.vec4, useimagergba4]]);
webgl["reverse"] = function(args) {
  return args.length === 1 && args[0].type === "list" ? {args:args, res:args[0], generator:usereverse(args[0])} : false;
};
webgl["sort"] = function(args) {
  return args.length === 1 && depth(args[0]) === 1 && isrvectorspace(args[0]) ? {args:args, res:args[0], generator:usesort(args[0])} : false;
};
webgl["transpose"] = function(args) {
  return args.length === 1 && depth(args[0]) >= 2 ? {args:args, res:list(args[0].parameters.length, list(args[0].length, args[0].parameters.parameters)), generator:usetranspose(args[0])} : false;
};
webgl["det"] = first([[[type.mat2], type.float, useincludefunction("det2")], [[type.mat3], type.float, useincludefunction("det3")], [[type.mat4], type.float, useincludefunction("det4")], [[type.point, type.point, type.point], type.float, useincludefunction("det3v")]]);
Object.freeze(webgl);
requires["powc"] = ["expc", "multc", "logc"];
requires["sqrtc"] = ["expc", "multc", "logc"];
requires["arccosc"] = ["multc", "negc", "sqrtc", "addc", "logc"];
requires["arcsinc"] = ["multc", "negc", "sqrtc", "addc", "logc"];
requires["tanc"] = ["sinc", "cosc", "divc"];
requires["arctanc"] = ["logc", "addc", "multc", "subc"];
requires["arctan2c"] = ["logc", "divc", "sqrtc", "multc"];
requires["arctan2vec2c"] = ["arctan2c"];
requires["hue"] = ["hsv2rgb"];
requires["randomnormal"] = ["random"];
requires["subpoints"] = ["dehomogenize"];
requires["addpoints"] = ["dehomogenize"];
Object.freeze(requires);
function CodeBuilder(api) {
  this.variables = {};
  this.uniforms = {};
  this.scopes = {};
  this.sections = {};
  this.typetime = 0;
  this.myfunctions = {};
  this.api = api;
  this.texturereaders = {};
}
CodeBuilder.prototype.sections;
CodeBuilder.prototype.add = function(section, name, codegen) {
  this.mark(section, name);
  if (!this.sections[section].codes[name]) {
    this.sections[section].codes[name] = codegen();
    this.sections[section].marked[name] = true;
    this.sections[section].order.push(name);
  }
};
CodeBuilder.prototype.mark = function(section, name) {
  if (!this.sections[section]) {
    this.sections[section] = {order:[], marked:{}, codes:{}};
  }
  var r = this.sections[section].marked[name] || false;
  this.sections[section].marked[name] = true;
  return r;
};
CodeBuilder.prototype.generateSection = function(section) {
  var $jscomp$this = this;
  return this.sections[section] ? this.sections[section].order.map(function(name) {
    return $jscomp$this.sections[section].codes[name];
  }).join("\n") : "\n";
};
CodeBuilder.prototype.myfunctions;
CodeBuilder.prototype.typetime;
CodeBuilder.prototype.variables;
CodeBuilder.prototype.uniforms;
CodeBuilder.prototype.api;
CodeBuilder.prototype.texturereaders;
CodeBuilder.prototype.castType = function(term, fromType, toType) {
  if (typesareequal(fromType, toType)) {
    return term;
  }
  if (!issubtypeof(fromType, toType)) {
    console.error(typeToString(fromType) + " is no subtype of " + typeToString(toType) + " (trying to cast the term " + term + ")");
    return term;
  } else {
    if (fromType.type === "constant") {
      return pastevalue(fromType.value, toType);
    } else {
      var implementation = inclusionfunction(toType)([fromType]);
      if (!implementation) {
        console.error("cannot find an implementation for " + typeToString(fromType) + " -> " + typeToString(toType) + ", using identity");
        return term;
      }
      var generator = implementation.generator;
      return generator(this.castType(term, fromType, implementation.args[0]), {}, this);
    }
  }
};
CodeBuilder.prototype.initvariable = function(vname, declareglobal) {
  if (!this.variables[vname]) {
    this.variables[vname] = {};
  }
  if (!this.variables[vname].assigments) {
    this.variables[vname].assigments = [];
  }
  if (!this.variables[vname].T) {
    this.variables[vname].T = false;
  }
  if (!this.hasOwnProperty("global")) {
    this.variables[vname]["global"] = declareglobal;
  }
};
CodeBuilder.prototype.computeType = function(expr) {
  var bindings = expr.bindings;
  if (expr["isuniform"]) {
    return this.uniforms[expr["uvariable"]].type;
  } else {
    if (expr["ctype"] === "variable") {
      var name = expr["name"];
      name = bindings[name] || name;
      return this.variables[name].T;
    } else {
      if (expr["ctype"] === "function" && this.myfunctions.hasOwnProperty(expr["oper"])) {
        return this.variables[bindings[expr["oper"]]].T;
      } else {
        if (expr["ctype"] === "number") {
          return constant(expr);
        } else {
          if (expr["ctype"] === "void") {
            return type.voidt;
          } else {
            if (expr["ctype"] === "field") {
              var t = generalize(this.getType(expr["obj"]));
              if (expr["key"].length == 1) {
                if (t.type === "list") {
                  return t.parameters;
                } else {
                  if (issubtypeof(t, type.point)) {
                    return type.float;
                  }
                }
              } else {
                if (expr["key"] == "xy" && issubtypeof(t, type.point)) {
                  return type.vec2;
                }
              }
              if (!t) {
                return false;
              }
            } else {
              if (expr["ctype"] === "string") {
                return type.image;
              } else {
                if (expr["ctype"] === "function" || expr["ctype"] === "infix") {
                  var argtypes = new Array(expr["args"].length);
                  var allconstant = true;
                  for (var i = 0; i < expr["args"].length; i++) {
                    argtypes[i] = this.getType(expr["args"][i]);
                    allconstant &= argtypes[i].type === "constant";
                  }
                  if (allconstant && expr["impl"]) {
                    var constantexpression = {"ctype":expr["ctype"], "oper":expr["oper"], "impl":expr["impl"], "args":argtypes.map(function(a) {
                      return a.value;
                    })};
                    var val = this.api.evaluateAndVal(constantexpression);
                    return constant(val);
                  } else {
                    var f = getPlainName(expr["oper"]);
                    var implementation = webgl[f] ? webgl[f](argtypes) : false;
                    if (!implementation && argtypes.every(function(a) {
                      return finalparameter(a);
                    })) {
                      console.error("Could not find an implementation for " + f + " with args (" + argtypes.map(typeToString).join(", ") + ")");
                      console.log(expr);
                      throw "error";
                    }
                    return implementation ? implementation.res : false;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.error("Don't know how to compute type of");
  console.log(expr);
  return false;
};
CodeBuilder.prototype.getType = function(expr) {
  if (!expr.computedType || !expr.typetime || this.typetime > expr.typetime) {
    expr.computedType = this.computeType(expr);
    expr.typetime = this.typetime;
  }
  return expr.computedType;
};
CodeBuilder.prototype.determineVariables = function(expr, bindings) {
  var variables = this.variables;
  var myfunctions = this.myfunctions;
  var self = this;
  rec(expr, bindings, "global", false);
  function addvar(bindings, varname, type) {
    var ans = {};
    for (var i in bindings) {
      ans[i] = bindings[i];
    }
    var ivar = generateUniqueHelperString();
    self.initvariable(ivar, false);
    variables[ivar].T = type;
    variables[ivar].iterationvariable = true;
    ans[varname] = ivar;
    return ans;
  }
  function rec(expr, bindings, scope, forceconstant) {
    expr.bindings = bindings;
    for (var i in expr["args"]) {
      var needtobeconstant = forceconstant || expr["oper"] === "repeat$2" && i == 0 || expr["oper"] === "repeat$3" && i == 0 || expr["oper"] === "_" && i == 1;
      var nbindings = bindings;
      if (["repeat", "forall", "apply"].indexOf(getPlainName(expr["oper"])) !== -1) {
        if (i == 1) {
          nbindings = expr["oper"] === "repeat$2" ? addvar(bindings, "#", type.int) : expr["oper"] === "repeat$3" ? addvar(bindings, expr["args"][1]["name"], type.int) : expr["oper"] === "forall$2" || expr["oper"] === "apply$2" ? addvar(bindings, "#", false) : expr["oper"] === "forall$3" || expr["oper"] === "apply$3" ? addvar(bindings, expr["args"][1]["name"], false) : bindings;
        } else {
          if (i == 2) {
            nbindings = expr["args"][1].bindings;
          }
        }
      }
      rec(expr["args"][i], nbindings, scope, needtobeconstant);
    }
    if (expr["ctype"] === "field") {
      rec(expr["obj"], bindings, scope, forceconstant);
    }
    if (expr["ctype"] === "variable") {
      var vname = expr["name"];
      vname = bindings[vname] || vname;
      if (forceconstant && self.variables[vname]) {
        self.variables[vname].forceconstant = true;
      }
    }
    if (expr["oper"] === "=") {
      var vname$9 = expr["args"][0]["name"];
      vname$9 = bindings[vname$9] || vname$9;
      self.initvariable(vname$9, true);
      variables[vname$9].assigments.push(expr["args"][1]);
    } else {
      if (expr["oper"] && getPlainName(expr["oper"]) === "regional" && scope != "global") {
        for (var i$10 in expr["args"]) {
          var vname$11 = expr["args"][i$10]["name"];
          var iname = generateUniqueHelperString();
          bindings[vname$11] = iname;
          if (!myfunctions[scope].variables) {
            myfunctions[scope].variables = [];
          }
          myfunctions[scope].variables.push(iname);
          self.initvariable(iname, false);
        }
      } else {
        if (expr["oper"] === "forall$2" || expr["oper"] === "apply$2" || expr["oper"] === "forall$3" || expr["oper"] === "apply$3") {
          var it = expr["args"].length === 2 ? expr["args"][1].bindings["#"] : expr["args"][2].bindings[expr["args"][1]["name"]];
          variables[it].assigments.push({"ctype":"infix", "oper":"_", "args":[expr["args"][0], {"ctype":"number", "value":{"real":1, "imag":0}}], bindings:expr["args"][0].bindings});
        } else {
          if (expr["ctype"] === "function" && myfunctions.hasOwnProperty(expr["oper"])) {
            var rfun = expr["oper"];
            var pname = rfun.replace("$", "_");
            self.initvariable(pname, false);
            bindings[rfun] = pname;
            var localbindungs = {};
            for (var i$12 in myfunctions[rfun]["arglist"]) {
              var localname = myfunctions[rfun]["arglist"][i$12]["name"];
              var a = pname + "_" + localname;
              localbindungs[localname] = a;
              self.initvariable(a, false);
              variables[a].assigments.push(expr["args"][i$12]);
            }
            if (!myfunctions[rfun].visited) {
              myfunctions[rfun].visited = true;
              rec(myfunctions[rfun]["body"], localbindungs, rfun, forceconstant);
              variables[pname].assigments.push(myfunctions[rfun]["body"]);
            }
          }
        }
      }
    }
  }
};
CodeBuilder.prototype.determineTypes = function() {
  var changed = true;
  for (var v in this.variables) {
    this.variables[v].T = this.variables[v].T || false;
    if (this.variables[v].forceconstant) {
      this.variables[v].T = constint(1);
      this.typetime++;
    }
  }
  while (changed) {
    changed = false;
    for (var v$13 in this.variables) {
      if (!this.variables[v$13].forceconstant) {
        for (var i in this.variables[v$13].assigments) {
          var e = this.variables[v$13].assigments[i];
          var othertype = generalize(this.getType(e));
          var oldtype = this.variables[v$13].T || false;
          var newtype = oldtype;
          if (othertype) {
            if (!oldtype) {
              newtype = othertype;
            } else {
              if (issubtypeof(othertype, oldtype)) {
                newtype = oldtype;
              } else {
                newtype = lca(oldtype, othertype);
              }
            }
            if (newtype && newtype !== oldtype) {
              this.variables[v$13].T = newtype;
              this.typetime++;
              changed = true;
            }
          }
        }
      }
    }
  }
};
CodeBuilder.prototype.determineUniforms = function(expr) {
  var variables = this.variables;
  var myfunctions = this.myfunctions;
  var variableDependendsOnPixel = {"cgl_pixel":true, "cgl_pixel.x":true, "cgl_pixel.y":true};
  for (var v in variables) {
    if (variables[v].assigments.length >= 1 || variables[v].iterationvariable) {
      variableDependendsOnPixel[v] = true;
    }
  }
  dependsOnPixel(expr);
  var visitedFunctions = {"":true};
  var uniforms = this.uniforms;
  computeUniforms(expr, false);
  function dependsOnPixel(expr) {
    if (expr.hasOwnProperty("dependsOnPixel")) {
      return expr["dependsOnPixel"];
    }
    if (expr["ctype"] === "variable") {
      var vname = expr["name"];
      vname = expr.bindings[vname] || vname;
      if (variableDependendsOnPixel[vname]) {
        return expr["dependsOnPixel"] = true;
      }
      return expr["dependsOnPixel"] = false;
    }
    var alwaysPixelDependent = ["random", "randomint", "randominteger", "randombool", "randomnormal", "verbatimglsl"];
    if (expr["ctype"] === "function" && alwaysPixelDependent.indexOf(getPlainName(expr["oper"])) !== -1) {
      return expr["dependsOnPixel"] = true;
    }
    if (expr["oper"] === "repeat$2" || expr["oper"] === "forall$2" || expr["oper"] === "apply$2") {
      if (dependsOnPixel(expr["args"][1])) {
        variableDependendsOnPixel[expr["args"][1].bindings["#"]] = true;
        return expr["dependsOnPixel"] = true;
      } else {
        return expr["dependsOnPixel"] = false;
      }
    } else {
      if (expr["oper"] === "repeat$3" || expr["oper"] === "forall$3" || expr["oper"] === "apply$3") {
        if (dependsOnPixel(expr["args"][2])) {
          variableDependendsOnPixel[expr["args"][2].bindings[expr["args"][1]["name"]]] = true;
          expr["args"][1]["dependsOnPixel"] = true;
          return expr["dependsOnPixel"] = true;
        } else {
          return expr["dependsOnPixel"] = false;
        }
      }
    }
    for (var i in expr["args"]) {
      if (dependsOnPixel(expr["args"][i])) {
        return expr["dependsOnPixel"] = true;
      }
    }
    if (expr["ctype"] === "function" && myfunctions.hasOwnProperty(expr["oper"])) {
      var rfun = expr["oper"];
      if (dependsOnPixel(myfunctions[rfun].body)) {
        return expr["dependsOnPixel"] = true;
      }
    }
    if (expr["ctype"] === "field") {
      return expr["dependsOnPixel"] = dependsOnPixel(expr["obj"]);
    }
    return expr["dependsOnPixel"] = false;
  }
  function computeUniforms(expr, forceconstant) {
    if (dependsOnPixel(expr)) {
      for (var i in expr["args"]) {
        var needtobeconstant = forceconstant || expr["oper"] === "repeat$2" && i == 0 || expr["oper"] === "repeat$3" && i == 0 || expr["oper"] === "_" && i == 1;
        computeUniforms(expr["args"][i], needtobeconstant);
      }
      if (expr["ctype"] === "field") {
        computeUniforms(expr["obj"], forceconstant);
      }
      if (expr["ctype"] === "function" && myfunctions.hasOwnProperty(expr["oper"])) {
        var rfun = expr["oper"];
        if (!visitedFunctions.hasOwnProperty(rfun)) {
          visitedFunctions[rfun] = true;
          computeUniforms(myfunctions[rfun].body, forceconstant);
        }
      }
    } else {
      if (expr["ctype"] === "boolean") {
        return;
      }
      if (expr["ctype"] === "number") {
        return;
      }
      if (expr["ctype"] === "void") {
        return;
      }
      if (expr["oper"] === "..") {
        forceconstant = true;
      }
      var found = false;
      var uname;
      for (var otheruname in uniforms) {
        if (!found) {
          if (expressionsAreEqual(expr, uniforms[otheruname].expr)) {
            found = true;
            uname = otheruname;
          }
        }
      }
      if (!found) {
        uname = generateUniqueHelperString();
        uniforms[uname] = {expr:expr, type:false, forceconstant:forceconstant};
      }
      uniforms[uname].forceconstant = uniforms[uname].forceconstant || forceconstant;
      expr["isuniform"] = true;
      expr["uvariable"] = uname;
    }
  }
};
CodeBuilder.prototype.determineUniformTypes = function() {
  for (var uname in this.uniforms) {
    var tval = this.api.evaluateAndVal(this.uniforms[uname].expr);
    if (!tval["ctype"] || tval["ctype"] === "undefined") {
      console.error("can not evaluate:");
      console.log(this.uniforms[uname].expr);
      return false;
    }
    this.uniforms[uname].type = this.uniforms[uname].forceconstant ? constant(tval) : guessTypeOfValue(tval);
  }
};
CodeBuilder.prototype.copyRequiredFunctions = function(expr) {
  if (expr["ctype"] === "function" && !this.myfunctions.hasOwnProperty(expr["oper"]) && this.api.getMyfunction(expr["oper"]) !== null) {
    var fun = expr["oper"];
    this.myfunctions[fun] = cloneExpression(this.api.getMyfunction(fun));
    this.copyRequiredFunctions(this.myfunctions[fun].body);
  }
  for (var i in expr["args"]) {
    this.copyRequiredFunctions(expr["args"][i]);
  }
};
CodeBuilder.prototype.generatePixelBindings = function(expr) {
  var bindings = {};
  var free = {};
  function clone(a) {
    var c = {};
    for (var i in a) {
      c[i] = a[i];
    }
    return c;
  }
  function rec(expr, bounded) {
    if (expr["oper"] === "repeat$2" || expr["oper"] === "forall$2" || expr["oper"] === "apply$2") {
      bounded = clone(bounded);
      bounded["#"] = true;
    } else {
      if (expr["oper"] === "repeat$3" || expr["oper"] === "forall$3" || expr["oper"] === "apply$3") {
        bounded = clone(bounded);
        bounded[expr["args"][1]["name"]] = true;
      } else {
        if (expr["oper"] === "=") {
          bounded[expr["args"][0]["name"]] = true;
        }
      }
    }
    for (var i in expr["args"]) {
      rec(expr["args"][i], bounded);
    }
    if (expr["ctype"] === "field") {
      rec(expr["obj"], bounded);
    }
    if (expr["ctype"] === "variable") {
      var vname = expr["name"];
      if (!bounded[vname]) {
        free[vname] = true;
      }
    }
  }
  rec(expr, {});
  this.initvariable("cgl_pixel", false);
  this.variables["cgl_pixel"].T = type.vec2;
  if (Object.keys(free).length == 1) {
    bindings[Object.keys(free)[0]] = "cgl_pixel";
  } else {
    if (free["#"]) {
      bindings["#"] = "cgl_pixel";
    } else {
      if (free["x"] && free["y"]) {
        this.initvariable("cgl_pixel.x", false);
        this.variables["cgl_pixel.x"].T = type.float;
        bindings["x"] = "cgl_pixel.x";
        this.initvariable("cgl_pixel.y", false);
        this.variables["cgl_pixel.y"].T = type.float;
        bindings["y"] = "cgl_pixel.y";
      } else {
        var notassigned = [];
        for (var v in free) {
          if (this.api.nada == this.api.evaluateAndVal({"ctype":"variable", "name":v})) {
            notassigned.push(v);
          }
        }
        if (notassigned.length == 1) {
          bindings[notassigned[0]] = "cgl_pixel";
        } else {
          if (free["p"]) {
            bindings["p"] = "cgl_pixel";
          } else {
            if (free["z"]) {
              bindings["z"] = "cgl_pixel";
            }
          }
        }
      }
    }
  }
  if (bindings["z"] === "cgl_pixel") {
    this.variables["cgl_pixel"].T = type.complex;
  }
  return bindings;
};
CodeBuilder.prototype.precompile = function(expr) {
  this.copyRequiredFunctions(expr);
  this.determineVariables(expr, this.generatePixelBindings(expr));
  this.determineUniforms(expr);
  this.determineUniformTypes();
  this.determineTypes();
  for (var u in this.uniforms) {
    if (this.uniforms[u].type.type === "list") {
      createstruct(this.uniforms[u].type, this);
    }
  }
  for (var v in this.variables) {
    if (this.variables[v].T.type === "list") {
      createstruct(this.variables[v].T, this);
    }
  }
};
CodeBuilder.prototype.compile = function(expr, generateTerm) {
  var self = this;
  var ctype = this.getType(expr);
  if (expr["isuniform"]) {
    var uname = expr["uvariable"];
    var uniforms = this.uniforms;
    return generateTerm ? {code:"", term:ctype.type === "constant" ? pastevalue(ctype.value, generalize(ctype)) : uname} : {code:""};
  } else {
    if (expr["oper"] === ";") {
      var r = {term:""};
      var code = "";
      var lastindex = expr["args"].length - 1;
      for (var i = lastindex; i >= 0; i--) {
        if (expr["args"][i]["ctype"] === "void") {
          lastindex = i - 1;
        }
      }
      for (var i$14 = 0; i$14 <= lastindex; i$14++) {
        r = this.compile(expr["args"][i$14], generateTerm && i$14 === lastindex);
        code += r.code;
      }
      return generateTerm ? {code:code, term:r.term} : {code:code};
    }
  }
  if (ctype.type === "constant") {
    return generateTerm ? {term:pastevalue(ctype.value, generalize(ctype)), code:""} : {code:""};
  } else {
    if (expr["oper"] === "=") {
      var r$15 = this.compile(expr["args"][1], true);
      var varexpr = this.compile(expr["args"][0], true).term;
      var t = varexpr + " = " + this.castType(r$15.term, this.getType(expr["args"][1]), this.getType(expr["args"][0]));
      if (generateTerm) {
        return {code:r$15.code, term:t};
      } else {
        return {code:r$15.code + t + ";\n"};
      }
    } else {
      if (expr["oper"] === "repeat$2" || expr["oper"] === "repeat$3") {
        var number = this.compile(expr["args"][0], true);
        var ntype = this.getType(expr["args"][0]);
        if (ntype.type !== "constant") {
          console.error("repeat possible only for fixed constant number in GLSL");
          return false;
        }
        var it = expr["oper"] === "repeat$2" ? expr["args"][1].bindings["#"] : expr["args"][2].bindings[expr["args"][1]["name"]];
        var n = Number(number.term);
        var code$16 = "";
        if (this.variables[it].T.type === "constant") {
          for (var k = 1; k <= n; k++) {
            this.variables[it].T = constint(k);
            this.typetime++;
            var r$17 = this.compile(expr["args"][expr["oper"] === "repeat$2" ? 1 : 2], k === n && generateTerm);
            code$16 += r$17.code;
            if (k === n && generateTerm) {
              return {code:code$16, term:r$17.term};
            }
          }
        } else {
          var ansvar = "";
          var r$18 = this.compile(expr["args"][expr["oper"] === "repeat$2" ? 1 : 2], generateTerm);
          var rtype = this.getType(expr["args"][expr["oper"] === "repeat$2" ? 1 : 2]);
          if (generateTerm) {
            ansvar = generateUniqueHelperString();
            if (!this.variables[ansvar]) {
              this.initvariable(ansvar, true);
              this.variables[ansvar].T = rtype;
            }
          }
          code$16 += "for(int " + it + "=1; " + it + " <= " + n + "; " + it + "++) {\n";
          code$16 += r$18.code;
          if (generateTerm) {
            code$16 += ansvar + " = " + r$18.term + ";\n";
          }
          code$16 += "}\n";
          if (generateTerm) {
            return {code:code$16, term:ansvar};
          }
        }
        return {code:code$16};
      } else {
        if (expr["oper"] === "forall$2" || expr["oper"] === "forall$3" || expr["oper"] === "apply$2" || expr["oper"] === "apply$3") {
          var arraytype = this.getType(expr["args"][0]);
          if (!(arraytype.type === "list" || arraytype.type === "constant" && arraytype.value["ctype"] === "list")) {
            console.error(expr["oper"] + " only possible for lists");
            return false;
          }
          var n$19 = arraytype.length || arraytype.value["value"].length;
          var r$20;
          var it$21 = expr["args"].length === 2 ? expr["args"][1].bindings["#"] : expr["args"][2].bindings[expr["args"][1]["name"]];
          var ittype = this.variables[it$21].T;
          var code$22 = "";
          var ans = "";
          if (generateTerm) {
            ans = generateUniqueHelperString();
            code$22 += webgltype(ctype) + " " + ans + ";\n";
          }
          if (ctype.type === "list") {
            createstruct(ctype, this);
          }
          if (this.variables[it$21].T.type === "constant" || arraytype.type === "constant") {
            var arrayval = this.api.evaluateAndVal(expr["args"][0]);
            for (var i$23 = 0; i$23 < n$19; i$23++) {
              this.variables[it$21].T = constant(arrayval["value"][i$23]);
              this.typetime++;
              r$20 = this.compile(expr["args"][expr["args"].length === 2 ? 1 : 2], generateTerm);
              code$22 += r$20.code;
              if (expr["oper"] === "forall$2" || expr["oper"] === "forall$3") {
                if (i$23 + 1 === n$19 && generateTerm) {
                  code$22 += ans + " = " + r$20.term + ";\n";
                }
              } else {
                if (generateTerm) {
                  code$22 += accesslist(ctype, i$23)([ans], [], this) + " = " + r$20.term + ";\n";
                }
              }
            }
          } else {
            r$20 = this.compile(expr["args"][expr["args"].length === 2 ? 1 : 2], generateTerm);
            var array = this.compile(expr["args"][0], true);
            code$22 += array.code;
            var sterm = array.term;
            if (!this.variables[sterm] && !this.uniforms[sterm] && arraytype.length >= 2) {
              sterm = generateUniqueHelperString();
              code$22 += webgltype(arraytype) + " " + sterm + " = " + array.term + ";\n";
            }
            this.variables[it$21]["global"] = true;
            for (var i$24 = 0; i$24 < n$19; i$24++) {
              code$22 += it$21 + " = " + accesslist(arraytype, i$24)([sterm], [], this) + ";\n";
              code$22 += r$20.code;
              if (generateTerm) {
                if (expr["oper"] === "forall$2" || expr["oper"] === "forall$3") {
                  if (i$24 === n$19 - 1) {
                    code$22 += ans + " = " + r$20.term + ";\n";
                  }
                } else {
                  code$22 += accesslist(ctype, i$24)([ans], [], this) + " = " + r$20.term + ";\n";
                }
              }
            }
            if (ittype.type === "list") {
              createstruct(ittype, this);
            }
          }
          return generateTerm ? {code:code$22, term:ans} : {code:code$22};
        } else {
          if (expr["oper"] === "if$2" || expr["oper"] === "if$3") {
            var cond = this.compile(expr["args"][0], true);
            var condt = this.getType(expr["args"][0]);
            var code$25 = "";
            var ansvar$26 = "";
            var ifbranch = this.compile(expr["args"][1], generateTerm);
            if (generateTerm) {
              ansvar$26 = generateUniqueHelperString();
              if (!this.variables[ansvar$26]) {
                this.initvariable(ansvar$26, true);
                this.variables[ansvar$26].T = ctype;
              }
            }
            if (condt.type != "constant") {
              code$25 += cond.code;
              code$25 += "if(" + cond.term + ") {\n";
            }
            if (condt.type != "constant" || condt.type == "constant" && condt.value["value"]) {
              code$25 += ifbranch.code;
              if (generateTerm) {
                code$25 += ansvar$26 + " = " + this.castType(ifbranch.term, this.getType(expr["args"][1]), ctype) + ";\n";
              }
            }
            if (expr["oper"] === "if$3") {
              var elsebranch = this.compile(expr["args"][2], generateTerm);
              if (condt.type != "constant") {
                code$25 += "} else {\n";
              }
              if (condt.type != "constant" || condt.type == "constant" && !condt.value["value"]) {
                code$25 += elsebranch.code;
                if (generateTerm) {
                  code$25 += ansvar$26 + " = " + this.castType(elsebranch.term, this.getType(expr["args"][2]), ctype) + ";\n";
                }
              }
            }
            if (condt.type != "constant") {
              code$25 += "}\n";
            }
            return generateTerm ? {code:code$25, term:ansvar$26} : {code:code$25};
          } else {
            if (expr["ctype"] === "function" || expr["ctype"] === "infix") {
              var fname = expr["oper"];
              if (getPlainName(fname) === "verbatimglsl") {
                var glsl = this.api.evaluateAndVal(expr["args"][0])["value"];
                return generateTerm ? {term:glsl, code:""} : {code:glsl};
              }
              var r$27 = expr["args"].map(function(e) {
                return self.compile(e, true);
              });
              var termGenerator;
              var currenttype = expr["args"].map(function(e) {
                return self.getType(e);
              });
              var targettype;
              if (this.myfunctions.hasOwnProperty(fname)) {
                termGenerator = this.usemyfunction(fname);
                targettype = new Array(r$27.length);
                for (var i$28 = 0; i$28 < r$27.length; i$28++) {
                  targettype[i$28] = this.variables[this.myfunctions[fname].body.bindings[this.myfunctions[fname]["arglist"][i$28]["name"]]].T;
                }
              } else {
                fname = getPlainName(fname);
                if (fname === "regional") {
                  return generateTerm ? {term:"", code:""} : {code:""};
                }
                var implementation = webgl[fname](currenttype);
                if (!implementation) {
                  console.error("Could not find an implementation for " + fname + "(" + currenttype.map(typeToString).join(", ") + ").\nReturning empty code");
                  return generateTerm ? {term:"", code:""} : {code:""};
                }
                targettype = implementation.args;
                termGenerator = implementation.generator;
              }
              var code$29 = "";
              var argterms = new Array(r$27.length);
              for (var i$30 = 0; i$30 < r$27.length; i$30++) {
                code$29 += r$27[i$30].code;
                argterms[i$30] = this.castType(r$27[i$30].term, currenttype[i$30], targettype[i$30]);
              }
              var term = termGenerator(argterms, expr["modifs"], this);
              if (generateTerm) {
                return {term:term, code:code$29};
              } else {
                return {code:code$29 + term + ";\n"};
              }
            } else {
              if (expr["ctype"] === "variable") {
                var term$31 = expr["name"];
                term$31 = expr.bindings[term$31] || term$31;
                return generateTerm ? {term:term$31, code:""} : {code:term$31 + ";\n"};
              } else {
                if (expr["ctype"] === "void") {
                  return generateTerm ? {term:"", code:""} : {code:""};
                } else {
                  if (expr["ctype"] === "field") {
                    var objt = this.getType(expr["obj"]);
                    var index = {"x":0, "y":1, "z":2, "r":0, "g":1, "b":2, "a":3}[expr["key"]];
                    var term$32 = false;
                    var objterm = self.compile(expr["obj"], true).term;
                    if (index != undefined && objt.type === "list") {
                      term$32 = accesslist(objt, index)([objterm], null, this);
                    } else {
                      if (expr["key"] === "xy" && objt.type === "list") {
                        if (objt.length === 2) {
                          term$32 = objterm;
                        }
                        if (objt.length === 3) {
                          term$32 = useincludefunction("dehomogenize")([self.castType(objterm, objt, type.point)], null, this);
                        }
                      } else {
                        if (objt === type.point) {
                          var funs = {"xy":"dehomogenize", "x":"dehomogenizex", "y":"dehomogenizey"};
                          if (funs[expr["key"]]) {
                            term$32 = useincludefunction(funs[expr["key"]])([self.castType(objterm, objt, type.point)], null, this);
                          }
                        }
                      }
                    }
                    if (term$32) {
                      return generateTerm ? {term:term$32, code:""} : {code:term$32 + ";\n"};
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.error("dont know how to this.compile " + JSON.stringify(expr));
};
CodeBuilder.prototype.usemyfunction = function(fname) {
  this.compileFunction(fname, this.myfunctions[fname]["arglist"].length);
  return usefunction(fname.replace("$", "_"));
};
CodeBuilder.prototype.compileFunction = function(fname, nargs) {
  var self = this;
  if (this.mark("compiledfunctions", fname)) {
    return;
  }
  var m = this.myfunctions[fname];
  var pname = fname.replace("$", "_");
  var bindings = m.body.bindings;
  var vars = new Array(nargs);
  for (var i = 0; i < nargs; i++) {
    vars[i] = m["arglist"][i]["name"];
  }
  var isvoid = this.variables[pname].T === type.voidt;
  var code = webgltype(this.variables[pname].T) + " " + pname + "(" + vars.map(function(varname) {
    return webgltype(self.variables[bindings[varname]].T) + " " + bindings[varname];
  }).join(", ") + "){\n";
  for (var i$33 in m.variables) {
    var iname = m.variables[i$33];
    code += webgltype(this.variables[iname].T) + " " + iname + ";\n";
  }
  var r = self.compile(m.body, !isvoid);
  var rtype = self.getType(m.body);
  code += r.code;
  if (!isvoid) {
    code += "return " + this.castType(r.term, rtype, this.variables[pname].T) + ";\n";
  }
  code += "}\n";
  this.add("compiledfunctions", fname, function() {
    return code;
  });
};
CodeBuilder.prototype.generateListOfUniforms = function() {
  var ans = [];
  for (var uname in this.uniforms) {
    if (this.uniforms[uname].type.type != "constant" && this.uniforms[uname].type != type.image) {
      ans.push("uniform " + webgltype(this.uniforms[uname].type) + " " + uname + ";");
    }
  }
  return ans.join("\n");
};
CodeBuilder.prototype.generateColorPlotProgram = function(expr) {
  helpercnt = 0;
  expr = cloneExpression(expr);
  this.precompile(expr);
  var r = this.compile(expr, true);
  var rtype = this.getType(expr);
  var colorterm = this.castType(r.term, rtype, type.color);
  if (!issubtypeof(rtype, type.color)) {
    console.error("expression does not generate a color");
  }
  var code = this.generateSection("structs");
  code += this.generateSection("uniforms");
  code += this.generateListOfUniforms();
  code += generateHeaderOfTextureReaders(this);
  code += this.generateSection("includedfunctions");
  code += this.generateSection("functions");
  for (var iname in this.variables) {
    if (this.variables[iname].T && this.variables[iname]["global"]) {
      code += webgltype(this.variables[iname].T) + " " + iname + ";\n";
    }
  }
  code += this.generateSection("compiledfunctions");
  code += "void main(void) {\n" + r.code + "gl_FragColor = " + colorterm + ";\n}\n";
  console.log(code);
  var generations = {};
  if (this.sections["compiledfunctions"]) {
    for (var fname in this.sections["compiledfunctions"].marked) {
      generations[fname] = this.api.getMyfunction(fname).generation;
    }
  }
  return {code:code, uniforms:this.uniforms, texturereaders:this.texturereaders, generations:generations};
};
function TextureReader(name, expr, modifs, api) {
  this.expr = expr;
  this.api = api;
  this.modifs = modifs;
  this.evaluateProperties();
  var properties = this.properties;
  this.name = name;
  this.code = "uniform sampler2D _sampler" + name + ";\nuniform float _ratio" + name + ";\nuniform vec2 _cropfact" + name + ";\nvec4 _imagergba" + name + "(vec2 A, vec2 B, vec2 p) {\n  p -= A; B -= A;\n  float b = dot(B,B);\n  p = vec2(dot(p,B),_ratio" + name + "*dot(p,vec2(-B.y,B.x)))/b;\n  " + (properties.repeat ? "p = mod(p, vec2(1.));" : "") + "\n  " + (properties.repeat && properties.mipmap ? "vec4 color = vec4(0.);\n    float totalWeight = 0.;\n    for(int dx=0; dx<2; dx++) for(int dy=0; dy<2; dy++) {\n      vec2 delta = .5*vec2(dx, dy);\n      vec2 center = delta+vec2(.5);\n      vec2 tc = fract(p-delta)+delta;\n      float dst = dot(abs(tc-center),vec2(1.));\n      float w = max(.5-dst,0.);\n      w=w*w;\n      color += w * texture2D(_sampler" + 
  name + ", tc*_cropfact" + name + ");\n      totalWeight += w;\n    }\n    return color/totalWeight;" : properties.repeat ? "return texture2D(_sampler" + name + ", p*_cropfact" + name + ");" : "if(0. <= p.x && p.x <= 1. && 0. <= p.y && p.y <= 1.)\n          return texture2D(_sampler" + name + ", p*_cropfact" + name + ");\n       else\n          return vec4(0.);") + "\n  }";
}
TextureReader.prototype.evaluateProperties = function() {
  var modifs = this.modifs;
  var api = this.api;
  var properties = {interpolate:modifs.hasOwnProperty("interpolate") ? api.evaluateAndVal(modifs["interpolate"])["value"] : true, mipmap:modifs.hasOwnProperty("mipmap") ? api.evaluateAndVal(modifs["mipmap"])["value"] : false, repeat:modifs.hasOwnProperty("repeat") ? api.evaluateAndVal(modifs["repeat"])["value"] : false};
  if (this.properties && (this.properties.mipmap != properties.mipmap || this.properties.repeat != properties.repeat)) {
    console.log("enfore recompilation because texture modifiers changed.");
    requiredcompiletime++;
  }
  this.properties = properties;
};
TextureReader.prototype.name;
TextureReader.prototype.code;
TextureReader.prototype.expr;
TextureReader.prototype.api;
TextureReader.prototype.returnCanvaswrapper = function() {
  var nameorimageobject = this.api.evaluateAndVal(this.expr)["value"];
  var imageobject = typeof nameorimageobject === "string" ? this.api.getImage(nameorimageobject, true) : nameorimageobject;
  if (imageobject == null) {
    console.error("Could not find image " + nameorimageobject + ".");
    return nada;
  }
  this.evaluateProperties();
  return generateCanvasWrapperIfRequired(imageobject, this.api, this.properties);
};
function getNameFromImage(image) {
  if (typeof image === "string") {
    return image;
  } else {
    if (!image.hasOwnProperty("name")) {
      image["name"] = generateUniqueHelperString();
    }
    return image["name"];
  }
}
function generateTextureReaderIfRequired(uname, modifs, codebuilder) {
  if (!codebuilder.texturereaders.hasOwnProperty(uname)) {
    codebuilder.texturereaders[uname] = new TextureReader(uname, codebuilder.uniforms[uname].expr, modifs, codebuilder.api);
  }
  return uname;
}
function useimagergba4(args, modifs, codebuilder) {
  return ["_imagergba", generateTextureReaderIfRequired(args[2], modifs, codebuilder), "(", args[0], ",", args[1], ",", args[3], ")"].join("");
}
function useimagergb4(args, modifs, codebuilder) {
  return ["(_imagergba", generateTextureReaderIfRequired(args[2], modifs, codebuilder), "(", args[0], ",", args[1], ",", args[3], ").rgb)"].join("");
}
function useimagergba2(args, modifs, codebuilder) {
  codebuilder.add("uniforms", "corners", function() {
    return "uniform vec2 _lowerleft, _lowerright;";
  });
  return ["_imagergba", generateTextureReaderIfRequired(args[0], modifs, codebuilder), "(_lowerleft, _lowerright, ", args[1], ")"].join("");
}
function useimagergb2(args, modifs, codebuilder) {
  codebuilder.add("uniforms", "corners", function() {
    return "uniform vec2 _lowerleft, _lowerright;";
  });
  return ["(_imagergba", generateTextureReaderIfRequired(args[0], modifs, codebuilder), "(_lowerleft, _lowerright, ", args[1], ").rgb)"].join("");
}
function generateHeaderOfTextureReaders(codebuilder) {
  var ans = "";
  for (var t in codebuilder.texturereaders) {
    ans += codebuilder.texturereaders[t].code + "\n";
  }
  return ans;
}
;var coerce = {};
coerce.toList = function(arg, def) {
  def = def === undefined ? null : def;
  if (arg["ctype"] !== "list") {
    console.log("argument is not a list");
    return def;
  }
  return arg["value"];
};
coerce.toHomog = function(arg, def, dim) {
  def = def === undefined ? [0, 0, 0, 0] : def;
  dim = dim === undefined ? 3 : dim;
  var lst1 = coerce.toList(arg);
  if (lst1 === null) {
    return def;
  }
  var lst = lst1.map(coerce.toReal);
  if (lst.length > dim + 1) {
    console.log("Coordinate vector too long.");
    lst = lst.slice(0, dim + 1);
  }
  while (lst.length < dim) {
    lst.push(0);
  }
  if (lst.length === dim) {
    lst.push(1);
  }
  return lst;
};
coerce.toDirection = function(arg, def) {
  def = def === undefined ? [0, 0, 0] : def;
  var lst1 = coerce.toList(arg);
  if (lst1 === null) {
    return def;
  }
  var lst = lst1.map(coerce.toReal);
  if (lst.length > 3) {
    console.log("Coordinate vector too long.");
    lst = lst.slice(0, 3);
  }
  while (lst.length < 3) {
    lst.push(0);
  }
  return lst;
};
coerce.toDirectionPoint = function(arg, def) {
  def = def === undefined ? [0, 0, 0, 0] : def;
  var lst = coerce.toDirection(arg, def);
  if (lst !== def) {
    lst[3] = 0;
  }
  return lst;
};
coerce.toColor = function(arg, def) {
  def = def === undefined ? [0.5, 0.5, 0.5] : def;
  if (arg.ctype === "number") {
    var c = coerce.toInterval(0, 1, arg);
    if (!isNaN(c)) {
      return [c, c, c];
    }
  }
  var lst = coerce.toList(arg);
  if (lst === null) {
    return def;
  }
  if (lst.length != 3) {
    console.log("Not an RGB color vector");
    return def;
  }
  return lst.map(function(c) {
    return coerce.toInterval(0, 1, c);
  });
};
coerce.toReal = function(arg, def) {
  def = def === undefined ? Number.NaN : def;
  if (arg["ctype"] !== "number") {
    console.log("argument is not a number");
    return def;
  }
  var val = arg["value"], r = val["real"], i = val["imag"];
  if (i !== 0) {
    console.log("complex number is not real");
  }
  return r;
};
coerce.toInt = function(arg, def) {
  def = def === undefined ? Number.NaN : def;
  if (arg["ctype"] !== "number") {
    console.log("argument is not a number");
    return def;
  }
  var val = arg["value"], r = val["real"], i = val["imag"];
  if (i !== 0) {
    console.log("complex number is not real");
  }
  i = Math.round(r);
  if (i !== r) {
    console.log("number is not an integer");
  }
  return i;
};
coerce.clamp = function(min, max, arg) {
  return arg < min ? min : arg > max ? max : arg;
};
coerce.toInterval = function(min, max, arg, def) {
  def = def === undefined ? Number.NaN : def;
  return coerce.clamp(min, max, coerce.toReal(arg, def));
};
coerce.toString = function(arg, def) {
  def = def === undefined ? null : def;
  if (arg["ctype"] === "string") {
    return arg["value"];
  }
  console.log("argument is not a string");
  return def;
};
coerce.toEnum = function(names, arg, def) {
  def = def === undefined ? null : def;
  var str = coerce.toString(arg, def);
  if (str !== def && names.indexOf(str) !== -1) {
    return str;
  }
  console.log("argument is not one of " + names.join(", "));
  return def;
};
coerce.toBool = function(arg, def) {
  if (arg["ctype"] === "boolean") {
    return arg["value"];
  }
  console.log("argument is not boolean");
  return def;
};
function GlError(message) {
  this.message = message;
}
GlError.prototype.toString = function() {
  return this.message;
};
function ShaderProgram(gl, vertexShaderCode, fragmentShaderCode) {
  this.handle = gl.createProgram();
  if (gl.webgl2) {
    vertexShaderCode = "#version 300 es\n" + vertexShaderCode.replace(/attribute/g, "in").replace(/varying/g, "out");
    fragmentShaderCode = "#version 300 es\n" + fragmentShaderCode.replace(/varying/g, "in").replace(/gl_FragColor/g, "FragColor").replace(/texture2D/g, "texture").replace(/precision highp float;/g, "precision highp float;\n#define webgl2 true\nout vec4 FragColor;");
  }
  this.vs = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
  this.fs = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);
  this.link(gl);
  this.detectUniforms(gl);
}
ShaderProgram.prototype.handle;
ShaderProgram.prototype.vs;
ShaderProgram.prototype.fs;
ShaderProgram.prototype.uniform;
ShaderProgram.prototype.attrib;
ShaderProgram.prototype.createShader = function(gl, kind, code) {
  var shader = gl.createShader(kind);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(code.split("\n"));
    throw new GlError("Error compiling shader:\n" + gl.getShaderInfoLog(shader));
  }
  gl.attachShader(this.handle, shader);
  return shader;
};
ShaderProgram.prototype.use = function(gl) {
  gl.useProgram(this.handle);
  return this;
};
ShaderProgram.prototype.link = function(gl) {
  var handle = this.handle;
  gl.linkProgram(handle);
  if (!gl.getProgramParameter(handle, gl.LINK_STATUS)) {
    throw new GlError("Error linking shader:\n" + gl.getProgramInfoLog(handle));
  }
  gl.validateProgram(handle);
  if (!gl.getProgramParameter(handle, gl.VALIDATE_STATUS)) {
    throw new GlError("Error validating shader:\n" + gl.getProgramInfoLog(handle));
  }
};
ShaderProgram.prototype.dispose = function(gl) {
  gl.detachShader(this.handle, this.vs);
  gl.deleteShader(this.vs);
  gl.detachShader(this.handle, this.fs);
  gl.deleteShader(this.fs);
  gl.deleteProgram(this.handle);
};
ShaderProgram.prototype.detectUniforms = function(gl) {
  this.uniform = this.detectImpl(gl, true);
};
ShaderProgram.prototype.detectAttributes = function(gl) {
  this.attrib = this.detectImpl(gl, false);
};
ShaderProgram.prototype.detectImpl = function(gl, uniform) {
  var i, n, handle = this.handle, info;
  var name, match, root = {}, node, base, idx, leaf;
  var size, j, arr, name2;
  if (uniform) {
    n = gl.getProgramParameter(handle, gl.ACTIVE_UNIFORMS);
  } else {
    n = gl.getProgramParameter(handle, gl.ACTIVE_ATTRIBUTES);
  }
  for (i = 0; i < n; ++i) {
    if (uniform) {
      info = gl.getActiveUniform(handle, i);
    } else {
      info = gl.getActiveAttrib(handle, i);
    }
    if (info === null) {
      continue;
    }
    name = info.name.replace(/\]/g, "");
    if (!name) {
      continue;
    }
    node = root;
    while ((match = /[.\[]/.exec(name)) !== null) {
      base = name.substr(0, match.index);
      if (node.hasOwnProperty(base)) {
        node = node[base];
      } else {
        if (match[0] === ".") {
          node = node[base] = {};
        } else {
          node = node[base] = [];
        }
      }
      name = name.substr(match.index + 1);
    }
    if (info.size > 1) {
      size = info.size;
      arr = Array(size);
      for (j = 0; j < size; ++j) {
        name2 = info.name + "[" + j + "]";
        if (uniform) {
          leaf = this.uniformSetter(gl, name2, info);
        } else {
          leaf = this.attribFactory(gl, name2, info);
        }
        arr[j] = leaf;
      }
      node[name] = arr;
    } else {
      if (uniform) {
        leaf = this.uniformSetter(gl, info.name, info);
      } else {
        leaf = this.attribFactory(gl, info.name, info);
      }
      node[name] = leaf;
    }
  }
  return root;
};
ShaderProgram.prototype.uniformSetter = function(gl, name, info) {
  var handle = this.handle, loc;
  loc = gl.getUniformLocation(handle, name);
  switch(info.type) {
    case gl.FLOAT:
      return gl.uniform1fv.bind(gl, loc);
    case gl.FLOAT_VEC2:
      return gl.uniform2fv.bind(gl, loc);
    case gl.FLOAT_VEC3:
      return gl.uniform3fv.bind(gl, loc);
    case gl.FLOAT_VEC4:
      return gl.uniform4fv.bind(gl, loc);
    case gl.BOOL:
    case gl.INT:
    case gl.SAMPLER_2D:
    case gl.SAMPLER_CUBE:
      return gl.uniform1iv.bind(gl, loc);
    case gl.BOOL_VEC2:
    case gl.INT_VEC2:
      return gl.uniform2iv.bind(gl, loc);
    case gl.BOOL_VEC3:
    case gl.INT_VEC3:
      return gl.uniform3iv.bind(gl, loc);
    case gl.BOOL_VEC4:
    case gl.INT_VEC4:
      return gl.uniform4iv.bind(gl, loc);
    case gl.FLOAT_MAT2:
      return gl.uniformMatrix2fv.bind(gl, loc, false);
    case gl.FLOAT_MAT3:
      return gl.uniformMatrix3fv.bind(gl, loc, false);
    case gl.FLOAT_MAT4:
      return gl.uniformMatrix4fv.bind(gl, loc, false);
    default:
      throw new GlError("Unknown data type for uniform " + name);
  }
};
ShaderProgram.prototype.attribFactory = function(gl, name, info) {
  var handle = this.handle, loc;
  loc = gl.getAttribLocation(handle, name);
  switch(info.type) {
    case gl.FLOAT:
      return new VertexAttribute(gl, loc, gl.vertexAttrib1fv.bind(gl, loc));
    case gl.FLOAT_VEC2:
      return new VertexAttribute(gl, loc, gl.vertexAttrib2fv.bind(gl, loc));
    case gl.FLOAT_VEC3:
      return new VertexAttribute(gl, loc, gl.vertexAttrib3fv.bind(gl, loc));
    case gl.FLOAT_VEC4:
      return new VertexAttribute(gl, loc, gl.vertexAttrib4fv.bind(gl, loc));
    default:
      throw new GlError("Unknown data type for vertex attribute " + name);
  }
};
function VertexAttribute(gl, location, setter) {
  this.gl = gl;
  this.location = location;
  this.set = setter;
}
;
}).call(this);//# sourceMappingURL=CindyGL.js.map


