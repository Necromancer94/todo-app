export const selectors = {
    todoContainer: document.querySelector('.todo-list'),
    todoInput: document.querySelector('#todo-input'),
    addButton: document.querySelector('#add-btn'),
    todoCount: document.querySelector('.todo-count'),
    listTitle: document.querySelector('#list-title'),
    listDescription: document.querySelector('#list-description'),
    filterButtons: document.querySelectorAll('.filter-btn'),
 }

export function showElement(element) {
    element.classList.remove('invisible')
}

export function hideElement(element) {
    element.classList.add('invisible')
}

export function removeAllTodos() {
    selectors.todoContainer.innerHTML = ''
}

export function fadeElement(element, ms, remove = false){
    setTimeout(() => {
        element.classList.replace('animation-start', 'animation-end')
        element.addEventListener('animationend', () => {

            if(remove){
                element.remove()
            }

            else {
                hideElement(element)
            }
        })
    }, ms);
}