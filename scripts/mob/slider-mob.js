'use strict'

// const initSlidersArr = []


// class Slider {
//     constructor(id) {
//         this.id = id
//         this.slider = document.getElementById(this.id)
//         this.cards = this.slider.querySelectorAll('.card')
//         // this.cardH = 0
//         this.cardW = 0
//         this.sliderW = 0
//     }
//
//     setSizes() {
//         const cardCopy = this.slider.querySelector('.card').cloneNode(true)
//         cardCopy.style.cssText = 'position: fixed; left: 0; top: 0; visibility: hidden; z-index: -9999;'
//         document.body.appendChild(cardCopy)
//
//         // this.cardH = cardCopy.offsetHeight
//         this.cardW = cardCopy.offsetWidth
//         this.sliderW = document.body.offsetWidth
//
//         cardCopy.remove()
//
//         // this.slider.querySelector('.cards').style.cssText = `height: ${this.cardH}px`
//     }
//
//     moveToRight() {
//         if (+this.cards[0].getAttribute('data-id') === 1) {
//             this.slider.classList.add('left-end')
//             setTimeout(() => {
//                 this.slider.classList.remove('left-end')
//             }, 150)
//             return
//         }
//         for (let i = 0, dataId = 0; i < this.cards.length; i++) {
//             dataId = +this.cards[i].getAttribute('data-id')
//             this.cards[i].setAttribute('data-id', `${dataId + 1}`)
//         }
//     }
//     moveToLeft() {
//         if (+this.cards[this.cards.length - 1].getAttribute('data-id') <= this.getMaxViewsSlides()) {
//             this.slider.classList.add('right-end')
//             setTimeout(() => {
//                 this.slider.classList.remove('right-end')
//             }, 150)
//             return
//         }
//         for (let i = 0, dataId = 0; i < this.cards.length; i++) {
//             dataId = +this.cards[i].getAttribute('data-id')
//             this.cards[i].setAttribute('data-id', `${dataId - 1}`)
//         }
//     }
//
//     swipeControls() {
//         bodyScrollBlock(true)
//         setTimeout(() => {
//             switch (swipeDirection.x) {
//                 case 'left':
//                     bodyScrollBlock(false)
//                     this.moveToLeft()
//                     break
//                 case 'right':
//                     bodyScrollBlock(false)
//                     this.moveToRight()
//                     break
//                 default:
//                     bodyScrollBlock(false)
//                     break
//             }
//         }, 0)
//     }
//
//     getMaxViewsSlides() {
//         if (!this.sliderW || !this.cardW) {
//             return 2
//         }
//         return Math.floor(this.sliderW / this.cardW)
//     }
//     init() {
//         this.setSizes()
//         this.slider.addEventListener('touchend', (e) => {
//             this.swipeControls()
//         })
//     }
// }

// function getAllSlidersIds() {
//     const idArr = []
//     const sliders = document.querySelectorAll('.cards-slider')
//     sliders.forEach(i => i.id ? idArr.push(i.id): null)
//     return idArr
// }
//
// function resizeFix() {
//     let doIt = 0
//
//     window.addEventListener('resize', () => {
//         clearTimeout(doIt)
//         doIt = setTimeout(() => {
//             resizeSliders()
//         }, 200)
//     })
// }
//
// function resizeSliders() {
//     const sliders = document.querySelectorAll('.cards-slider')
//     sliders.forEach((s, i) => {
//         initSlidersArr[i].setSizes()
//     })
// }

// function initSliders() {
//     touchController()
//     const idArr = getAllSlidersIds()
//     for (let i = 0; i < idArr.length; i++) {
//         initSlidersArr.push(new Slider(idArr[i]))
//         initSlidersArr[i].init()
//     }
//     resizeFix()
// }
// initSliders()



