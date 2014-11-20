chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "face") {
      console.log('msg',request.url);
      var canvas = document.createElement("canvas");
      var img = new Image();
      img.addEventListener("load", function() {
        console.log('detect',request.url);
        var jf=new jsfeat_face(img);
        var comp=jf.findFace();
        var w=img.width,h=img.height;
        canvas.width=w;canvas.height=h;
        var cc=canvas.getContext('2d');
        cc.drawImage(img,0,0);
        if(comp){
          var candidate=comp[0];
          for (var i = 1; i < comp.length; i++) {
            if (comp[i].confidence > candidate.confidence) {
              candidate = comp[i];
            }
          }
          var r=candidate;
          cc.rect(r.x,r.y,r.width,r.height);
        }
        else{
          cc.fillText("404!",5,20);
        }
        cc.strokeStyle="red";
        cc.stroke();
        sendResponse({data: canvas.toDataURL()}); 
        //sendResponse({data: comp}); 
      });
      img.src = request.url;
      return true; // Required for async sendResponse()
    }
  }
)