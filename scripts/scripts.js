'use strict'

function customSelect() {
    const selectNode = document.getElementById('select')
    const currentSelect = document.getElementById('current-select')
    const selectList = document.getElementById('select-list').children

    selectNode.onclick = function (){
        this.classList.add('open')
    }

    function setValue(e) {
        currentSelect.innerText = e.target.id
    }

    for (let i = 0; i < selectList.length; i++) {
        selectList[i].onclick = setValue
    }

    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('select')) {
            selectNode.classList.remove('open')
        }
    })
}

function initUi() {
    customSelect()
}

initUi()
