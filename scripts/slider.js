'use strict'

class Slider {
    constructor(id) {
        this.id = id
        this.slider = document.getElementById(this.id)
        this.cards = this.slider.querySelectorAll('.card')
        this.timer = 0
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

            if (dataId === this.cards.length)  {
                this.cards[i].style.cssText = `transition: left 0s ease-out 0s; animation: firstCard .25s ease-out 0s`
                this.cards[i].setAttribute('data-id', '1')
                continue
            }
            this.cards[i].style.cssText = `transition: left .25s ease-out 0s;`
            this.cards[i].setAttribute('data-id', `${dataId + 1}`)
        }
        this.setCardPosition()
    }
    moveToLeft() {
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')

            if (dataId === 1)  {
                this.cards[i].style.cssText = `transition: left 0s ease-out .25s; animation: lastCard .25s ease-out 0s`
                this.cards[i].setAttribute('data-id', `${this.cards.length}`)
                continue
            }
            this.cards[i].style.cssText = `transition: left .25s ease-out 0s;`
            this.cards[i].setAttribute('data-id', `${dataId - 1}`)
        }
        this.setCardPosition()
    }

    #debounce (func, ms) {
        clearTimeout(this.timer)
        this.timer = setTimeout(func.bind(this), ms)
    }

    init() {
        const leftButton = this.slider.querySelector('.left-button')
        const rightButton = this.slider.querySelector('.right-button')

        rightButton.addEventListener('mousedown', () => this.#debounce(this.moveToLeft, 200))
        leftButton.addEventListener('mousedown', () => this.#debounce(this.moveToRight, 200))

        this.setHeight()
        this.setCardPosition()
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

    if (!idArr.length) return

    for (let i = 0; i < idArr.length; i++) {
        new Slider(idArr[i]).init()
    }
}

initSliders()



