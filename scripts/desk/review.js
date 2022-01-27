const initVideosArr = []

class SliderV {
    constructor(id) {
        this.id = id
        this.sl = document.getElementById(this.id)
        this.slides = this.sl.querySelectorAll('.slide')
        this.leftButton = this.sl.querySelector('.left-button')
        this.rightButton = this.sl.querySelector('.right-button')
        this.muteButton = document.getElementById('mute-button')
    }

    moveToRight() {
        for (let i = 0, dataId = 0; i < this.slides.length; i++) {
            dataId = +this.slides[i].getAttribute('data-id')

            this.slides[i].setAttribute('data-id', `${dataId + 1}`)
            this.rightButton.classList.remove('hidden')

            if (dataId === 0) {
                initVideosArr[i + 1].pause()
                initVideosArr[i].play()
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
                initVideosArr[i - 1].pause()
                initVideosArr[i].play()
            }

            if (this.slides[this.slides.length - 1].getAttribute('data-id') === '1') {
                this.rightButton.classList.add('hidden')
            }
        }
    }

    muteHandler() {
        this.muteButton.classList.toggle('muted')
        initVideosArr.forEach((v) => {
            v.isMuted(this.muteButton.classList.contains('muted'))
        })
    }

    init() {
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
        this.muteButton.addEventListener('click', () => this.muteHandler())
    }
}

const Slider = (function initSlider() {
    const slider = new SliderV('video-slider')
    slider.init()
    return slider
}())

class Video {
    constructor(vSlide, index) {
        this.vSlide = vSlide
        this.iframe = vSlide.querySelector('iframe')
        this.progressBar = vSlide.querySelector('.progress')
        this.index = index
        this.player = null

        this.duration = 0
        this.currentTime = 0
        this.progress = 0
    }

    get getPlayer() {
        return this.player
    }

    get getProgress() {
        return this.progress
    }

    play() {
        this.player.play()
    }
    pause() {
        this.player.pause()
    }

    isMuted(boolean) {
        this.player.muted = boolean
    }

    resetProgress() {
        this.player.currentTime = 0
        this.currentTime = 0
        this.progress = 0
        this.progressBar ? this.progressBar.style.width = '0%' : null
    }

    #progressBar() {
        this.currentTime = this.player.currentTime
        this.progress = 100 - (this.duration - this.currentTime) / this.duration * 100
        this.progressBar ? this.progressBar.style.width = `${this.progress}%` : null
    }

    #attachParams() {
        this.player = Stream(this.iframe)
        this.player.autoplay = false
        this.player.controls = false
        this.player.preload = true
        this.player.muted = true
    }

    #attachListeners() {
        let interval = 0

        this.player.addEventListener('playing', () => {
            if (!this.player.paused) {
                this.duration = this.player.duration

                clearInterval(interval)

                interval = setInterval(() => {
                    if (this.duration) {
                        this.#progressBar()
                    }
                }, 10)
            }
        })

        this.player.addEventListener('play', () => {
            console.log('----PLAY----')
        })

        this.player.addEventListener('pause', () => {
            clearInterval(interval)

            console.log('----PAUSE----')
        })

        this.player.addEventListener('ended', () => {
            if (this.index < initVideosArr.length - 1) {
                Slider.moveToLeft()
                this.resetProgress()
            }

            console.log('----ENDED----')
        })

        this.vSlide.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                const percent = parseInt(e.target.style.left)

                this.player.currentTime = this.duration / 100 * percent
                this.#progressBar()

                return
            }

            if (e.target.classList.contains('iframe-wrapper')) {
                this.player.paused ? this.player.play() : this.player.pause()
            }
        })
    }

    init() {
        this.#attachParams()
        this.#attachListeners()
    }
}

(function initVideos() {
    const vSlides = document.querySelectorAll('.v-slide')

    vSlides.forEach((vs, i) => {
        initVideosArr.push(new Video(vs, i))
        initVideosArr[i].init()
    })

    initVideosArr[0].play()
}())


