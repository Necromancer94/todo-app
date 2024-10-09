import { createtodoElement } from "./createtodoElement.js"
import { selectors, showElement, hideElement, fadeElement } from "./utils.js";
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

    storeColor: function (colorElement) { 

        const selectedColor = colorElement.style.backgroundColor
        const closestItem = colorElement.closest('.todo-item');
        closestItem.style.backgroundColor = selectedColor

        const selectedTodo = findTodo(colorElement)
        selectedTodo.color = selectedColor
        localItems.updateItems()
    },

    editTodo: function (paragraphElement) { 

        const selectedTodo = findTodo(paragraphElement)
        selectedTodo.text = paragraphElement.textContent.trim()
        localItems.updateItems()
    },

    revealColorPalette: function (defColor) {

        const closestPallete = defColor.parentNode.querySelector('.other-colors')
        showElement(closestPallete)
        closestPallete.classList.add('animation-start')

        // fadeElement(closestPallete, 3000)
        setTimeout(() => {
            hideElement(closestPallete)
        }, 3000)
    },

    storeDate: function (dateInput){ 
        const selectedTodo = findTodo(dateInput)
        selectedTodo.date = dateInput.value
        localItems.updateItems()
    },

    revealEmojis: function (defEmoji) {

        const emojiContainer = defEmoji.parentNode.querySelector('.emoji-container')
        showElement(emojiContainer)
        emojiContainer.classList.add('animation-start')
        // fadeElement(emojiContainer, 3000)
        setTimeout(() => {
            hideElement(emojiContainer)
        }, 3000)
    },

    storeEmoji: function (clickedEmoji) { 

        const selectedTodo = findTodo(clickedEmoji)
        selectedTodo.emoji = clickedEmoji.textContent
        const placedEmoji = clickedEmoji.closest('.todo-item').querySelector('.placed-emoji');
        placedEmoji.textContent = clickedEmoji.textContent
        localItems.updateItems()
    },
}