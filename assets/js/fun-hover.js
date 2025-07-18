document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");

    // Create elegant click-me animation for headshot
    var headshotContainer = document.querySelector("section#sparkly-header .headshot");
    var headshotImg = headshotContainer.querySelector("img");
    
    if (!headshotContainer || !headshotImg) return;
    
    var clickMeBubble = null;
    
    function createClickMeAnimation() {
      // Create the speech bubble
      clickMeBubble = document.createElement('div');
      clickMeBubble.textContent = 'click me!';
      
      // Add bubble to the container
      headshotContainer.appendChild(clickMeBubble);
      
      // Position elements elegantly based on actual headshot dimensions
      positionClickMeElements();
    }
    
    function positionClickMeElements() {
      if (!clickMeBubble) return;
      
      // Get the computed dimensions of the headshot
      var imgRect = headshotImg.getBoundingClientRect();
      var containerRect = headshotContainer.getBoundingClientRect();
      
      // Calculate the radius of the circular headshot
      var radius = Math.min(imgRect.width, imgRect.height) / 2;
      
      // Position the bubble outside the top-right of the circle
      var bubbleOffset = 20; // Distance from image border
      var bubbleX = radius + bubbleOffset;
      var bubbleY = -(radius + bubbleOffset);
      
      // Apply responsive sizing
      var fontSize = Math.max(12, Math.min(16, radius / 10));
      
      clickMeBubble.style.cssText = `
        top: ${bubbleY}px;
        left: ${bubbleX}px;
        font-size: ${fontSize}px;
      `;
    }
    

    // Reposition elements on window resize
    window.addEventListener('resize', function() {
      if (clickMeBubble) {
        positionClickMeElements();
      }
    });

});
