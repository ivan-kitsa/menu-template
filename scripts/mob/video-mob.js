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
        this.progressBar ? this.progressBar.style.height = '0%' : null
    }

    #progressBar() {
        this.currentTime = this.player.currentTime
        this.progress = 100 - (this.duration - this.currentTime) / this.duration * 100
        this.progressBar ? this.progressBar.style.height = `${this.progress}%` : null
    }

    #tagsPopovers(timestamp) {
        const tagsPopovers = this.vSlide.querySelectorAll('.tag-popover')

        tagsPopovers.forEach((t) => {
            if (t.getAttribute('data-timestamp') === timestamp) {
                t.style.cssText = ''
                t.classList.remove('hidden')
                return
            }

            t.classList.add('hidden')
            t.style.cssText = 'position: absolute;'

        })
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
                Slider.nextSlide()
                this.resetProgress()
            }

            console.log('----ENDED----')
        })

        this.vSlide.addEventListener('touchend', (e) => {
            if (e.target.classList.contains('tag')) {
                const timestamp = e.target.getAttribute('data-timestamp')

                console.log(timestamp)

                this.player.currentTime = timestamp || this.player.currentTime
                this.#tagsPopovers(timestamp)
                this.#progressBar()
                this.pause()
            } else {
                this.#tagsPopovers('')
            }

            if (e.target.classList.contains('iframe-wrapper')) {
                this.player.paused ? this.play() : this.pause()
            }
        })

        this.vSlide.querySelectorAll('*[data-popup-handler]')?.forEach((h) => {
            h.addEventListener('touchstart', (e) => {
                this.pause()
            })
        })

        document.querySelectorAll('*[data-popup-closer]')?.forEach((c) => {
            c.addEventListener('touchstart', (e) => {
                if (e.currentTarget.getAttribute('data-popup-handler')) {
                    return
                }
                this.play()
            })
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

