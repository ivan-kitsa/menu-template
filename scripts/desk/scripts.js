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
            header.classList.remove('init')
            initScroll()
        }, 500)
        return
    }

    header.classList.remove('init')
    initScroll()

    function initScroll() {
        window.addEventListener('scroll', () =>  {
            if (window.scrollY > 40 ) {
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
    const inputs = document.querySelectorAll('input[type="radio"]')

    if (!inputs || !inputs.length) {
        return
    }

    let checkedId = ''
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

function popupHandlers() {
    const closers = document.querySelectorAll('*[data-popup-closer]')
    const handlers = document.querySelectorAll('*[data-popup-handler]')

    if (!closers || !handlers) {
        return
    }

    closers.forEach(c => {
        c.onclick = () => {
            const id = `${c.getAttribute('data-popup-closer')}`
            document.getElementById(id).classList.remove('open')
            bodyScrollBlock(false)

            if (id === 'order-popup') {
                refreshOrderPopup()
            }
        }
    })
    handlers.forEach(c => {
        c.onclick = () => {
            const id = `${c.getAttribute('data-popup-handler')}`
            document.getElementById(id).classList.add('open')
            bodyScrollBlock(true)
        }
    })
}

function orderHandlers() {
    const orderPopup = document.getElementById('order-popup')
    const orderSelects = orderPopup?.querySelectorAll('.select-head')
    const orderTypes = orderPopup?.querySelectorAll('input[type="radio"]')
    const button = document?.getElementById('order-continue')

    if (!orderPopup || !orderSelects || !orderTypes || !button) {
        return
    }

    orderSelects.forEach(s => {
        s.onclick = (e) => {
            setTimeout(() => {
                if (e.target.parentElement.classList.contains('open')) {
                    e.target.parentElement.classList.remove('open')
                    return
                }
                orderPopup.querySelector('.order-select.open')?.classList.remove('open')
                e.target.parentElement.classList.toggle('open')
            }, 0)
        }
    })
    orderTypes.forEach(i => {
        i.oninput = (e) => {
            button?.classList.remove('disabled')

            if (e.target.id === 'cash') {
                orderPopup.querySelector('.order-select.open')?.classList.remove('open')
                button?.classList.add('hidden')
                return
            }

            button?.classList.remove('hidden')
        }
    })
}

function refreshOrderPopup() {
    const orderPopup = document.getElementById('order-popup')
    const button = document.getElementById('order-continue')
    const orderTypes = orderPopup.querySelectorAll('input[type="radio"]')

    orderTypes.forEach(i => {
        i.checked = false
    })
    button?.classList.add('disabled')
    button?.classList.remove('hidden')
    orderPopup?.querySelector('.order-select.open')?.classList.remove('open')
}

function bodyScrollBlock(isBlocked) {
    if (isBlocked) {
        document.body.style.cssText = 'height: 100vh; max-height: 100vh; overflow: hidden;' +
            ' touch-action: none; -ms-touch-action: none;'
        return
    }
    document.body.style.cssText = ''
}

function shareLinksInit() {
    function copyLink(id) {
        const link = document.getElementById(id)

        if (!link) {
            return
        }

        link.onclick = async (e) => {
            const copyValue = e.currentTarget.getAttribute('data-link').trim()
            await navigator.clipboard.writeText(copyValue)
        }
    }

    copyLink('copy-share-link')
    copyLink('message-share-link')
}

function initUi() {
    customSelect()
    headerScrollSizer()
    categoriesSmoothScroll()
    initMenuRadio()
    popupHandlers()
    orderHandlers()
    shareLinksInit()
}

initUi()
