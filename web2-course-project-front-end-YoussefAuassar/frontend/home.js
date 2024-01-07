"use-strict";

mapboxgl.accessToken = "pk.eyJ1IjoieW91c3NlZmRlc2lnbiIsImEiOiJjbG5uZm14eXkwNjAzMnFzNmNobmtzZmtoIn0.uTmOiQI3F14uPMra907LyQ";

const map = new mapboxgl.Map({
    container: "map",
    center: [4.349414, 50.845080],
    zoom: 13,
    style: 'mapbox://styles/youssefdesign/clr0mxz4u019901pj56rd0ja4',
    zoom: 14,
    pitch: 65,
    bearing: 200,
});

async function fetchStreetArtData() {
    try {
        const response = await fetch('http://localhost:3100/streetart');
        const streetArtData = await response.json();

        console.log('Received data from API:', streetArtData);

        if (Array.isArray(streetArtData)) {
            streetArtData.forEach(streetArt => {

                const isValidCoordinates = !isNaN(parseFloat(streetArt.latitude)) && !isNaN(parseFloat(streetArt.longitude));

                if (isValidCoordinates) {
                    const marker = new mapboxgl.Marker({
                        color: 'black'
                    })
                        .setLngLat([parseFloat(streetArt.longitude), parseFloat(streetArt.latitude)])
                        .setPopup(new mapboxgl.Popup().setHTML(
                            `<div class="popup-content">
                                <img src="${streetArt.image}" alt="Street Art Image" class="popup-image">
                                <p><strong>Artist:</strong> ${streetArt.artist_name}</p>
                                <p><strong>Location:</strong> ${streetArt.location}</p>
                            </div>`
                        ))
                        .addTo(map);
                } else {
                    console.error('Invalid coordinates in API response:', streetArt);
                }
            });
        } else {
            console.error('Invalid API response. Expected an array.');
        }
    } catch (error) {
        console.error('Error fetching street art data:', error);
    }
}

fetchStreetArtData();

