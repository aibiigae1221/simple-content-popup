/*
  팝업을 만듭니다. 기존에 popupName 값으로 만들어진 팝업이 있으면 팝업을 생성하진 않지만,
  메서드에 전달된 트리거 태그가 팝업을 열도록 만들고 해당 버튼으로 팝업을 열기 직전에 beforeOpenCallback() 메서드가 실행됩니다.

  사용 예시
  makePopup({
    jQOpenTrigger:".view-detail",
    popupContentSelector:"#view-detial-popup",
    popupName: "view-detail-popup",
    beforeOpenCallback: () => {
      const data = someAjaxCall();
      $("#view-detail-popup").find("label1").text(data.value1);
    }
  });
  css는 /org/css/style.css에 있습니다.
*/
const makePopup = (
    {jQOpenTrigger, popupContentSelector, popupName, beforeOpenCallback, afterCloseCallback, zIdx = 10, 
    makeCloseBtnDefault = false, closeBtnRight="0px", closeBtnTop="0px", useWidth90p = false, useWidthHeight90 = false,
     closeOnClickingDimmed = false, useFullSize = false, absolutePosition, useFullHeight}) => {
  


  let popup = $(`.simple-content-popup3[data-popup-name="${popupName}"]`);
  const exist = popup.length > 0;
  let contentHolder = null;

  const dimmedSelector = ".simple-content-popup3-dimmed";

  if(useFullSize) contentHolder = ".simple-content-popup3-content-holder-full";
  else if(absolutePosition) contentHolder = ".simple-content-popup3-content-holder-absolute";
  else contentHolder = ".simple-content-popup3-content-holder";

  if(!exist){
    // 팝업 처음 생성 시 
    popup = $(`<div class="simple-content-popup3" data-popup-name="${popupName}"></div>`);  
    $(popup).append(`<div class='${dimmedSelector.replace(".", "")}'></div>`); 
    $(popup).find(dimmedSelector).append(`<div class="${contentHolder.replace(".", "")}"></div>`);
    
    

    if(makeCloseBtnDefault){
      const closeBtnHTML = "<button class='close-popup-btn' type='button'>" +
        "<img src='/org/img/common/popup-close-btn.png' alt='/org/img/common/popup-close-btn.png' />"
      "</button>"; 
      $(popup).find(contentHolder).append(closeBtnHTML);
      $(popup).find(".close-popup-btn").css({
        top:closeBtnTop,
        right:closeBtnRight
      });
    }
   
    const popupContent = $(popupContentSelector).detach();   
    $(popupContent).css("display", "block");
    $(popup).find(contentHolder).append(popupContent);

    $("body").append(popup);
    popup = $(`.simple-content-popup3[data-popup-name="${popupName}"]`);

    $(popup).find(dimmedSelector).css({
      "z-index":zIdx
    });

    $(popup).find(contentHolder).on("click", function(e){
        e.stopPropagation();
    });

    if(closeOnClickingDimmed){
      $(popup).find(dimmedSelector).on("click", function(){
        
        popup.hide();

        if(typeof afterCloseCallback != "undefined"){
          afterCloseCallback();
        }  
      });
    }

    if(makeCloseBtnDefault){
      $(popup).find(".close-popup-btn").on("click", function(){
        $(popup).hide();

        if(typeof afterCloseCallback != "undefined"){
            afterCloseCallback();
          }  
      });      
    }

  }// 팝업 처음 생성 시 끝
 

  if(!useFullSize){

    if(absolutePosition){
      
      let cssObj = {};
      
      if(typeof absolutePosition.top != "undefined"){
        
        cssObj.top = absolutePosition.top;
      }

      if(typeof absolutePosition.left != "undefined"){
        cssObj.left = absolutePosition.left;
      }

      if(typeof absolutePosition.right != "undefined"){
        cssObj.right = absolutePosition.right;
      }

      if(typeof absolutePosition.bottom != "undefined"){
        cssObj.bottom = absolutePosition.bottom;
      }

      $(popup).find(contentHolder).css(cssObj);

    }else{
      popup.find(contentHolder).css({
        "top":"50%",
        "left":"50%",
        "transform":"translate(-50%, -50%)"
      });
    }
    
  }
  
  $(jQOpenTrigger).on("click", function(e){


    if(useWidth90p){
      const windowWidth = $(window).width();
      const width90p = Math.round(windowWidth * 0.9);
      $(popup).find(popupContentSelector).css({
        width:`${width90p}px`
      });  
    }
  
    if(useWidthHeight90){
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();
      const width90p = Math.round(windowWidth * 0.9);
      const height90p = Math.round(windowHeight * 0.9);
      $(popup).find(popupContentSelector).css({
        width:`${width90p}px`,
        height:`${height90p}px`
      }); 
    }
    
    if(useFullHeight){
      const fullHeight = $(window).height();
  
      $(popup).find(popupContentSelector).css({
        height:`${fullHeight}px`
      });
    }

    if(typeof beforeOpenCallback != "undefined"){
      beforeOpenCallback(jQOpenTrigger);  
    }  
    
    $(popup).show();
    $(popup).find(contentHolder).scrollTop(0);
    
    return false;
  });

  $(window).on("resize", function(){
    if(useWidth90p){
        const windowWidth = $(window).width();
        const width90p = Math.round(windowWidth * 0.9);
        $(popup).find(popupContentSelector).css({
          width:`${width90p}px`
        });  
    }

    if(useWidthHeight90){
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const width90p = Math.round(windowWidth * 0.9);
        const height90p = Math.round(windowHeight * 0.9);
        $(popup).find(popupContentSelector).css({
            width:`${width90p}px`,
            height:`${height90p}px`
        }); 
    }
      
    if(useFullHeight){
        const fullHeight = $(window).height();

        $(popup).find(popupContentSelector).css({
            height:`${fullHeight}px`
        });
    }
  });
  
  return {
    openPopup: () => {

      if(useWidth90p){
        const windowWidth = $(window).width();
        const width90p = Math.round(windowWidth * 0.9);
        $(popup).find(popupContentSelector).css({
          width:`${width90p}px`
        });  
      }
    
      if(useWidthHeight90){
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const width90p = Math.round(windowWidth * 0.9);
        const height90p = Math.round(windowHeight * 0.9);
        $(popup).find(popupContentSelector).css({
          width:`${width90p}px`,
          height:`${height90p}px`
        }); 
      }
      
      if(useFullHeight){
        const fullHeight = $(window).height();
    
        $(popup).find(popupContentSelector).css({
          height:`${fullHeight}px`
        });
      }

      if(typeof beforeOpenCallback != "undefined"){
        beforeOpenCallback(jQOpenTrigger);
      }  
      
      $(popup).show();
      $(popup).find(contentHolder).scrollTop(0);
    },

    closePopup: () => {
      popup.hide();

      if(typeof afterCloseCallback != "undefined"){
        afterCloseCallback();
      }  
    }
  };
};