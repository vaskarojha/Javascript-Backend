class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList{
    constructor(value){
        const newNode = new Node(value)
        this.head = newNode
        this.tail = this.head
        this.length = 1
    }
    
    push(value){
        const newNode = new Node(value)

        if(!this.head){
            this.head= newNode
            this.tail = newNode
        }
        else{
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
        return this
    }
    pop(){
        if(!this.head) undefined
        
        let temp = this.head
        let pre = this.head

        while(temp.nex){
            pre = temp
            temp = temp.next
        }
        this.tail = pre
        this.tail.next = null

        this.length --
        if(this.length ===0){
            this.head = null
            this.tail = null
        }
    }
    unshift(value){
        const newNode = new Node(value)

        if(!this.head){
            this.head =newNode
            this.tail = newNode
        }
        else{
            newNode.next = this.haad
            this.head = newNode
        }
        this.length ++
        return this
    }
    shift(){
        if(!this.head) undefined

        let temp = this.head
        this.haed = this.head.next
        temp.next = null
        this.length --
        if(this.length ===0){
            this.tail = null
        }
        return temp
    }
    get(index){
        if(index<0 || index >= this.length) undefined

        let temp = this.head

        for(let i =0; i<index ; i++){
            temp = temp.next
        }
        return temp
    }

    set(index, value){
        let temp = this.get(index)
        if(temp){
            temp.value= value
            return value
        }
        return false
    }
}



let myLinkedList = new LinkedList(5)
myLinkedList.push(5)
console.log(myLinkedList)

myLinkedList.pop()
console.log(myLinkedList)

myLinkedList.unshift(7)
console.log(myLinkedList)

myLinkedList.shift()
console.log(myLinkedList)

console.log(myLinkedList.get(1))

myLinkedList.set(1,12)
console.log(myLinkedList)