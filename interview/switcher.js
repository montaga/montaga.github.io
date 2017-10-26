// every page that uses this switcher
// should have <script type="text/javascript" src="switcher.js"></script> in header

var order = [
  //probably add your 1 pixel file or black screen here (without html)
  "fake-dualstitch",
  "rectilinear",
  "spherical",
  "stereographic_blender",
  "jugglers",
  "droste_locally",
  "jugglersrecursive"
];
//probably add black pages in between for the time when you are using keynote
//DUPLICATES this list will lead to ERRORS!



function curidx() {
  var basename = window.location.href.replace(/^.*\/|\.[^.]*$/g, '');
  console.log(basename);
  for(i=0; i<order.length; i++) {
    if(basename==order[i]) return i; //find first occurence in order
  }
  return 0;//default: switch to beginning
}

setTimeout(function(){
  document.addEventListener("keydown", function(e) {
    console.log("keypressed");
    var event = window.event ? window.event : e;
    console.log(event.keyCode);
    n = order.length;
    if(event.keyCode==78 || event.keyCode==34) { //n next page
      window.location.href=order[(curidx()+1)%n]+".html";
    }
    if(event.keyCode==80 || event.keyCode==33) { //p previos page
      window.location.href=order[(curidx()-1+n)%n]+".html";
    }
  }
  );
 }, 100);
