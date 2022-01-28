class SliderV {
    constructor(id) {
        this.id = id
        this.sl = document.getElementById(this.id)
        this.slides = this.sl.querySelectorAll('.slide')
        this.muteButton = document.getElementById('mute-button')
    }

    prevSlide() {
        if (+this.slides[0].getAttribute('data-id') === 1) {
            return
        }
        for (let i = 0, dataId = 0; i < this.slides.length; i++) {
            dataId = +this.slides[i].getAttribute('data-id')

            this.slides[i].setAttribute('data-id', `${dataId + 1}`)

            if (dataId === 0) {
                initVideosArr[i + 1].pause()
                initVideosArr[i].play()
            }
        }
    }
    nextSlide() {
        if (+this.slides[this.slides.length - 1].getAttribute('data-id') === 1 ) {
            return
        }
        for (let i = 0, dataId = 0; i < this.slides.length; i++) {
            dataId = +this.slides[i].getAttribute('data-id')

            this.slides[i].setAttribute('data-id', `${dataId - 1}`)

            if (dataId === 2) {
                initVideosArr[i - 1].pause()
                initVideosArr[i].play()
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
        this.sl.addEventListener('touchend', (e) => {
            if (e.changedTouches[0].target.classList.contains('iframe-wrapper') && swipeDirection.y === 'top') {
                this.nextSlide()
            }
        })
    }
}

const Slider = (function initSlider() {
    const slider = new SliderV('video-slider')
    slider.init()
    return slider
}())
