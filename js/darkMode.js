let btn = document.getElementById("dark-mode-btn");

btn.addEventListener("click", function() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    
});