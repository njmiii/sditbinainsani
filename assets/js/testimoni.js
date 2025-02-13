// Inisialisasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC7U8pjUutqHNmk2W_EIrUWTiShirRcJOs",
    authDomain: "testimoni-sdit-bina-insani.firebaseapp.com",
    projectId: "testimoni-sdit-bina-insani",
    storageBucket: "testimoni-sdit-bina-insani.appspot.com", // ✅ Perbaikan di sini
    messagingSenderId: "1054648625105",
    appId: "1:1054648625105:web:03d172b7feb59a464d22f0",
    measurementId: "G-FPPP9G73GX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let testimoniIndex = 0;

// Fungsi untuk menampilkan testimoni dari Firebase
function showTestimoni() {
    let testimoniList = document.getElementsByClassName("testimoni");
    if (testimoniList.length === 0) return;

    for (let i = 0; i < testimoniList.length; i++) {
        testimoniList[i].style.display = "none";
    }

    testimoniIndex++;
    if (testimoniIndex > testimoniList.length) { testimoniIndex = 1; }
    testimoniList[testimoniIndex - 1].style.display = "block";

    setTimeout(showTestimoni, 5000);
}

// Fungsi untuk menambahkan testimoni baru ke Firebase
function addTestimoni() {
    let name = document.getElementById("testimoni-name").value;
    let message = document.getElementById("testimoni-message").value;

    if (name.trim() === "" || message.trim() === "") {
        alert("Harap isi nama dan testimoni.");
        return;
    }

    db.collection("testimoni").add({
        name: name,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById("testimoni-name").value = "";
        document.getElementById("testimoni-message").value = "";
        loadTestimoni();
    }).catch(error => {
        console.error("Error menambahkan testimoni:", error);
        alert("Gagal mengirim testimoni. Cek console untuk detail.");
    });
}

// Fungsi untuk menampilkan testimoni dari Firebase ke halaman
function loadTestimoni() {
    db.collection("testimoni").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        let testimoniContainer = document.querySelector(".testimoni-container");
        document.querySelectorAll(".testimoni").forEach(el => el.remove());

        querySnapshot.forEach((doc) => {
            let testi = doc.data();
            let testimoniDiv = document.createElement("div");
            testimoniDiv.classList.add("testimoni");
            testimoniDiv.innerHTML = `<p class="testimoni-text">"${testi.message}"</p>
                                      <h3 class="testimoni-author">- ${testi.name}</h3>`;
            testimoniContainer.insertBefore(testimoniDiv, testimoniContainer.querySelector(".prev-testimoni"));
        });

        testimoniIndex = 0;
        showTestimoni();
    }).catch(error => {
        console.error("Error mengambil testimoni:", error);
        alert("Gagal mengambil testimoni. Cek console untuk detail.");
    });
}

// Fungsi untuk berpindah ke testimoni sebelumnya
function prevTestimoni() {
    let testimoniList = document.getElementsByClassName("testimoni");
    testimoniList[testimoniIndex - 1].style.display = "none";
    testimoniIndex--;
    if (testimoniIndex < 1) { testimoniIndex = testimoniList.length; }
    testimoniList[testimoniIndex - 1].style.display = "block";
}

// Fungsi untuk berpindah ke testimoni berikutnya
function nextTestimoni() {
    let testimoniList = document.getElementsByClassName("testimoni");
    testimoniList[testimoniIndex - 1].style.display = "none";
    testimoniIndex++;
    if (testimoniIndex > testimoniList.length) { testimoniIndex = 1; }
    testimoniList[testimoniIndex - 1].style.display = "block";
}

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTestimoni);
