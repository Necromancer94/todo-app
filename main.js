import { createtodoElement } from "./modules/createtodoElement.js"
import {listState, updateCount} from "./modules/listState.js"
import { localItems } from "./modules/localItems.js"
import { loadEventListeners } from "./modules/eventListeners.js"

// On load

export function renderList(list) {
    list.forEach((todo) => {
        createtodoElement(todo)
    })
}

window.addEventListener('DOMContentLoaded', () => {
    renderList(listState.todoList)
    localItems.getListProperties()
    loadEventListeners()
    updateCount()
})