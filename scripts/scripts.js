'use strict'

import { resizeSliders } from './slider.js';

function customSelect() {
    const selectNode = document.getElementById('select')
    const currentSelect = document.getElementById('current-select')
    const selectList = document.getElementById('select-list')?.children

    if (!selectNode || !currentSelect || !selectList) {
        return
    }

    selectNode.onclick = function (){
        this.classList.add('open')
    }

    for (let i = 0; i < selectList.length; i++) {
        selectList[i].onclick = (e) => currentSelect.innerText = e.target.id
    }

    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('select')) {
            selectNode.classList.remove('open')
        }
    })
}

function headerScrollSizer() {
    const header = document.querySelector('.header-wrapper')

    if (!header) {
        return
    }

    window.addEventListener('scroll', function()  {
        if (this.scrollY > 40 ) {
            header.classList.add('header-min')
            return
        }
        header.classList.remove('header-min')
    })
}

function categoriesSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault()

            const href = this.getAttribute('href').substring(1)
            const scrollTarget = document.getElementById(href)

            if (!scrollTarget) return

            const elementPosition = scrollTarget.getBoundingClientRect().top
            const offsetPosition = elementPosition - 100

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            })
        })
    })
}

function initMenuRadio() {
    const inputs = document.querySelectorAll('input[type="radio"]')
    let checkedId = ''

    if (!inputs || !inputs.length) {
        return
    }

    inputs.forEach(i => {
        if (!checkedId && i.checked) {
            checkedId = i.id
        }
        i.addEventListener('input', e => {
            checkedId = e.target.id
            setRadio(e.target.id)
        })
    })
}

function setRadio(id) {
    const menuGroups = document.querySelectorAll('.menu-group')
    menuGroups.forEach(i => {
        if (i.getAttribute('data-group') === id) {
            i.classList.remove('hidden')
        } else {
            i.classList.add('hidden')
        }
    })
    resizeSliders()
}

function initUi() {
    customSelect()
    headerScrollSizer()
    categoriesSmoothScroll()
    initMenuRadio()
}

initUi()
