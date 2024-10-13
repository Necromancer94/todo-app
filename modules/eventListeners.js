import { todoActions } from "./todoActions.js"
import { selectors, emojiContainer, colorContainer } from "./utils.js"
import { createNotification } from "./createNotification.js"
import { filterPrio } from "./listState.js"
import { modalState, showModal } from "./modalOverlay.js";
import { removeModal } from "./modalOverlay.js";

let lastClickedEmojiIcon = null;
let lastClickedColorIcon = null;

export const body = document.querySelector('body')

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
            showModal(colorContainer, 'Choose a color')
            lastClickedColorIcon = event.target.closest('.default-color')
        }

        if (event.target.closest('.default-emoji')) {
            showModal(emojiContainer, 'Choose an emoji')
            lastClickedEmojiIcon = event.target.closest('.default-emoji')
        }

        if (event.target.closest('.delete-icon')) {
            todoActions.deleteTodo(event.target.closest('.delete-icon'))
        }

        if (event.target.matches('.single-color')) {
            todoActions.storeColor(event.target)
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

    //body

    body.addEventListener('click', (event) => {

        if (event.target.matches('.single-emoji')) {
            const clickedSingleEmoji = event.target
            todoActions.storeEmoji(clickedSingleEmoji, lastClickedEmojiIcon)
        }

        if (event.target.matches('.single-color')) {
            const clickedColor = event.target
            todoActions.storeColor(clickedColor, lastClickedColorIcon)
        }

        if (modalState.isModalVisible && event.target.matches('.overlay-modal')) {
            removeModal()
        }
    })
}