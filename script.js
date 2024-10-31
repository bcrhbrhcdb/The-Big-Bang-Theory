document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const trailElements = ['⭐', '🌎', '🌕', '🪐', '☄️', '🌠', '🌌', '🛸', '👽', '🚀', '🌞', '🌛', '🌜', '🌙', '💫', '✨', '🌟', '🔭', '🛰️'];
    const colorPalette = ['#081448', '#282157', '#1a2c80', '#4a478a', '#da8a8b'];
    const trail = [];
    const maxTrailLength = 200; 
    let isVisible = true;

    // Load visibility state from local storage
    const storedVisibility = localStorage.getItem('trailVisibility');
    
    // If there's no stored value, default to true (checked)
    if (storedVisibility === null) {
        isVisible = true; // Default to visible
        localStorage.setItem('trailVisibility', isVisible); // Save default state
    } else {
        isVisible = storedVisibility === 'true';
    }

    document.getElementById('toggle-trail').checked = isVisible; // Set checkbox state
    document.getElementById('toggle-trail').addEventListener('change', updateTrailVisibility);
    
    function createPlanet(x, y) {
        const element = document.createElement('div');
        const randomElement = trailElements[Math.floor(Math.random() * trailElements.length)];
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        element.className = 'trail-emoji';
        element.innerText = randomElement;
        element.style.position = 'fixed';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.fontSize = '12px'; 
        element.style.color = randomColor;
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
        element.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        element.style.pointerEvents = 'none';
        
        body.appendChild(element);
        
        requestAnimationFrame(() => {
            element.style.fontSize = '12px'; 
            element.style.opacity = '1';
            element.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
        });

        setTimeout(() => {
            element.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(360deg)';
            setTimeout(() => {
                element.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
            }, 150);
        }, 250);

        setTimeout(() => removePlanet(element), 750); 

        return element;
    }

    function removePlanet(element) {
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, -50%) scale(0) rotate(720deg)';
        setTimeout(() => {
            if (element.parentNode === body) {
                body.removeChild(element);
            }
        }, 500); 
    }

    function updateTrail(e) {
        if (isVisible) { // Only create planets if visible
            createPlanet(e.clientX - 15, e.clientY);
            createPlanet(e.clientX + 15, e.clientY);
            while (trail.length > maxTrailLength) {
                removePlanet(trail.shift());
            }
        }
    }

    function fadeAllPlanets() {
        trail.forEach(element => {
            removePlanet(element);
        });
        trail.length = 0;
    }

    function updateTrailVisibility() {
        isVisible = document.getElementById('toggle-trail').checked; // Update visibility based on switch state
        localStorage.setItem('trailVisibility', isVisible);
        
        if (!isVisible) {
            fadeAllPlanets(); // Fade all planets if not visible
        }
    }

    function createWaterWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'water-wave';
        wave.style.position = 'fixed';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.width = '0';
        wave.style.height = '0';
        wave.style.borderRadius = '50%';
        wave.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.animation = 'ripple 1s linear';
        wave.style.pointerEvents = 'none';
        body.appendChild(wave);

        setTimeout(() => {
            wave.remove();
        }, 1000); // Remove the wave after 1 second (matching the animation duration)
    }

    document.addEventListener('mousemove', updateTrail);
    
    document.addEventListener('click', (e) => {
        createWaterWave(e.clientX, e.clientY);
    });

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (!isVisible) {
            fadeAllPlanets();
        }
    });

    function highlightElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                element.classList.add('highlight');
                setTimeout(() => {
                    element.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        highlightElement(targetId);
    }

    document.querySelectorAll('.scroll-highlight-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').split('#')[0] === window.location.pathname) {
                e.preventDefault();
                const targetId = link.getAttribute('href').split('#')[1];
                highlightElement(targetId);
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
});