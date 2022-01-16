'use strict'

const initSlidersArr = []

class Slider {
    constructor(id) {
        this.id = id
        this.slider = document.getElementById(this.id)
        this.cards = this.slider.querySelectorAll('.card')
        this.leftButton = this.slider.querySelector('.left-button')
        this.rightButton = this.slider.querySelector('.right-button')
        this.cardH = 0
        this.cardW = 0
        this.sliderW = 0
    }

    setSizes() {
        const cardCopy = this.slider.querySelector('.card').cloneNode(true)
        cardCopy.style.cssText = 'position: fixed; left: 0; top: 0; visibility: hidden; z-index: -9999;'
        document.body.appendChild(cardCopy)

        this.cardH = cardCopy.offsetHeight
        this.cardW = cardCopy.offsetWidth
        this.sliderW = document.querySelector('.center-column').offsetWidth

        cardCopy.remove()

        this.slider.querySelector('.cards').style.cssText = `height: ${this.cardH}px`
    }
    moveToRight() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            this.cards[i].setAttribute('data-id', `${dataId + 1}`)
            this.rightButton.classList.remove('hidden')

            if (i === dataId) {
                this.leftButton.classList.add('hidden')
            }
        }
    }
    moveToLeft() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            this.cards[i].setAttribute('data-id', `${dataId - 1}`)
            this.leftButton.classList.remove('hidden')

            if (i === this.cards.length - 2 && dataId === this.getMaxViewsSlides()) {
                this.rightButton.classList.add('hidden')
            }
        }
    }
    getMaxViewsSlides() {
        if (!this.sliderW || !this.cardW) {
            return 3
        }
        return Math.floor(this.sliderW / this.cardW)
    }
    init() {
        this.setSizes()
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
        if (this.cards.length - 1 < this.getMaxViewsSlides()) {
            this.rightButton.classList.add('hidden')
        }
    }
}

function getAllSlidersIds() {
    const idArr = []
    const sliders = document.querySelectorAll('.cards-slider')
    sliders.forEach(i => i.id ? idArr.push(i.id): null)
    return idArr
}

function resizeFix() {
    let doIt = 0

    window.addEventListener('resize', () => {
        clearTimeout(doIt)
        doIt = setTimeout(resizeSliders, 200)
    })
}

function resizeSliders() {
    const sliders = document.querySelectorAll('.cards-slider')
    sliders.forEach((s, i) => {
        initSlidersArr[i].setSizes()
    })
}

function initSliders() {
    const idArr = getAllSlidersIds()
    for (let i = 0; i < idArr.length; i++) {
        initSlidersArr.push(new Slider(idArr[i]))
        initSlidersArr[i].init()
    }
    resizeFix()
}

initSliders()


