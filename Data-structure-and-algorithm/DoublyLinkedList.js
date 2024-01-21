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
}



let myDoublyLinkList = new DoublyLinkedList(5)
console.log(myDoublyLinkList)
myDoublyLinkList.Push(7)
console.log(myDoublyLinkList)

