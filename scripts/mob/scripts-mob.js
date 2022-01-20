'use strict'

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

function menuSelect() {
    const selectNode = document.getElementById('menu-select')
    const selectList = selectNode?.querySelectorAll('.menu-type')
    const currentSelect = selectNode?.querySelector('.current')

    if (!selectNode || !currentSelect || !selectList) {
        return
    }

    selectNode.addEventListener('touchend', (e) => {
        if (e.target.classList.contains('open')) {
            document.body.style.cssText = ''
            e.target.classList.remove('open')
            return
        }
        document.body.style.cssText = 'height: 100vh; overflow: hidden;'
        e.target.classList.add('open')
    })

    selectList.forEach((s) => {
        s.addEventListener('click', (e) => {
            selectNode.querySelector('.menu-type.current').classList.remove('current')
            e.target.classList.add('current')
            setTimeout(() => {
                selectNode.classList.remove('open')
                document.body.style.cssText = ''
            }, 100)
        } )
    })

    document.addEventListener('touchend', (e) => {
        if (!e.target?.classList?.contains('menu-type') && !e.target?.classList?.contains('menu-select')) {
            selectNode.classList.remove('open')
            document.body.style.cssText = ''
        }
    })
}

function headerScrollSizer() {
    const header = document.querySelector('.header-wrapper')

    if (!header) {
        return
    }

    if (header.classList.contains('header-category')) {
        return
    }

    if (header.nextElementSibling?.getBoundingClientRect().y < 0) {
        setTimeout(() => {
            header.classList.add('header-min')
            initScroll()
        }, 500)
        return
    }

    initScroll()

    function initScroll() {
        window.addEventListener('scroll', function()  {
            if (this.scrollY > 40 ) {
                header.classList.add('header-min')
                return
            }
            header.classList.remove('header-min')
        })
    }
}

function categoriesSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault()

            document.querySelector('.current-category')?.classList.remove('current-category')
            e.target.classList.add('current-category')

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
    const types = document.querySelectorAll('.menu-type')

    if (!types || !types.length) {
        return
    }

    let checkedId = ''
    types.forEach(i => {
        if (!checkedId && i.classList.contains('current')) {
            checkedId = i.id
        }
        i.addEventListener('touchstart', e => {
            checkedId = e.target.id
            setRadio(e.target.id)
        })
    })
}

function setRadio(id) {
    const menuGroups = document.querySelectorAll('.menu-group')

    if (!menuGroups || !menuGroups.length) {
        return
    }

    menuGroups.forEach(i => {
        if (i.getAttribute('data-group') === id) {
            i.classList.remove('hidden')
        } else {
            i.classList.add('hidden')
        }
    })
    resizeSliders()
}

function headerHandlers() {
    document.getElementById('header-description').ontouchstart = (e) => {
        e.currentTarget.classList.remove('min')
    }
    document.getElementById('more-handler').ontouchstart = () => {
        document.getElementById('more-info').classList.toggle('closed')
    }
}

function initUi() {
    headerHandlers()
    menuSelect()
    customSelect()
    headerScrollSizer()
    categoriesSmoothScroll()
    initMenuRadio()
}

initUi()
