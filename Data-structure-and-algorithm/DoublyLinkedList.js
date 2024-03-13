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
    dequeue(){
        if(this.length === 0) return undefined
        let temp = this.first
        if(this.length ===1 ){
            this.last = null
        }else{
            this.first =this.first.next
            temp.next =null
        }
        this.length--
        return temp
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

class BstNode{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }

}

class BST{
    constructor(){
        this.root = null
    }
}


insert(value){
    const newNode = new BstNode(value)
    if(this.root === null){
        this.root = newNode
        return this
    }
    let temp = this.root
    while(true){
        if(newNode.value === temp.value) return undefined
        if(newNode.value < temp.value){
            if(temp.left === null){
                temp.left = newNode
                return this
            }
            temp = temp.left
        }else{
            if(temp.right === null){
                temp.right = newNode
                return this
            }
            temp = temp.right
        }
    }
}


constains(value) {
    if(this.root === null) false
    let temp = this.root

    while(temp){
        if(value<temp.value){
            temp = temp.left
        }
        else if(value>temp.value){
            temp = temp.right
        } else true
    }
    return false
}

minValueNode(currentNode){
    while(currentNode.left != null){
        currentNode = currentNode.left
    }
    return currentNode
}

let myTree = new BST()
myTree

myTree.insert(50)
myTree.insert(65)

class HashTable{
    constructor(size = 7){
        this.datamap= new Array(size)

    }
    _hash(key){
        let hash =0
        for(let i=0; i<key.length; i++){
            hash = (hash+key.charCodeAt(i) *23) % this.datamap.length

        }
        return hash
    }
    
    set(key, value){
        let index = this._hash(key)
        if(!this.dataMap[index]) this.dataMap[index] = []
    
        this.dataMap[index].push([key, value])
    }

    get(key){
        let index = this._hash(key)
        if(this.datamap[index]){
            for(let i=0;i<this.datamap[index].length; i++){
                if(this.datamap[index][i][0] === key){
                    return this.datamap[index][i][1]
                }
            }
        }
        return undefined
    }

    keys(){
        let allKeys = []
        for(let i=0; i<this.datamap.length; i++){
            if(this.dataMap[i]){
                for(let j = 0; j<this.datamap[i], j++){
                    allKeys.push(this.datamap[i][j][0])
                }
            }
        }
        return allKeys
    }
}



let myHashTable = new HashTable()
myHashTable

var simplehash = new Object();
// or
// var simplehash = {};

simplehash['key1'] = 'value1';
simplehash['key2'] = 'value2';
simplehash['key3'] = 'value3';

for (var key in simplehash) {
  // use hasOwnProperty() to filter out properties from Object.prototype
  if (simplehash.hasOwnProperty(key)) {
    console.log('key is: ' + key + ', value is: ' + simplehash[key]);
  }
}

var maphash = new Map();

maphash.set('key1', 'value1');
maphash.set('key2', 'value2');
maphash.set('key3', 'value3');

console.log(maphash.get('key3'));
// Output: value3

maphash.set('key1', 'new value');

console.log(maphash.get('key1'));
// Output: new value

console.log(maphash.size);
// Output: 3

maphash.delete('key2');

console.log(maphash.size);
// Output: 2

for (const [key, value] of maphash) {
  console.log(key + ' = ' + value);
}
// Output: key1 = new value
//         key3 = value3

