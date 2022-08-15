const musicContainer = document.querySelector(".music-container")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("#audio")
const progressContainer = document.querySelector(".progress-container")
const progress = document.querySelector(".progress")
const title = document.querySelector("#title")
const cover = document.querySelector("#cover")

// Song titles


const songs = ["Hey", "Summer", "Ukulele"]


let songIndex = 0
function loadSong(song) {
    title.textContent = song
    audio.src = `music/${song.toLowerCase()}.mp3`
    cover.src = `images/${song.toLowerCase()}.jpg`
}



loadSong(songs[songIndex])


playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play")
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})



function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    audio.pause()
}

prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
audio.addEventListener("timeupdate", updateProgress)
progressContainer.addEventListener("click", setProgress)



function prevSong() {
    if (songIndex <= 0) {
        songIndex = songs.length - 1
    } else {
        songIndex --
    }
    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    } else {
        songIndex ++
    }

    loadSong(songs[songIndex])

    playSong()

}



function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

audio.addEventListener("ended", nextSong)b