let slideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;




function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 7000); // Ganti ke 7 detik jika ingin lebih lama

}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (touchStartX - touchEndX > 50) {
        nextSlide();
    } else if (touchEndX - touchStartX > 50) {
        prevSlide();
    }
}

function nextSlide() {
    let slides = document.getElementsByClassName("slide");
    slides[slideIndex - 1].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
}

function prevSlide() {
    let slides = document.getElementsByClassName("slide");
    slides[slideIndex - 1].style.display = "none";
    slideIndex--;
    if (slideIndex < 1) { slideIndex = slides.length; }
    slides[slideIndex - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides();
    let slideshowContainer = document.querySelector(".slideshow-container");
    slideshowContainer.addEventListener("touchstart", handleTouchStart, false);
    slideshowContainer.addEventListener("touchmove", handleTouchMove, false);
    slideshowContainer.addEventListener("touchend", handleTouchEnd, false);

    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").style.transform = "translateY(-50%)";
    document.querySelector(".next").style.transform = "translateY(-50%)";

});
// Styling navigation buttons
const style = document.createElement('style');
style.innerHTML = `
    .prev, .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        border-radius: 50%;
    }
    .prev { left: 10px; }
    .next { right: 10px; }
`;
