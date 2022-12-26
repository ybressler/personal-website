document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");
    }
);



$("section#sparkly-header .fun-hover").on({

  mouseenter: function(){
    $(this).addClass("on");
  },
  mouseleave: function(){
    setTimeout(() => $(this).removeClass('on') , 500)
  }

});

$("section#sparkly-header .fun-hover.headshot").on({

  mouseenter: function(){
    $(this).addClass("on");
  },
  mouseleave: function(){
    setTimeout(() => $(this).removeClass('on') , 500)
  }

});
