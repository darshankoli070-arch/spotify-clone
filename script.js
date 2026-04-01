<<<<<<< HEAD
console.log("let's write JavaScript")
let songs;
let currentSong = new Audio();
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/songs.json`);
    let data = await a.json();
    songs = data.songs;

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>Darshan</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play music.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    return songs;
}

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>Darshan</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play music.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + encodeURIComponent(track);
    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`/songs.json`);
    let folderData = await a.json();
    let cardContainer = document.querySelector(".cardContainer");

    for (let folder of folderData.folders) {
        try {
            let infoRes = await fetch(`/songs/${folder}/info.json`);
            let info = await infoRes.json();

            cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                <div class="play">
                    <img class="plays" src="play.svg" alt="">
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h2>${info.title}</h2>
                    <p>${info.description}</p>
                </div>
            </div>`;
        } catch (err) {
            console.log(`Skipping "${folder}" — no info.json`);
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
        });
    });
}

async function main() {
    let playbar = document.querySelector(".playbar");
    document.querySelector(".right").appendChild(playbar);

    await getsongs("songs/cs");
    playMusic(songs[0], true);

    let playBtn = document.getElementById("play");
    let prevBtn = document.getElementById("previous");
    let nextBtn = document.getElementById("next");

    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.src = "pause.svg";
        } else {
            currentSong.pause();
            playBtn.src = "play music.svg";
        }
    });

    prevBtn.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let idx = songs.indexOf(currentTrack);
        if (idx > 0) playMusic(songs[idx - 1]);
    });

    nextBtn.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let idx = songs.indexOf(currentTrack);
        if (idx < songs.length - 1) playMusic(songs[idx + 1]);
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    displayAlbums();
}

main();
=======
console.log("let's write JavaScript")
let songs;
let currentSong = new Audio();
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.innerHTML.trim());
        }
    }

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>Darshan</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play music.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + encodeURIComponent(track);
    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");

    for (let index = 0; index < anchors.length; index++) {
        const e = anchors[index];
        if (e.href.endsWith("/") && !e.innerHTML.includes("..")) {
            let folder = e.innerHTML.trim().replace("/", "");
            console.log(folder);

            try {
                let infoRes = await fetch(`/songs/${folder}/info.json`);
                let info = await infoRes.json();

                cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                    <div class="play">
                        <img class="plays" src="play.svg" alt="">
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${info.title}</h2>
                        <p>${info.description}</p>
                    </div>
                </div>`;
            } catch (err) {
                console.log(`Skipping "${folder}" — no info.json`);
            }
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
        });
    });
}

async function main() {
    let playbar = document.querySelector(".playbar");
    document.querySelector(".right").appendChild(playbar);

    await getsongs("songs/cs");
    playMusic(songs[0], true);

    let playBtn = document.getElementById("play");
    let prevBtn = document.getElementById("previous");
    let nextBtn = document.getElementById("next");

    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.src = "pause.svg";
        } else {
            currentSong.pause();
            playBtn.src = "play music.svg";
        }
    });

    prevBtn.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let idx = songs.indexOf(currentTrack);
        if (idx > 0) playMusic(songs[idx - 1]);
    });

    nextBtn.addEventListener("click", () => {
        let currentTrack = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let idx = songs.indexOf(currentTrack);
        if (idx < songs.length - 1) playMusic(songs[idx + 1]);
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    displayAlbums();
}

main();
>>>>>>> ff892d598ab800c916fac808205caea1e77fe5e2
