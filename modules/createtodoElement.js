import { selectors } from "./utils.js"
import { loadDatepicker } from "./datepicker.js"

export function createtodoElement(todoObject) {

    const todoItem = document.createElement('div')
    todoItem.classList.add("todo-item", "card-animation-start")
    todoItem.setAttribute('data-id', todoObject.id)
    todoItem.style.backgroundColor = todoObject.color ?? 'white'

    todoItem.innerHTML =
    `
    <span class="placed-emoji w-10 h-10 bg-gray-50 border border-gray-200 p-2 rounded md text-center"> ${todoObject.emoji ?? '💬'}</span>

<div class="flex gap-5 w-full items-center mobile:items-start">
    <input class="todo-checkbox size-4 rounded border-gray-300 cursor-pointer" type="checkbox">
    <p contenteditable="true" class="text-gray-700 font-medium todo-content max-w-[80%] outline-none mobile:mb-5 ">
        ${todoObject.text}
    </p>
</div>

<div class="flex flex-col gap-5 w-full">

    <div class="flex lower-part justify-between w-full mobile:flex-col mobile:gap-8">

        <div class="left-0 flex gap-5 mobile:text-xs">
            <div class="rounded-lg border border-gray-200 text-blue-500 font-medium bg-gray-100 py-1 px-2 shadow-sm text-sm flex justify-center items-center gap-2 max-w-[140px] min-h-10">
                <input value="${todoObject.date ?? ''}" type="text" readonly="true" name="datepicker" placeholder="Choose due date" class="date-input outline-none w-full bg-transparent text-center"></input>
            </div>

            <div class="dropdown-box mobile:w-[50%] rounded-lg border border-gray-200 bg-gray-100 flex gap-4 py-1 px-2 items-center justify-center shadow-sm text-sm min-h-10">
                <label class="text-gray-900"> Priority</label>
                <select class="todo-prio w-full bg-white rounded-md border-gray-300 text-gray-700 border bg-transparent outline-none">
                    <option value="None"> None </option>
                    <option value="Urgent"> Urgent</option>
                    <option value="High"> High</option>
                    <option value="Medium"> Medium</option>
                    <option value="Low"> Low</option>
                </select>
            </div>

        </div>

        <div class="right-0 icon-container flex items-center gap-5 mobile:gap-8 mobile:self-end mobile:hidden">

            <div class="color-group relative">

                <div class="cursor-pointer default-color tooltip relative">
                    <svg class="w-5 hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a9a9a9">
                        <path
                            d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM513-160l286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm220 160Z" />
                    </svg>
                </div>

                <div
                    class="other-colors flex items-center justify-center gap-3 absolute bottom-6 right-8 bg-white border border-gray-200 shadow-sm rounded-lg p-3 invisible z-10">
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #FFF;"></div>
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #DFECE9;"></div>
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #DDE9F3;"></div>
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #E8E1F2;"></div>
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #F3DDE9;"></div>
                    <div class="single-color w-6 h-6 cursor-pointer rounded-full shadow-sm border border-gray-200" style="background-color: #F6E7DC;"></div>
                </div>
            </div>

            <div class="cursor-pointer default-emoji tooltip top-5 right-5">
                <svg class="w-5 hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a9a9a9">
                    <path
                        d="M480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q43 0 83 8.5t77 24.5v90q-35-20-75.5-31.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-32-6.5-62T776-600h86q9 29 13.5 58.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm320-600v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Z" />
                </svg>
            </div>

            <div class="text-xl flex items-center justify-center gap-4 absolute bottom-6 right-8 bg-white border border-gray-200 shadow-sm rounded-lg p-3 z-10 h-10 invisible top-[80px] emoji-container cursor-pointer">
                <span class="single-emoji"> 💬 </span>
                <span class="single-emoji"> ⚠️ </span>
                <span class="single-emoji"> 🔥 </span>
                <span class="single-emoji"> ✏️ </span>
                <span class="single-emoji"> ❤️ </span>
                <span class="single-emoji"> 🏆 </span>
            </div>

            <div class="delete-icon cursor-pointer relative tooltip">
                <svg class="w-5 hover:fill-blue-300" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a9a9a9">
                    <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </div>

        </div>

        </div>
</div>
`

    if (todoObject.completed) {
        todoItem.querySelector('.todo-checkbox').checked = true
        todoItem.classList.add('line-through', '!text-gray-500')
    } 

    if (todoObject.prio) {
        todoItem.querySelector('select').value = todoObject.prio
    }

    selectors.todoContainer.appendChild(todoItem)
    loadDatepicker(todoItem)
    return todoItem
}