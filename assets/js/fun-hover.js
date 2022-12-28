document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");

    // Do an animation on page load
    var $elem = $("section#sparkly-header .fun-hover.headshot");

    $elem.animate({ deg: 720 }, {
        duration: 1000,
        step: function (now) {
            var scale = (1 * now / 720);
            $(this).css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
        }
    });

});
