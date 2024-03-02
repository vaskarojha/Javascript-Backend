class Node{
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList{
    constructor(value){
        const newNode =new Node(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }
    Push(value){
        const newNode = new Node(value)
        if(!this.head){
            this.head =newNode
            this.tail = newNode
        }
        else{
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }
        this.length ++
        return this
    }

    Pop(){
        if(this.length ===0) return undefined
        let temp = this.tail
        if(this.length ===1){
            this.head= null
            this.tail = null
        } else{
            this.tail= this.tail.prev
            this.tail.next = null
            temp.prev = null
        }
        this.length--
        return temp
    }

    unshift(value){
        const newNode = new Node(value)
        if(this.length=== 0){
            this.head =newNode
            this.tail = newNode
        } else{
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode``
        }
        this.length++
        return this
    }

    shift(){
        if(this.length===0){
            return undefined
        }
        let temp = this.head
        if(this.length ===1){
            this.head = null
            this.tail = null
        } else{
            this.head = this.head.next
            this.head.prev = null
            temp.next = null
        }
        this.length --
        return temp
    }
    get(index){
        if(index<0 || index >= this.length) return undefined

        let temp = this.head
        if(index<this.length/2){
            for(let i=0; i<index; i++){
                temp = temp.next
            }}
            else{
                temp = this.tail
                for(let i= this.length -1 ;i>index ; i--){
                    temp = temp.prev
                
            }
        }
        return temp
    }

    set(index, value){
        let temp = this.get(index)
        if(temp){
            temp.value = value
            return true
        }
        return false
    }
    insert(index, value){
        if(index<0 || index>this.length){
            return false
        }
        if(index === this.length){
            return this.Push(value)
        }
        if(index ===0){
            return this.unshift(value)
        }
        const newNode = new Node(value)
        const before = this.get(index-1)
        const after = before.next
        newNode.prev = before
        newNode.next = after
        after.prev = newNode
        return true
    }

    remove(index){
        if(index ===0) return this.shift()
        if(index=== this.length -1) return this.Pop()
        if(index<0 || index>= this.length) return undefined
        
        const temp = this.get(index)

        temp.prev.next = temp.next
        temp.next.prev = temp.prev
        temp.next = null
        temp.prev = null

        this.length --
        return temp
    }
}


let myDoublyLinkList = new DoublyLinkedList(5)
console.log(myDoublyLinkList)
myDoublyLinkList.Push(7)
console.log(myDoublyLinkList)
myDoublyLinkList.Pop()
console.log(myDoublyLinkList)

myDoublyLinkList.unshift(1)


class StackNode{
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor(value){
        const newNode = new Node(value)
        this.top = newNode
        this.length =1
    }

    push(value){
        const newNode = new Node(value)
        if(this.length === 0){
            this.top = newNode
        } else{
            newNode.next = this.tip
            this.top = newNode
        }
        this.length ++
        return this
    }

    pop(){
        if(this.length ===0) return undefined
        let temp = this.top
        this.top = this.top.next
        temp.next = null

        this.length --
        return temp
    }
}

class QueueNode{
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Queue{
    constructor(value){
        const newNode = new QueueNode(value)
        this.first = newNode
        this.last = newNode
        this.length =1
    }

    enqueue(value){
        const newNode = new QueueNode(value)
        if(this.value === 0){
            this.first = newNode
            this.last = newNode
        } else{
            this.last.next = newNode
            this.last = newNode
        }
        this.length ++
        return this
    }
}

let myQueue1= new Queue(11)
myQueue1.enqueue(3)
myQueue.enqueue(23)

let myQueue = new Queue(4)
myQueue


let myStack = new Stack(5)
myStack.push(25)
myStack.push(14)
myStack.push(8)
myStack.pop()
