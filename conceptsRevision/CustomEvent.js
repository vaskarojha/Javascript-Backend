
// New Event
// const myEvent = new Event("myCustomEvent", { cancelable:true, bubbles:true })

// const button = document.querySelector("button")

// button.addEventListener('myCustomEvent', e=>{
//     console.log("Button", e.defaultPrevented)
// })

// document.addEventListener('myCustomEvent', e=>{
//     console.log("Document", e.defaultPrevented)
// })

// button.dispatchEvent(myEvent)

// New Custom Event 
// Transfer data from one place to another using custom event

const myEvent = new CustomEvent("myCustomEvent", {detail:{hello:"hi"}})

const button = document.querySelector("button")

button.addEventListener('custom:doubleClick', e=>{
    console.log("Double clicked", e.detail.timeBetweenClicks)
})

const MAX_DOULE_CLICK_TIME = 500
let lastClick = 0
button.addEventListener("click", e=>{ 
    const timeBetweenClicks = e.timeStamp - lastClick
    if(timeBetweenClicks> MAX_DOULE_CLICK_TIME){
        lastClick = e.timeStamp
        return
    }
    const doubleClickEvnet = new CustomEvent("custom:doubleClick", {
        bubbles:true,
        cancelable:true,
        composed:true,
        detail:{
            timeBetweenClicks
        }
    })
    e.target.dispatchEvent(doubleClickEvnet)
    lastClick = 0
})
button.dispatchEvent(myEvent)
