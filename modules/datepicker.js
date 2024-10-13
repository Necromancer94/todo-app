import { findTodo } from "./todoActions.js"
import { localItems } from "./localItems.js"

const localeEn = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
  };
  
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
