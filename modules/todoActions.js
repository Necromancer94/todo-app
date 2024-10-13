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

export const todoActions = {

    addTodo: function () {

        const todoText = selectors.todoInput.value.trim()
        if (todoText) {
            
            const todoObj = {
                text: todoText,
                completed: false,
                date: null,
                prio: null,
                color: null,
                emoji: null,
                id: listState.currentID
            }

            const newTodo = createtodoElement(todoObj)

            listState.currentID++

            localItems.addItem(todoObj)

            if(listState.appliedFilter){
                newTodo.remove()
                createNotification('A new todo was added but is hidden!')

            }

            else {
                createNotification('A new todo was added!')
            }
            
        }

        else {
            createNotification('No input provided!', 'warning')
        }

        selectors.todoInput.value = ''
    },

    completeTodo: function (checkbox) {

        if (checkbox.checked) {
            checkbox.closest('.todo-item').classList.add('line-through', '!text-gray-500')

            const matchedTodo = findTodo(checkbox)
            matchedTodo.completed = true
        }

        else {
            checkbox.closest('.todo-item').classList.remove('line-through', '!text-gray-500')
            const matchedTodo = findTodo(checkbox)
            matchedTodo.completed = false
        }

        updateCount()
        localItems.updateItems()
    },

    deleteTodo: function (deleteIcon) {

        const closestTodo = deleteIcon.closest('.todo-item')
        const todoContent = closestTodo.querySelector('.todo-content').textContent.trim();

        localItems.removeItem(todoContent)
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

    storeDate: function (dateInput){ 
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