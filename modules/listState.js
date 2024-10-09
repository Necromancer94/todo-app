import { createNotification } from "./createNotification.js"
import { selectors, removeAllTodos } from "./utils.js"
import {renderList} from '../main.js'

export const listState = {
    todoList: JSON.parse(localStorage.getItem('todos')) ?? [],
    leftoverCount: 0,
    appliedFilter: null,
    currentID: (JSON.parse(localStorage.getItem('todos'))?.at(-1)?.id ?? 0) + 1
}

export function updateCount() {
    const remainingTodos = listState.todoList.filter((todo) => {
        return todo.completed == false
    })

    listState.leftoverCount = remainingTodos.length
    selectors.todoCount.textContent = listState.leftoverCount + ' things left to do'
}

export function filterPrio(event) {

    removeAllTodos()
    
    const BtnText = event.target.textContent.trim()

    selectors.filterButtons.forEach((button) => {
        button.classList.remove('!text-blue-500', 'bg-white')
    })

    event.target.classList.add('!text-blue-500', 'bg-white')
    
    if (BtnText.includes('Show')) {
        renderList(listState.todoList)
        listState.appliedFilter = null
        return
    }

    listState.appliedFilter = BtnText

    const otherTodos = listState.todoList.filter((todo) => {
        const prioText = todo?.prio?.trim()
        return listState.appliedFilter.startsWith(prioText)
    })

    if (otherTodos.length > 0) {
        renderList(otherTodos)
    }

    else {
        createNotification('No items match the filter', 'warning')
    }
}