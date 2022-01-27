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
