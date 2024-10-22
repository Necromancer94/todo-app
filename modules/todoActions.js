import { createtodoElement } from "./createtodoElement.js"
import { selectors } from "./utils.js";
import { removeModal } from "./modalOverlay.js";
import { localItems } from "./localItems.js"
import { listState, updateCount } from "./listState.js";
import { createNotification } from "./createNotification.js"

export function findTodo(element) {

    const selectedTodoID = element.closest('.todo-item').getAttribute('data-id').trim()

    const selectedTodo = listState.todoList.find((todo) => {
        return todo.id == selectedTodoID
    })

    return selectedTodo
}

function createTodoObject(text, id) {
    return {
        text,
        completed: false,
        date: null,
        prio: null,
        color: null,
        emoji: null,
        id
    }
}

export const todoActions = {

    addTodo: function () {

        const todoText = selectors.todoInput.value.trim()

        if (!todoText) {
            createNotification('No input provided!', 'warning')
            return
        }

        const todoObj = createTodoObject(todoText, listState.currentID)
        const newTodo = createtodoElement(todoObj)

        listState.currentID++

        localItems.addItem(todoObj)

        if (listState.appliedFilter) {
            newTodo.remove()
            createNotification('A new todo was added but is hidden!')

        }

        else {
            createNotification('A new todo was added!')
        }

        selectors.todoInput.value = ''
    },

    completeTodo: function (checkbox) {

        checkbox.closest('.todo-item').querySelector('.todo-content').classList.toggle('line-through')

        const matchedTodo = findTodo(checkbox)
        matchedTodo.completed = checkbox.checked

        updateCount()
        localItems.updateItems()
    },

    deleteTodo: function (deleteIcon) {

        const selectedTodo = findTodo(deleteIcon)
        localItems.removeItem(selectedTodo)

        const closestTodo = deleteIcon.closest('.todo-item')
        closestTodo.remove()

        createNotification('Removed one todo!')
    },

    storePrio: function (dropdown) {

        const priority = dropdown.value
        const matchedTodo = findTodo(dropdown)
        matchedTodo.prio = priority
        localItems.updateItems()
    },

    editTodo: function (paragraphElement) {

        const selectedTodo = findTodo(paragraphElement)
        selectedTodo.text = paragraphElement.textContent.trim()
        localItems.updateItems()
    },

    storeDate: function (dateInput) {
        const selectedTodo = findTodo(dateInput)
        selectedTodo.date = dateInput.value
        localItems.updateItems()
    },

    storeEmoji: function (clickedEmoji, lastClickedEmoji) {

        const selectedTodo = findTodo(lastClickedEmoji)
        selectedTodo.emoji = clickedEmoji.textContent
        const placedEmoji = lastClickedEmoji.closest('.todo-item').querySelector('.placed-emoji');
        placedEmoji.textContent = clickedEmoji.textContent

        removeModal()
        localItems.updateItems()
    },

    storeColor: function (clickedColor, lastClickedColorIcon) {

        const selectedColor = clickedColor.style.backgroundColor
        const closestItem = lastClickedColorIcon.closest('.todo-item');
        closestItem.style.backgroundColor = selectedColor

        const selectedTodo = findTodo(lastClickedColorIcon)
        selectedTodo.color = selectedColor

        removeModal()
        localItems.updateItems()
    },
}