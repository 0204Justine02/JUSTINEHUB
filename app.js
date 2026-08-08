javascript
// ========================================
// JUSTINE HUB
// Main JavaScript
// ========================================

const PASSWORD = "0204";


// ========================================
// PASSWORD SYSTEM
// ========================================

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");

function unlock() {

    if (passwordInput.value === PASSWORD) {

        lockScreen.style.display = "none";
        app.style.display = "block";

        error.textContent = "";
        passwordInput.value = "";

    } else {

        error.textContent = "❌ Incorrect password";

        passwordInput.value = "";
        passwordInput.focus();

    }
}

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        unlock();
    }

});


// ========================================
// LOCK HUB
// ========================================

function lockHub() {

    app.style.display = "none";

    lockScreen.style.display = "flex";

    passwordInput.value = "";

    passwordInput.focus();

}


// ========================================
// MUSIC PLAYER
// ========================================

const audio = document.getElementById("audio");

const musicInput =
    document.getElementById("musicInput");

const playlist =
    document.getElementById("playlist");

const songTitle =
    document.getElementById("songTitle");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const playBtn =
    document.getElementById("playBtn");

let songs = [];

let currentSong = 0;


// ADD MUSIC

musicInput.addEventListener("change", function() {

    const files = Array.from(this.files);

    if (!files.length) return;

    songs.push(...files);

    displayPlaylist();

    if (songs.length === files.length) {

        playSong(0);

    }

});


// PLAY SONG

function playSong(index) {

    if (!songs[index]) return;

    currentSong = index;

    const file = songs[index];

    audio.src = URL.createObjectURL(file);

    songTitle.textContent = file.name;

    audio.play();

    playBtn.textContent = "⏸";

}


// PLAY / PAUSE

function togglePlay() {

    if (!audio.src) {

        if (songs.length > 0) {
            playSong(0);
        }

        return;
    }

    if (audio.paused) {

        audio.play();

        playBtn.textContent = "⏸";

    } else {

        audio.pause();

        playBtn.textContent = "▶";

    }

}


// NEXT SONG

function nextSong() {

    if (!songs.length) return;

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    playSong(currentSong);

}


// PREVIOUS SONG

function previousSong() {

    if (!songs.length) return;

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    playSong(currentSong);

}


// AUTO NEXT

audio.addEventListener("ended", function() {

    nextSong();

});


// UPDATE PLAY BUTTON

audio.addEventListener("play", function() {

    playBtn.textContent = "⏸";

});

audio.addEventListener("pause", function() {

    playBtn.textContent = "▶";

});


// PROGRESS

audio.addEventListener("timeupdate", function() {

    if (!audio.duration) return;

    progress.value =
        (audio.currentTime /
        audio.duration) * 100;

});


progress.addEventListener("input", function() {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});


// VOLUME

volume.addEventListener("input", function() {

    audio.volume =
        volume.value / 100;

});


// PLAYLIST

function displayPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function(song, index) {

        const row =
            document.createElement("div");

        row.className = "song";

        const name =
            document.createElement("div");

        name.className = "songName";

        name.textContent =
            "🎵 " + song.name;

        const button =
            document.createElement("button");

        button.textContent = "▶";

        button.onclick = function() {

            playSong(index);

        };

        row.appendChild(name);

        row.appendChild(button);

        playlist.appendChild(row);

    });

}


// ========================================
// LINKS
// ========================================

let links = JSON.parse(
    localStorage.getItem("justineLinks") || "[]"
);


function addLink() {

    const name =
        document.getElementById("linkName")
        .value.trim();

    const url =
        document.getElementById("linkURL")
        .value.trim();

    if (!name || !url) {

        alert("Enter a name and link.");

        return;

    }

    let finalURL = url;

    if (
        !finalURL.startsWith("http://") &&
        !finalURL.startsWith("https://")
    ) {

        finalURL =
            "https://" + finalURL;

    }

    links.push({
        name: name,
        url: finalURL
    });

    localStorage.setItem(
        "justineLinks",
        JSON.stringify(links)
    );

    document.getElementById("linkName").value = "";

    document.getElementById("linkURL").value = "";

    displayLinks();

}


function displayLinks() {

    const list =
        document.getElementById("linkList");

    list.innerHTML = "";

    links.forEach(function(link, index) {

        const box =
            document.createElement("div");

        const a =
            document.createElement("a");

        a.href = link.url;

        a.target = "_blank";

        a.rel = "noopener";

        a.textContent =
            "🔗 " + link.name;

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "🗑 Delete";

        deleteButton.style.marginTop = "5px";

        deleteButton.onclick = function() {

            links.splice(index, 1);

            localStorage.setItem(
                "justineLinks",
                JSON.stringify(links)
            );

            displayLinks();

        };

        box.appendChild(a);

        box.appendChild(deleteButton);

        list.appendChild(box);

    });

}

displayLinks();


// ========================================
// NOTES
// ========================================

const notes =
    document.getElementById("notes");

const savedNotes =
    localStorage.getItem("justineNotes");

if (savedNotes) {

    notes.value = savedNotes;

}


function saveNotes() {

    localStorage.setItem(
        "justineNotes",
        notes.value
    );

    alert("✅ Notes saved!");

}


// ========================================
// BACKGROUND
// ========================================

const backgroundInput =
    document.getElementById("backgroundInput");

const savedBackground =
    localStorage.getItem("justineBackground");

if (savedBackground) {

    document.body.style.backgroundImage =
        "url(" + savedBackground + ")";

}


backgroundInput.addEventListener(
    "change",
    function() {

        const file = this.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function(event) {

            const image =
                event.target.result;

            document.body.style.backgroundImage =
                "url(" + image + ")";

            localStorage.setItem(
                "justineBackground",
                image
            );

        };

        reader.readAsDataURL(file);

    }
);


function clearBackground() {

    localStorage.removeItem(
        "justineBackground"
    );

    document.body.style.backgroundImage = "";

}


// ========================================
// START
// ========================================

audio.volume = 1;

console.log(
    "✅ Justine Hub loaded successfully!"
);
