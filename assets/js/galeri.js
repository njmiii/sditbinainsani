document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.querySelector(".close");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            index = images.length - 1;
        } else if (index >= images.length) {
            index = 0;
        }
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
    }

    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            showImage(index);
        });
    });

    close.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    prev.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    next.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});
