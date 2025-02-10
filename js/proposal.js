document.addEventListener("DOMContentLoaded", () => {
    const photos = document.querySelectorAll(".photo");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const musicButton = document.querySelector(".music-btn");
    const bgMusic = document.getElementById("bg-music");

    if (!photos.length || !prevButton || !nextButton || !musicButton || !bgMusic) {
        console.error("Faltan algunos elementos en el DOM.");
        return; // Detener la ejecución si faltan elementos
    }

    let currentIndex = 0;
    let isPlaying = false;

    function updateGallery() {
        photos.forEach((photo, index) => {
            photo.classList.remove("active", "prev", "next");
            photo.style.display = "none";
        });

        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        const nextIndex = (currentIndex + 1) % photos.length;

        photos[prevIndex].classList.add("prev");
        photos[currentIndex].classList.add("active");
        photos[nextIndex].classList.add("next");

        photos[prevIndex].style.display = "block";
        photos[currentIndex].style.display = "block";
        photos[nextIndex].style.display = "block";
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateGallery();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateGallery();
    });

    musicButton.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicButton.textContent = "🎶";
        } else {
            bgMusic.play();
            musicButton.textContent = "🔊";
        }
        isPlaying = !isPlaying;
    });

    document.body.addEventListener("click", () => {
        if (!isPlaying) {
            bgMusic.play();
            isPlaying = true;
            musicButton.textContent = "🔊";
        }
    }, { once: true });

    function applyFinalStyles() {
        document.body.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
        document.body.style.opacity = "0";
        document.body.style.transform = "scale(0.9)";
    }

    document.querySelectorAll(".yes-btn").forEach(button => {
        button.addEventListener("click", () => {
            applyFinalStyles();

            setTimeout(() => {
                const finalMessageContainer = document.createElement("div");
                finalMessageContainer.classList.add("final-message");
                finalMessageContainer.innerHTML = `
                    <h1>Gracias mi amor, te amo mucho 💖</h1>
                    <img src="img/photo11.jpg" alt="Nosotros" class="final-image">
                    `
                ;
                document.body.innerHTML = "";
                document.body.appendChild(finalMessageContainer);
                document.body.appendChild(bgMusic);
                document.body.style.display = "flex";
                document.body.style.justifyContent = "center";
                document.body.style.alignItems = "center";
                document.body.style.height = "100vh";
                document.body.style.background = "linear-gradient(to right, #ff758c, #ff7eb3)";
                document.body.style.color = "white";
                document.body.style.textAlign = "center";
                document.body.style.fontFamily = "'Poppins', sans-serif";
                document.body.style.opacity = "0";
                document.body.style.transform = "scale(0.9)";

                setTimeout(() => {
                    document.body.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
                    document.body.style.opacity = "1";
                    document.body.style.transform = "scale(1)";
                }, 100);
            }, 1000);
        });
    });

    updateGallery();

    // Cargar partículas
    tsParticles.load("tsparticles", {
        particles: {
            number: {
                value: 30,
            },
            size: {
                value: 3,
            },
            move: {
                enable: true,
                speed: 1,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "char",
                options: {
                    char: {
                        value: ["❤️"],
                    },
                },
            },
        },
    });
});