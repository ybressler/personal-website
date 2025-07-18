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


document.addEventListener("DOMContentLoaded", function() {
  console.log("Loaded DOM");

  // Get the headshot image by its ID
  const headshotImg = document.getElementById('headshot-img');

  // Exit if the headshot image isn't found
    if (headshotImg) {
      // Add the click listener to the headshot
      headshotImg.addEventListener('click', () => {

    // 1. Add the class to make it spin
    headshotImg.classList.add('spin-once');

    // 2. NEW: Listen for the animation to finish
    headshotImg.addEventListener('animationend', () => {
      // 3. NEW: Remove the class once it's done
      headshotImg.classList.remove('spin-once');
    }, { once: true }); // This listener also only runs once

    // 4. Fire the confetti (existing code)
    const rect = headshotImg.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2;
    const y = (rect.top + rect.bottom) / 2;

    confetti({
      particleCount: 150,
      spread: 70,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      }
    });

  }, { once: true });
}

});