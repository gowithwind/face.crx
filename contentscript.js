console.log('!start');

function main(){
  var imgs=document.getElementsByTagName('img');
  for(var i=0;i<imgs.length;i++){
    (function(_i){
      var img=imgs[_i];
      if(img.getAttribute('added')){
        return;
      }
      img.setAttribute('added',1);
      img.onmouseover=function(e){
        if(!e.altKey)return;
        console.log('img.src=',img.src);
        if(img.getAttribute('detected'))return;//avoid repeat detect
        detect_face(img.src,function(data){
          //console.log(data);
          if(data.length>200){//avoid error
            img.src=data;
          }
          img.setAttribute('detected',1);
        });
      }
    })(i);
  };
}


//@success is the callback
function detect_face(url, success) {  
  chrome.runtime.sendMessage(
    {message: "face", url: url}, 
    function(response) {success(response.data)}
  );    
}

window.onload=function(){
  console.log('!loaded');
  //main();
}

function loop_main(){
  console.log('!loop');
  main();
  setTimeout(loop_main,1000);
}
loop_main();