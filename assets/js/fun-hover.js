document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");

    // Add subtle loading animation to encourage clicking
    var $elem = $("section#sparkly-header .fun-hover.headshot");
    
    // Initial subtle bounce animation on load
    setTimeout(function() {
      $elem.addClass('bounce-in');
      
      // Add a gentle pulse after the bounce
      setTimeout(function() {
        $elem.removeClass('bounce-in');
        $elem.addClass('pulse-gentle');
      }, 2000);
    }, 500);

});
