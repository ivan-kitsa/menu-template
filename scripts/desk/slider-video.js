const VIDEOS_MOCK = [
    'https://videodelivery.net/2827bf8f3cccf453ec7ebffaf6aea805/manifest/video.m3u8',
    'https://videodelivery.net/426cdc52b27d4560cb6cfff789b8e5d7/manifest/video.m3u8',
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
    'https://videodelivery.net/426cdc52b27d4560cb6cfff789b8e5d7/manifest/video.m3u8',
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
    'https://videodelivery.net/426cdc52b27d4560cb6cfff789b8e5d7/manifest/video.m3u8',
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
    'https://videodelivery.net/426cdc52b27d4560cb6cfff789b8e5d7/manifest/video.m3u8',
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
]

class Video {
    constructor() {
        this.videoNodes = []
        this.muteButton = document.getElementById('mute-button')
    }

    get getNodes() {
        return this.videoNodes
    }

    attachParams() {
        const videos = Array.from(document.querySelectorAll('iframe'))

        this.videoNodes = videos.map((v, i) => {

            const player = Stream(v)
            player.autoplay = false
            player.controls = false
            player.preload = true
            player.muted = true

            if (i < videos.length - 1) {
                player.addEventListener('ended', () => {
                    Slider.moveToLeft()
                })
            }

            v.parentElement.onclick = () => {
                if (player.paused) {
                    player.play()
                    return
                }
                player.pause()
            }

            return player
        })
    }

    muteHandler(isMuted) {
        this.videoNodes.forEach(v => {
            // v.muted = isMuted
        })
    }

    init() {
        // this.attachSrc()
        this.attachParams()
        this.videoNodes[0].play()
        this.muteButton.addEventListener('click', () => {
            this.muteButton.classList.toggle('muted')
            this.muteHandler(this.muteButton.classList.contains('muted'))
        })
    }
}

const V = new Video()
V.init()

class SliderV {
    constructor(id) {
        this.id = id
        this.sl = document.getElementById(this.id)
        this.slides = this.sl.querySelectorAll('.slide')
        this.leftButton = this.sl.querySelector('.left-button')
        this.rightButton = this.sl.querySelector('.right-button')
    }

    moveToRight() {
        for (let i = 0, dataId = 0; i < this.slides.length; i++) {
            dataId = +this.slides[i].getAttribute('data-id')

            this.slides[i].setAttribute('data-id', `${dataId + 1}`)
            this.rightButton.classList.remove('hidden')

            if (dataId === 0) {
                V.getNodes[i + 1].pause()
                V.getNodes[i].play()
            }

            if (i === dataId) {
                this.leftButton.classList.add('hidden')
            }
        }
    }
    moveToLeft() {
        for (let i = 0, dataId = 0; i < this.slides.length; i++) {
            dataId = +this.slides[i].getAttribute('data-id')

            this.slides[i].setAttribute('data-id', `${dataId - 1}`)
            this.leftButton.classList.remove('hidden')

            if (dataId === 2) {
                V.getNodes[i - 1].pause()
                V.getNodes[i].play()
            }

            if (this.slides[this.slides.length - 1].getAttribute('data-id') === '1') {
                this.rightButton.classList.add('hidden')
            }
        }
    }

    init() {
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
    }
}

const Slider = new SliderV('video-slider')
Slider.init()


