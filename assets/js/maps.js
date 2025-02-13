console.log("Script maps.js dimuat!");
window.toggleNav = function() {
    let nav = document.getElementById("navBar");
    if (nav) {
        nav.classList.toggle("show");
    } else {
        console.error("Elemen navbar tidak ditemukan!");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".menu-icon").addEventListener("click", function () {
        document.getElementById("navBar").classList.toggle("show");
    });
});
