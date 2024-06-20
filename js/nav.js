let navBtn = document.getElementById("nav-btn");
let nav = document.getElementById("nav");
let navContainer = document.getElementById("nav-container");
navBtn.addEventListener("click", function(){
    navContainer.classList.toggle("hidden");
    nav.classList.toggle("animation");




});
