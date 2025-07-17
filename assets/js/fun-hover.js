document.addEventListener(
    "DOMContentLoaded",
    function() {
      console.log("Loaded DOM");

    // Create elegant click-me animation for headshot
    var headshotContainer = document.querySelector("section#sparkly-header .headshot");
    var headshotImg = headshotContainer.querySelector("img");
    
    if (!headshotContainer || !headshotImg) return;
    
    var clickMeBubble = null;
    var clickMeArrow = null;
    
    function createClickMeAnimation() {
      // Remove existing elements if they exist
      removeClickMeAnimation();
      
      // Create the speech bubble
      clickMeBubble = document.createElement('div');
      clickMeBubble.className = 'click-me-bubble';
      clickMeBubble.textContent = 'click me!';
      
      // Create the arrow
      clickMeArrow = document.createElement('div');
      clickMeArrow.className = 'click-me-arrow';
      clickMeArrow.textContent = '↙';
      
      // Add elements to the container
      headshotContainer.appendChild(clickMeBubble);
      headshotContainer.appendChild(clickMeArrow);
      
      // Position elements elegantly based on actual headshot dimensions
      positionClickMeElements();
    }
    
    function positionClickMeElements() {
      if (!clickMeBubble || !clickMeArrow) return;
      
      // Get the computed dimensions of the headshot
      var imgRect = headshotImg.getBoundingClientRect();
      var containerRect = headshotContainer.getBoundingClientRect();
      
      // Calculate the radius of the circular headshot
      var radius = Math.min(imgRect.width, imgRect.height) / 2;
      
      // Position the bubble outside the top-right of the circle
      var bubbleOffset = 20; // Distance from image border
      var bubbleX = radius + bubbleOffset;
      var bubbleY = -(radius + bubbleOffset);
      
      // Position the arrow between the bubble and the image
      var arrowX = radius + (bubbleOffset / 2);
      var arrowY = -(radius + (bubbleOffset / 2));
      
      // Apply responsive sizing
      var fontSize = Math.max(12, Math.min(16, radius / 10));
      var arrowSize = Math.max(18, Math.min(24, radius / 8));
      
      clickMeBubble.style.cssText = `
        top: ${bubbleY}px;
        left: ${bubbleX}px;
        font-size: ${fontSize}px;
      `;
      
      clickMeArrow.style.cssText = `
        top: ${arrowY}px;
        left: ${arrowX}px;
        font-size: ${arrowSize}px;
      `;
    }
    
    function removeClickMeAnimation() {
      if (clickMeBubble) {
        clickMeBubble.remove();
        clickMeBubble = null;
      }
      if (clickMeArrow) {
        clickMeArrow.remove();
        clickMeArrow = null;
      }
    }
    
    // Show the animation after a short delay
    setTimeout(function() {
      createClickMeAnimation();
    }, 500);
    
    // Remove animation when headshot is clicked
    headshotContainer.addEventListener('click', function() {
      removeClickMeAnimation();
    });
    
    // Reposition elements on window resize
    window.addEventListener('resize', function() {
      if (clickMeBubble && clickMeArrow) {
        positionClickMeElements();
      }
    });

});
