document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");

    // Add click me animation to headshot
    var $elem = $("section#sparkly-header .fun-hover.headshot");
    
    // Add "click me" animation on load
    setTimeout(function() {
      $elem.addClass('click-me-animation');
    }, 500);

    // Add click handler to remove animation when headshot is clicked
    $elem.on('click', function() {
      $elem.removeClass('click-me-animation');
    });

});
