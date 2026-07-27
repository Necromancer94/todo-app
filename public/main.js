import { listState, updateCount } from "./modules/listState.js"
import { localItems } from "./modules/localItems.js"
import { loadEventListeners } from "./modules/eventListeners.js"
import { renderList } from "./modules/utils.js"

window.addEventListener('DOMContentLoaded', () => {
    renderList(listState.todoList)
    localItems.getListProperties()
    loadEventListeners()
    updateCount()
})