'use strict'

class Slider {
    constructor(id) {
        this.id = id
        this.slider = document.getElementById(this.id)
        this.cards = this.slider.querySelectorAll('.card')
        this.leftButton = this.slider.querySelector('.left-button')
        this.rightButton = this.slider.querySelector('.right-button')
    }

    setCardPosition() {
        for(let i = 0, dataId = ''; i < this.cards.length; i++) {
            dataId = this.cards[i].getAttribute('data-id')
            this.cards[i].style.cssText += `left: calc(1.6rem + (19.5rem + 1.6rem) * ${dataId - 1})`
        }
    }
    setHeight() {
        this.slider.querySelector('.cards').style.cssText = `height: ${this.cards[0].offsetHeight}px`
    }

    moveToRight() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            this.cards[i].setAttribute('data-id', `${dataId + 1}`)
            this.cards[i].style.cssText = 'transition: left .25s ease-out 0s;'
            this.rightButton.classList.remove('hidden')

            if (i === dataId) {
                this.leftButton.classList.add('hidden')
            }
        }
        this.setCardPosition()
    }
    moveToLeft() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            this.cards[i].setAttribute('data-id', `${dataId - 1}`)
            this.cards[i].style.cssText = 'transition: left .25s ease-out 0s;'
            this.leftButton.classList.remove('hidden')

            if (i === this.cards.length - 2 && dataId === this.getMaxViewsSlides()) {
                this.rightButton.classList.add('hidden')
            }
        }
        this.setCardPosition()
    }

    getMaxViewsSlides() {
        return Math.floor(this.slider.offsetWidth / this.cards[0].offsetWidth)
    }

    init() {
        this.setHeight()
        this.setCardPosition()
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
        if (this.cards.length - 1 < this.getMaxViewsSlides()) {
            this.rightButton.classList.add('hidden')
        }
        // window.addEventListener('resize', () => this.setHeight()) !!bad performance
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
        doIt = setTimeout(resizeSliders, 100)
    })
}

function resizeSliders() {
    const cards = document.querySelectorAll('.cards-slider > .cards')
    cards.forEach(c => {
        c.style.cssText = `height: ${c.children[0].offsetHeight}px`
    })
}

function initSliders() {
    const idArr = getAllSlidersIds()
    for (let i = 0; i < idArr.length; i++) {
        new Slider(idArr[i]).init()
    }
    resizeFix()
}

initSliders()


