
// Fetching street art data from  mongoDB

async function fetchStreetArtData() {
    
    try {
        const response = await fetch('http://localhost:3100/streetart');
        const streetArtData = await response.json();

        const streetArtContainer = document.getElementById('streetArtContainer');

        streetArtData.forEach(streetArt => {
            const streetArtElement = document.createElement('article');
            streetArtElement.innerHTML = `
                <div class="article_content_wrapper">
                <div class="zoom-container">
                <img src="${streetArt.image}" alt="Street Art Image" class="zoom-image">
            </div>
                    <button class="save-button" onclick="saveArtwork('${streetArt.artist_name}', '${streetArt.image}')">Save</button>
                    <div class="artiest_name">
                        <h4 class="names">${streetArt.artist_name}</h4>
  
                    </div>
                </div>
            `;
            streetArtContainer.appendChild(streetArtElement);
        });
    } catch (error) {
        console.error('Error fetching street art data:', error);
    }
}

async function saveArtwork(artistName, imageUrl) {

    try {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user?.username) {
            console.error('User not logged in or missing username');
            return;
        }

        const response = await fetch('http://localhost:3100/savestreetart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, artistName, imageUrl }),
        });

        const result = await response.json();
        console.log(result.message);

        const userSavedArtworks = JSON.parse(localStorage.getItem(`savedArtworks_${user.username}`)) || [];
        userSavedArtworks.push({ artistName, imageUrl });

        localStorage.setItem(`savedArtworks_${user.username}`, JSON.stringify(userSavedArtworks));

        console.log(`Artwork saved for user ${user.username}: ${artistName}, ${imageUrl}`);
    } catch (error) {
        console.error('Error saving artwork:', error);
    }
}

fetchStreetArtData();


