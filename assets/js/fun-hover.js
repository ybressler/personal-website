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
    
    /**
     * Creates a modern SVG arrow pointing towards the headshot
     * @param {number} startX - Starting X position of the arrow
     * @param {number} startY - Starting Y position of the arrow
     * @param {number} endX - Ending X position (pointing towards headshot)
     * @param {number} endY - Ending Y position (pointing towards headshot)
     * @param {number} size - Size of the arrow
     * @returns {SVGElement} - The created SVG arrow element
     */
    function createArrowSVG(startX, startY, endX, endY, size) {
      // Create SVG element
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size * 2);
      svg.setAttribute('height', size * 2);
      svg.setAttribute('viewBox', `0 0 ${size * 2} ${size * 2}`);
      svg.style.position = 'absolute';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '10';
      
      // Calculate arrow direction
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      var unitX = deltaX / length;
      var unitY = deltaY / length;
      
      // Arrow line (shaft)
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', size);
      line.setAttribute('y1', size);
      line.setAttribute('x2', size + unitX * size * 0.8);
      line.setAttribute('y2', size + unitY * size * 0.8);
      line.setAttribute('stroke', '#fff');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-linecap', 'round');
      
      // Arrow head (triangle)
      var arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      var headSize = size * 0.3;
      var headX = size + unitX * size * 0.8;
      var headY = size + unitY * size * 0.8;
      
      // Calculate perpendicular for arrow head
      var perpX = -unitY * headSize;
      var perpY = unitX * headSize;
      
      var points = [
        [headX, headY],
        [headX - unitX * headSize + perpX, headY - unitY * headSize + perpY],
        [headX - unitX * headSize - perpX, headY - unitY * headSize - perpY]
      ].map(p => p.join(',')).join(' ');
      
      arrowHead.setAttribute('points', points);
      arrowHead.setAttribute('fill', '#fff');
      arrowHead.setAttribute('stroke', '#fff');
      arrowHead.setAttribute('stroke-width', '1');
      
      svg.appendChild(line);
      svg.appendChild(arrowHead);
      
      return svg;
    }
    
    function createClickMeAnimation() {
      // Remove existing elements if they exist
      removeClickMeAnimation();
      
      // Create the speech bubble
      clickMeBubble = document.createElement('div');
      clickMeBubble.className = 'click-me-bubble';
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
      var arrowSize = Math.max(20, Math.min(30, radius / 8));
      
      clickMeBubble.style.cssText = `
        top: ${bubbleY}px;
        left: ${bubbleX}px;
        font-size: ${fontSize}px;
      `;
      
      // Remove existing arrow if it exists
      if (clickMeArrow) {
        clickMeArrow.remove();
      }
      
      // Create and position the SVG arrow
      var arrowStartX = bubbleX + (bubbleOffset / 2);
      var arrowStartY = bubbleY + (bubbleOffset / 2);
      var arrowEndX = radius * 0.7; // Point towards the image edge
      var arrowEndY = -radius * 0.7;
      
      clickMeArrow = createArrowSVG(arrowStartX, arrowStartY, arrowEndX, arrowEndY, arrowSize);
      clickMeArrow.className = 'click-me-arrow';
      clickMeArrow.style.left = (arrowStartX - arrowSize) + 'px';
      clickMeArrow.style.top = (arrowStartY - arrowSize) + 'px';
      
      headshotContainer.appendChild(clickMeArrow);
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
      if (clickMeBubble) {
        positionClickMeElements();
      }
    });

});
