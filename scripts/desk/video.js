const initVideosArr = []

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

        this.player.addEventListener('loadedmetadata', () => {
            this.duration = this.player.duration
            this.#attachTagsPosition()
        })

        this.player.addEventListener('playing', () => {
            if (!this.player.paused) {
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
                Slider.nextSlide()
                this.resetProgress()
            }

            console.log('----ENDED----')
        })

        this.vSlide.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag')) {
                const timestamp = e.target.getAttribute('data-timestamp')

                this.player.currentTime = +timestamp || this.player.currentTime
                this.#progressBar()
                return
            }

            if (e.target.classList.contains('iframe-wrapper')) {
                this.player.paused ? this.player.play() : this.player.pause()
            }
        })
    }

    #attachTagsPosition() {
        const tags = this.vSlide.querySelectorAll('.tag')

        tags.forEach((t) => {
            const timeStamp = +t.getAttribute('data-timestamp')
            const percent = 100 - (this.duration - timeStamp) / this.duration * 100

            t.style.left = `${percent}%`
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


