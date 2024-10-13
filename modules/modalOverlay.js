import { hideElement } from "./utils.js"
import { body } from "./eventListeners.js"

export const modalState = {
    isModalVisible : false
} 
    
export function createModal (HTML, text){
    const modal = document.createElement('div')
    modal.classList.add('opacity-entry', 'modal')
    modal.innerHTML = 
    `
    <div role="alert" class=" alert-box text-gray-500 text-md mobile:w-[70%] rounded-xl border border-gray-100 bg-white p-10 shadow-sm z-20">
    <p> ${text} </p>
           ${HTML}
    </div>      
`
    
    return modal
}

export function showModal(HTML,text){
    const overlay = document.querySelector('.overlay-modal').classList.remove('invisible')
    const modal = createModal(HTML,text)

    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.insertAdjacentElement('beforeend', modal)

    modalState.isModalVisible = true
}

export function removeModal(){
    body.classList.remove('overflow-hidden')
    hideElement(body.querySelector('.overlay-modal'))
    const modal = document.querySelector('.modal')

    modal.classList.replace('opacity-entry', 'opacity-exit')

    modal.addEventListener('animationend', () => {
        modal.remove()
    })

    modalState.isModalVisible = false
}