// Mapbox Initialization with 3D Effects
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11', // Modern dark theme
    center: [77.2090, 28.6139], // Delhi coordinates
    zoom: 5,
    pitch: 60, // 3D tilt
    bearing: -30,
    antialias: true
});

// Add 3D Buildings Layer
map.on('load', () => {
    map.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        type: 'fill-extrusion',
        paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
        }
    });
});

// GSAP Animation for Smooth Map Loading
gsap.fromTo("#map", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" });

// Add 3D Markers for Cities with Hover Effects
const cities = [
    { name: 'Delhi', coordinates: [77.2090, 28.6139] },
    { name: 'Mumbai', coordinates: [72.8777, 19.0760] },
    { name: 'Bengaluru', coordinates: [77.5946, 12.9716] },
    { name: 'Kolkata', coordinates: [88.3639, 22.5726] },
];

cities.forEach(city => {
    const marker = new mapboxgl.Marker({ color: '#FF006E' })
        .setLngLat(city.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${city.name}</strong>`))
        .addTo(map);
    
    // Hover effect
    marker.getElement().addEventListener('mouseenter', () => {
        gsap.to(marker.getElement(), { scale: 1.3, duration: 0.3, ease: "bounce.out" });
    });
    
    marker.getElement().addEventListener('mouseleave', () => {
        gsap.to(marker.getElement(), { scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// Lottie Animation Initialization with Scroll Trigger
document.querySelectorAll('lottie-player').forEach(player => {
    player.addEventListener('loaded', () => {
        player.play();
    });

    gsap.from(player, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: player,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Background Parallax Effect
document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = (event.clientY / window.innerHeight) * 2 - 1;
    gsap.to("#map", { x: x * 10, y: y * 10, duration: 0.3 });
});
