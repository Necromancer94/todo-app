import { findTodo } from "./todoActions.js"
import { localItems } from "./localItems.js"
import localeEn from "./en-local.js"

export function loadDatepicker (todo){

    const selector = todo.querySelector('.date-input')

    const airDate = new AirDatepicker(selector, {
        autoClose: true,
        isMobile: true,
        inline: false,
        minView: 'months',
        dateFormat: 'dd MMMM',
        locale: localeEn,
    
        onSelect({date, formattedDate, datepicker}){
            selector.value = formattedDate
            const selectedTodo = findTodo(selector)
            selectedTodo.date = selector.value
            localItems.updateItems()
        }
    })    
}