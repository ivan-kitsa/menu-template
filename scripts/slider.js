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
            this.cards[i].style.cssText += `left: calc((19.5rem + 1.6rem) * ${dataId - 1})`
        }
    }
    setHeight() {
        this.slider.querySelector('.cards').style.cssText = `height: ${this.cards[0].offsetHeight}px`
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
        this.setCardPosition()
    }
    moveToLeft() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            this.cards[i].setAttribute('data-id', `${dataId - 1}`)

            this.leftButton.classList.remove('hidden')

            if (i === this.cards.length - 2 && dataId === 3) {
                this.rightButton.classList.add('hidden')
            }
        }
        this.setCardPosition()
    }

    init() {
        this.setHeight()
        this.setCardPosition()
        this.rightButton.addEventListener('mousedown', () => this.moveToLeft())
        this.leftButton.addEventListener('mousedown', () => this.moveToRight())
        if (this.cards.length < 4) {
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

function initSliders() {
    const idArr = getAllSlidersIds()
    for (let i = 0; i < idArr.length; i++) {
        new Slider(idArr[i]).init()
    }
}



initSliders()


