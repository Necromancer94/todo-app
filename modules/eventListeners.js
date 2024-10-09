import { todoActions } from "./todoActions.js"
import { selectors } from "./utils.js"
import { createNotification } from "./createNotification.js"
import { filterPrio } from "./listState.js"

export function loadEventListeners() {

    //main
    selectors.addButton.addEventListener('click', todoActions.addTodo)

    selectors.todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            todoActions.addTodo()
        }
    })

    selectors.listTitle.addEventListener('input', () => {
        localStorage.setItem('list-title', selectors.listTitle.value)

        let charLength = selectors.listTitle.value.length
        if (charLength >= 25) {
            createNotification('Maximum length reached', 'warning')
        }
    })

    selectors.listDescription.addEventListener('input', () => {
        localStorage.setItem('list-description', selectors.listDescription.value)

        let charLength = selectors.listDescription.value.length
        if (charLength >= 150) {
            createNotification('Maximum length reached', 'warning')
        }
    })

    selectors.filterButtons.forEach((button) => {
        button.addEventListener('click', filterPrio)
    })

    //todos
    selectors.todoContainer.addEventListener('click', (event) => {

        if (event.target.closest('.default-color')) {
            todoActions.revealColorPalette(event.target.closest('.default-color'))
        }

        if (event.target.closest('.default-emoji')) {
            todoActions.revealEmojis(event.target.closest('.default-emoji'))
        }

        if (event.target.closest('.delete-icon')) {
            todoActions.deleteTodo(event.target.closest('.delete-icon'))
        }

        if (event.target.matches('.single-color')) {
            todoActions.storeColor(event.target)
        }

        if (event.target.matches('.single-emoji')) {
            todoActions.storeEmoji(event.target)
        }
    })

    selectors.todoContainer.addEventListener('input', (event) => {

        if (event.target.matches('.todo-prio')) {
            todoActions.storePrio(event.target)
        }

        if (event.target.matches('.todo-content')) {
            todoActions.editTodo(event.target)
        }
    })

    selectors.todoContainer.addEventListener('change', (event) => {

        if (event.target.matches('.todo-checkbox')) {
            todoActions.completeTodo(event.target)
        }
    })

    selectors.todoContainer.addEventListener('change', (event) => {

        if (event.target.matches('.date-input')) {
            todoActions.storeDate(event.target)
        }
    })
}