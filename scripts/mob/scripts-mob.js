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

    selectNode.addEventListener('touchstart', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('open')) {
            e.target.classList.remove('open')
            bodyScrollBlock(false)
            return
        }
        e.target.classList.add('open')
        bodyScrollBlock(true)
    })

    selectList.forEach((s) => {
        s.addEventListener('touchend', (e) => {
            e.preventDefault()
            selectNode.querySelector('.menu-type.current').classList.remove('current')
            e.target.classList.add('current')
            selectNode.children[0].innerText = e.target.textContent


            setTimeout(() => {
                selectNode.classList.remove('open')
                bodyScrollBlock(false)
            }, 100)
        } )
    })

    document.addEventListener('touchend', (e) => {
        if (selectNode.classList.contains('open') &&
            !e.target?.classList?.contains('menu-type') &&
            !e.target?.classList?.contains('menu-select')) {
            selectNode.classList.remove('open')
            bodyScrollBlock(false)
        }
    })
}

function headerScrollSizer() {
    const header = document.querySelector('.header-wrapper')
    const mainWrapper = document.querySelector('.main-wrapper')

    if (!header) {
        return
    }

    if (header.classList.contains('header-category') || header.classList.contains('header-not-onborded')  ) {
        return
    }


    if (window.scrollY > 200) {
        setTimeout(() => {
            header.classList.add('header-min')
            initScroll()
        }, 400)
        return
    }

    mainWrapper ? mainWrapper.style.cssText = `padding-top: ${header.offsetHeight}px` : null

    initScroll()

    function initScroll() {
        window.addEventListener('scroll', function()  {
            const headerIsMin = header.classList.contains('header-min')

            if (this.scrollY < 500 && swipeDirection.y !== 'top' && headerIsMin) {
                header.classList.remove('header-min')
            }

            if (this.scrollY > 250 && swipeDirection.y !== 'bottom' && !headerIsMin) {
                header.classList.add('header-min')
            }
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

            document.querySelector('.header-wrapper')?.classList.add('header-min')
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
    const headerDescription = document.getElementById('header-description')
    const moreHandler = document.getElementById('more-handler')

    if (headerDescription) {
        if (headerDescription.offsetHeight > 36) {
            headerDescription.classList.add('min')
        }

        headerDescription.ontouchstart = (e) =>  e.currentTarget.classList.remove('min')
        headerDescription.style.cssText = ''
    }

    moreHandler ? moreHandler.ontouchstart = (e) => {
        e.preventDefault()
        document.getElementById('more-info').classList.toggle('closed')
    } : null
}

function popupHandlers() {
    const closers = document.querySelectorAll('footer *[data-popup-closer]')
    const handlers = document.querySelectorAll('footer *[data-popup-handler]')

    closers.forEach(c => {
        c.ontouchend = (e) => {
            e.preventDefault()
            const id = `${c.getAttribute('data-popup-closer')}`
            document.getElementById(id).classList.remove('open')
            bodyScrollBlock(false)

            if (id === 'order-popup') {
                refreshOrderPopup()
            }
        }
    })
    handlers.forEach(c => {
        c.ontouchend = (e) => {
            e.preventDefault()
            const id = `${c.getAttribute('data-popup-handler')}`
            document.getElementById(id).classList.add('open')
            bodyScrollBlock(true)
        }
    })
}

function bodyScrollBlock(isBlocked) {
    if (isBlocked) {
        document.body.style.cssText = 'height: 100vh; max-height: 100vh; overflow: hidden;' +
            ' touch-action: none; -ms-touch-action: none;'
        return
    }
    document.body.style.cssText = ''
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
    headerHandlers()
    menuSelect()
    customSelect()
    headerScrollSizer()
    categoriesSmoothScroll()
    initMenuRadio()
    popupHandlers()
    orderHandlers()
    shareLinksInit()
}

initUi()
