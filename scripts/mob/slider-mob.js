'use strict'

const initSlidersArr = []
const swipeDirection = {
    x: '',
    y: ''
}

class Slider {
    constructor(id) {
        this.id = id
        this.slider = document.getElementById(this.id)
        this.cards = this.slider.querySelectorAll('.card')
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
        this.sliderW = document.body.offsetWidth

        cardCopy.remove()

        this.slider.querySelector('.cards').style.cssText = `height: ${this.cardH}px`
    }
    moveToRight() {
        if (+this.cards[0].getAttribute('data-id') === 1) {
            return
        }
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')
            this.cards[i].setAttribute('data-id', `${dataId + 1}`)
        }
    }
    moveToLeft() {
        if (+this.cards[this.cards.length - 1].getAttribute('data-id') === this.getMaxViewsSlides()) {
            return;
        }
        for (let i = 0, dataId = 0; i < this.cards.length; i++) {
            dataId = +this.cards[i].getAttribute('data-id')
            this.cards[i].setAttribute('data-id', `${dataId - 1}`)
        }
    }

    swipeControls() {
        setTimeout(() => {
            switch (swipeDirection.x) {
                case 'left':
                    this.moveToLeft()
                    break
                case 'right':
                    this.moveToRight()
                    break
                default:
                    break
            }
        }, 0)
    }

    getMaxViewsSlides() {
        if (!this.sliderW || !this.cardW) {
            return 2
        }
        return Math.floor(this.sliderW / this.cardW)
    }
    init() {
        this.setSizes()
        this.slider.addEventListener('touchend', () => this.swipeControls())
    }
}

function touchController() {
    const from = {x: 0, y: 0}
    const to = {x: 0, y: 0}

    document.addEventListener('touchstart', (e) => {
        from.x = e.changedTouches[0].clientX
        from.y = e.changedTouches[0].clientY

    })
    document.addEventListener('touchend', (e) => {
        to.x = e.changedTouches[0].clientX
        to.y = e.changedTouches[0].clientY
        getSwipeDirection()
    })

    function getSwipeDirection() {
        const x = from.x - to.x
        const y = from.y - to.y

        if (x < -10) {
            swipeDirection.x = 'right'
        } else if  (x > 10) {
            swipeDirection.x = 'left'
        } else {
            swipeDirection.x = 'center'
        }
        if (y < -10) {
            swipeDirection.y = 'bottom'
        } else if (y > 10) {
            swipeDirection.y = 'top'
        } else {
            swipeDirection.y = 'center'
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
        doIt = setTimeout(() => {
            resizeSliders()
        }, 200)
    })
}

function resizeSliders() {
    const sliders = document.querySelectorAll('.cards-slider')
    sliders.forEach((s, i) => {
        initSlidersArr[i].setSizes()
    })
}

function initSliders() {
    touchController()
    const idArr = getAllSlidersIds()
    for (let i = 0; i < idArr.length; i++) {
        initSlidersArr.push(new Slider(idArr[i]))
        initSlidersArr[i].init()
    }
    resizeFix()
}
initSliders()

