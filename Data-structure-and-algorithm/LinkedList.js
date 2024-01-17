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

    insert(index, value){
        if(index === 0) this.unshift(value)
        if(index === this.length) this.push(value)
        if(index< 0 || index > this.length) false
        
        const newNode = newNode(value)
        const temp = this.get(index -1)

        newNode.next = temp.next
        temp.next = newNode
        this.length++
    }

    remove(index){
        if(index=== 0) this.shift()
        if(index== this.length -1) this.pop()
        if(index<0 || index>= this.length) undefined

        const before = this.get(index-1)
        const temp = before.next

        before.next = temp.next
        temp.next = null
        this.length --
        return temp
    }

    reverse(){
        let temp = this.head
        this.head = this.tail
        this.tail = temp
        let next = temp.next
        let prev = null

        for(let i = 0; i< this.length; i++){
            next = temp.next
            temp.next = prev
            prev = temp
            temp = next
        }
        return this
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

myLinkedList.insert(1,17)
console.log(myLinkedList)

myLinkedList.remove(1)
console.log(myLinkedList)

console.log(myLinkedList.reverse())