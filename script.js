import {format,getUnixTime,fromUnixTime,addMonths,subMonths,startOfWeek,startOfMonth,endOfWeek,endOfMonth,eachDayOfInterval, isSameMonth, isSameDay} from 'date-fns'

const dateButton=document.querySelector(".date-picker-button")
const datePicker=document.querySelector(".date-picker")
const dateHeaderText=document.querySelector(".current-month")
const previous=document.querySelector(".prev-month-button")
const next=document.querySelector(".next-month-button")
const dateGrid=document.querySelector(".date-picker-grid-dates")
let currentDate=new Date()



dateButton.addEventListener("click",()=>{
    datePicker.classList.toggle("show")
    const selectedDate=fromUnixTime(dateButton.dataset.selectedDate)
    setupDatePicker(selectedDate)
})

function setDate(date){
    dateButton.innerText=format(date,'MMMM do, yyyy')
    dateButton.dataset.selectedDate=getUnixTime(date)
}

function setupDatePicker(selectedDate){
    dateHeaderText.innerText=format(currentDate,'MMMM - yyyy')
    setupDates(selectedDate)
    

}

function setupDates(selectedDate){
    const firstWeekStart=startOfWeek(startOfMonth(currentDate))
    const lastWeekEnd=endOfWeek(endOfMonth(currentDate))
    const dates=eachDayOfInterval({ start:firstWeekStart,
                                    end:lastWeekEnd})
    dateGrid.innerHTML=''
    dates.forEach(date=>{
        const dateElement=document.createElement('button')
        dateElement.classList.add('date')
        dateElement.innerText=date.getDate()
        if(!isSameMonth(date,currentDate)){
            dateElement.classList.add("date-picker-other-month-date")
        }
        if(isSameDay(date,selectedDate)){
            dateElement.classList.add('selected')
        }
        dateElement.addEventListener("click",()=>{
            setDate(date)
            datePicker.classList.remove("show")

        })
        dateGrid.appendChild(dateElement)
        

    }
  )
}

next.addEventListener('click',()=>{
    const selectedDate=fromUnixTime(dateButton.dataset.selectedDate)
    currentDate=addMonths(currentDate,1)
    setupDatePicker(selectedDate)
            
    })

previous.addEventListener('click',()=>{
    const selectedDate=fromUnixTime(dateButton.dataset.selectedDate)
    currentDate=subMonths(currentDate,1)
    setupDatePicker(selectedDate)
            
    })


setDate(new Date())