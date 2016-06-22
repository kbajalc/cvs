
var
 page = $('#editorTemplate'),
 cache_width = page.width(),
 a4  =[ 595.28,  841.89];  // for a4 size paper width and height

$('.create_pdf').on('click',function(){
 console.log('dasda');
 $('#editorTemplate').scrollTop(0);
 createPDF();
});
//create pdf
function createPDF(){
 getCanvas().then(function(canvas){
  var
  img = canvas.toDataURL("image/jpeg",1.0),
  doc = new jsPDF({
          unit:'px',
          format:'a4'
        });
        doc.addImage(img, 'JPEG', 0, 0);
        doc.save('test.pdf');
        page.width(cache_width);
 });
}

// create canvas object
function getCanvas(){

 page.width((a4[0]*1.33333) -80).css('max-width','none');
 return html2canvas(page,{
     imageTimeout:2000,
     removeContainer:true
    });
}
