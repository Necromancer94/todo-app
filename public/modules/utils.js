import { createtodoElement } from "./createtodoElement.js"

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

export const emojiContainer = 
`
    <div class="text-xl flex items-center justify-center gap-4 bg-white border border-gray-200 shadow-sm rounded-lg p-3 h-10 top-[80px] emoji-container cursor-pointer">
        <span class="single-emoji"> 💬 </span>
        <span class="single-emoji"> ⚠️ </span>
        <span class="single-emoji"> 🔥 </span>
        <span class="single-emoji"> ✏️ </span>
        <span class="single-emoji"> ❤️ </span>
        <span class="single-emoji"> 🏆 </span>
    </div>
`

export const colorContainer = 
`
    <div
        class="other-colors flex items-center justify-center gap-3  bg-white border border-gray-200 shadow-sm rounded-lg p-3">
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #FFF;"></div>
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #DFECE9;"></div>
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #DDE9F3;"></div>
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #E8E1F2;"></div>
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #F3DDE9;"></div>
        <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #F6E7DC;"></div>
    </div>
`

export function renderList(list) {
    list.forEach((todo) => {
        createtodoElement(todo)
    })
}
