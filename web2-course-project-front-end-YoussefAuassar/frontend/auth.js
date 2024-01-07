
let user = JSON.parse(sessionStorage.getItem('user'));

if (user) {
    
    let accountLink = document.getElementById('accountLink');
    accountLink.href = '#'; 
    accountLink.innerHTML = user.username.toUpperCase();
  
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    accountLink.style.color = randomColor;
    
}



