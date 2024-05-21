// Menu responsive
let navUl = document.getElementById("nav-ul");
let navBtnOpen = document.getElementById("nav-btn-open");
let navBtnClose = document.getElementById("nav-btn-close");
let darkModeBtn  = document.getElementById("dark-mode-btn")
let open = navBtnOpen.addEventListener("click", function(){

    navUl.classList.remove("hidden");
    navBtnOpen.classList.add("hidden");
    navBtnClose.classList.remove("hidden");
    darkModeBtn.classList.remove("hidden");
});
let close = document.getElementById("nav-btn-close").addEventListener("click", function(){
    navUl.classList.add("hidden");
    navBtnOpen.classList.remove("hidden");
    navBtnClose.classList.add("hidden");
    
});