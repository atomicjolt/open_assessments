'use strict';

function openModal(){
   document.getElementById('zoom01').showModal();
}

var smPhotoZoom = function(thumbImg, thumbTxt){
  var splitImgPath = thumbImg.split('_201x141');
  var begPath = splitImgPath[0];
  var endPath = splitImgPath[1];
  var newImgPath = begPath + "_608x229" + endPath;
  $('#zoom01').find('.modal-photo').attr('src', newImgPath);
  $('#zoom01').find('.zoom-label').text(thumbTxt);
  openModal();
};

var mdPhotoZoom = function(thumbImg, thumbTxt){
  var splitImgPath = thumbImg.split('_304x215');
  var begPath = splitImgPath[0];
  var endPath = splitImgPath[1];
  var newImgPath = begPath + "_608x229" + endPath;
  $('#zoom01').find('.modal-photo').attr('src', newImgPath);
  $('#zoom01').find('.zoom-label').text(thumbTxt);
  openModal();
};

$(document).ready(function() {

  $('.zoom-but-sm').click(function(){
    var thumbImg = $(this).closest('img').attr('src');
    var thumbTxt = $(this).closest('img').attr('alt');
    smPhotoZoom(thumbImg, thumbTxt);
  });

  $('.zoom-but-md').click(function(){
    var thumbImg = $(this).closest('img').attr('src');
    var thumbTxt = $(this).closest('img').attr('alt');
    mdPhotoZoom(thumbImg, thumbTxt);
  });

});



