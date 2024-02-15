const grandParent = document.querySelector(".grandParent")
const parent = document.querySelector(".parent")
const child = document.querySelector("child")

child.addEventListener("click", (e)=>{
    console.log("child div clicked")
})

parent.addEventListener("click", (e)=>{
    console.log("parent div clicked")
})
grandParent.addEventListener("click", (e)=>{
    console.log("grandParent div clicked")
})