import { listState, updateCount } from "./listState.js"
import { selectors } from "./utils.js"

export const localItems = {

    addItem: function (item) {
        listState.todoList.push(item)
        localStorage.setItem('todos', JSON.stringify(listState.todoList))
        updateCount()
    },

    removeItem: function (item) {
        const removeIndex = listState.todoList.indexOf(item)
        listState.todoList.splice(removeIndex, 1)
        localStorage.setItem('todos', JSON.stringify(listState.todoList))
        updateCount()
    },

    updateItems: function () {
        localStorage.setItem('todos', JSON.stringify(listState.todoList))
    },

   getListProperties: function() {
        selectors.listTitle.value = localStorage.getItem('list-title') ?? 'Edit me'
        selectors.listDescription.value = localStorage.getItem('list-description') ?? 'Edit me'
    },
}