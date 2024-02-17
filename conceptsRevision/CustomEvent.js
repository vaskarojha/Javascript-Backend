
const myEvent = new Event("myCustomEvent", { cancelable:true, bubbles:true })

const button = document.querySelector("button")

button.addEventListener('myCustomEvent', e=>{
    console.log("Button", e.defaultPrevented)
})

document.addEventListener('myCustomEvent', e=>{
    console.log("Document", e.defaultPrevented)
})

button.dispatchEvent(myEvent)
