const grandParent = document.querySelector(".grandParent")
const parent = document.querySelector(".parent")
const child = document.querySelector(".child")


// Event bubbling: where the inner child element reacts and gradually goes to prarents until the window document.
// child.addEventListener("click", (e)=>{
//     console.log("child div clicked")
// })

// parent.addEventListener("click", (e)=>{
//     console.log("parent div clicked")
// })
// grandParent.addEventListener("click", (e)=>{
//     console.log("grandParent div clicked")
// })

// Event capturing: When capture paramater is made true, the event belonge that activates and whien the inner element is clicked
// parent.addEventListener("click", (e)=>{
//     console.log("parent div clicked")
// }, {
//     capture:true
// })

// child.addEventListener("click", (e)=>{
//     console.log("child div clicked")
// })
// grandParent.addEventListener("click", (e)=>{
//     console.log("grandParent div clicked")
// })

// stopPropagation()

parent.addEventListener("click", (e)=>{
    e.stopPropagation()
    console.log("parent div clicked")
}, {
    capture:true
})

child.addEventListener("click", (e)=>{
    console.log("child div clicked")
})
grandParent.addEventListener("click", (e)=>{
    console.log("grandParent div clicked")
})