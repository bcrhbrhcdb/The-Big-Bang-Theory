alert("Hey there! I am currently learning web development, and consequently, you asked everyone to make a project on The Big Bang Theory. I just completed a course on Javascript, and I needed to build a project, so thanks for this opportunity! You did say have fun with it. Anyways, after you grade my project, and you don''t have to do this, if you could send me an email on what I did good on making the website, if there were any bugs I could fix, or just general things. It has been good having you as my first 9th grade teacher. Anyways, explore! ");
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const trailElements = ['⭐', '🌎', '🌕', '🪐', '☄️', '🌠', '🌌', '🛸', '👽', '🚀', '🌞', '🌛', '🌜', '🌙', '💫', '✨', '🌟', '🔭', '🛰️'];
    const colorPalette = ['#081448', '#282157', '#1a2c80', '#4a478a', '#da8a8b'];
    const trail = [];
    const maxTrailLength = 200; // Increased for a longer trail
    let isVisible = true;

    function createPlanet(x, y) {
        const element = document.createElement('div');
        const randomElement = trailElements[Math.floor(Math.random() * trailElements.length)];
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        element.className = 'trail-emoji';
        element.innerText = randomElement;
        element.style.position = 'fixed';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.fontSize = '12px'; // Smaller size
        element.style.color = randomColor;
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
        element.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        element.style.pointerEvents = 'none';
        
        body.appendChild(element);
        
        requestAnimationFrame(() => {
            element.style.fontSize = '12px'; // Set to final smaller size
            element.style.opacity = '1';
            element.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
        });

        setTimeout(() => {
            element.style.transform = 'translate(-50%, -50%) scale(1.2) rotate(360deg)';
            setTimeout(() => {
                element.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
            }, 150);
        }, 250);

        setTimeout(() => removePlanet(element), 750); // Planets fade after 3 seconds

        return element;
    }

    function removePlanet(element) {
        element.style.opacity = '0';
        element.style.transform = 'translate(-50%, -50%) scale(0) rotate(720deg)';
        setTimeout(() => {
            if (element.parentNode === body) {
                body.removeChild(element);
            }
        }, 500); // Fade out duration
    }

    function updateTrail(e) {
        // Create two planets with a spacing of 10 pixels apart
        createPlanet(e.clientX - 15, e.clientY); // First planet (shifted left by 5 pixels)
        createPlanet(e.clientX + 15, e.clientY); // Second planet (shifted right by 5 pixels)

        // Limit the number of planets in the trail
        while (trail.length > maxTrailLength) {
            removePlanet(trail.shift());
        }
    }

    function fadeAllPlanets() {
        trail.forEach(element => {
            removePlanet(element);
        });
        trail.length = 0;
    }

    function createWaterWave(x, y) {
        for (let i = 0; i < 3; i++) { // Adjusted to keep it at three waves
            const wave = document.createElement('div');
            wave.className = 'water-wave';
            wave.style.left = `${x}px`;
            wave.style.top = `${y}px`;
            wave.style.border = `2px solid ${colorPalette[Math.floor(Math.random() * colorPalette.length)]}`;
            wave.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
            body.appendChild(wave);

            requestAnimationFrame(() => {
                wave.style.width = `${40 + i * 10}px`; // Slightly larger waves
                wave.style.height = `${40 + i * 10}px`;
                wave.style.opacity = '0.8';
                wave.style.transform = `translate(-50%, -50%) scale(1) rotate(${i * 90}deg)`; // Added rotation
            });

            setTimeout(() => {
                wave.style.opacity = '0';
                wave.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${360 + i * 90}deg)`; // More rotation on fade out
            }, 300 + i * 100);

            setTimeout(() => {
                body.removeChild(wave);
            }, 1000 + i * 100);
        }
    }

    document.addEventListener('mousemove', (e) => {
        if (isVisible) {
            updateTrail(e);
        }
    });

    document.addEventListener('click', (e) => {
        createWaterWave(e.clientX, e.clientY);
    });

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (!isVisible) {
            fadeAllPlanets();
        }
    });
});