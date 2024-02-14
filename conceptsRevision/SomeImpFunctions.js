//just a general revision
//filter()

const words = ['apple', "ball", "Carrot", "Doctor", "Elephant", "hi"]

const longWords = words.filter((item)=>(item.length<4))

console.log(longWords)

const upperCaseWord = words.map((word)=>(word.toUpperCase()))
console.log(upperCaseWord)

//forEach()
const newWordList = []
words.forEach(word=>{
    if(word[0]=== 'A'){
        newWordList.push(word)
    }
})

const myObj= {
    a:1,
    b:2,
    c:3
}

console.log(Object.keys(myObj))
console.log(Object.values(myObj))

