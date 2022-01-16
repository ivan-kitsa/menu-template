'use strict'

const VIDEOS_MOCK = [
    'https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8',
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
    constructor(videosArr) {
        this.videos = videosArr
    }

    setSrc(videoNodes) {
        videoNodes.forEach((v, i) => {
            const hls = new Hls({

            })
            hls.loadSource(this.videos[i])
            hls.attachMedia(v)
        })
    }

}

class SliderV extends Video{
    constructor(id, videosArr) {
        super(videosArr)
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

            if (this.slides[this.slides.length - 1].getAttribute('data-id') === '1') {
                this.rightButton.classList.add('hidden')
            }
        }
    }
    init() {
        super.setSrc(this.sl.querySelectorAll('video'))
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
    }
}

new SliderV('video-slider', VIDEOS_MOCK).init()


