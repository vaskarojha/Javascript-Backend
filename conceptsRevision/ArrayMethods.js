const foods = ['apple', 'banana', 'carrot', 'lemon', 'mango', 'appricot']
let arrResult = []
//arrr.forEach(cbFunction) : This method takes callback function as a paramaters and implements the function in all the elements of array. It works exactly like for loopp
foods.forEach((food)=>{
    // console.log(food)
    arrResult.push(food.toUpperCase())
})

// arr.map(cbFunc): This method takes cb function as paramater and returns new array based on the call back function applied
arrResult = foods.map(food=>{
    return food.length
}) //RESULT : [ 5, 6, 6, 5, 5 ]

//arr.filter() : This method works like the map but it only returns the new array list if the given condition is matched

arrResult = foods.filter(food=>{
    return food.length>5
}) // RESULT: [ 'banana', 'carrot' ]

// arr.concat(arr || value) : This method is used to join two or many array or also values in the array
const arr1= ['abc', 'def']
arrResult = foods.concat(arr1)
arrResult = foods.concat('newValue')
arrResult = foods.concat(arr1, 'newValue')

//arr.find(cb) : It helps find the elements in the array. It takes a cb func as a paramater and returns the value if the function is satisited
arrResult = foods.find((food)=>{
    return food[0] ==='a'
})
//NOTE: It just returns the first element found in the array.

//arr.findIndex(cb): It works as the find but it returns only the index value of the item in the array.
arrResult = foods.findIndex(food=>{
    return food.length ===5
})

//arr.indexO(item , opt:startOfIndes)
const foods1 = foods.concat('banana')
arrResult = foods.indexOf('banana')
arrResult = foods1.indexOf('banana', 3)

//arr.lastIndexOf()
arrResult = foods1.lastIndexOf('banana')

//arr.some(cb) :Returns true or false if any of the item is matched in condition. Its like or condition check for the all items in array
arrResult = foods.some(food=> food.length ===5)
arrResult = foods.some(food=> food.length ===15)

//arr.every() : its like a and condition check or all items in array
arrResult = foods.every(item=> item.length>3)
arrResult = foods.every(item=> item.length>5)

//arr.includes(searchItem): returns true or false in response if the item is found or not.
arrResult = foods.includes('appricot')
arrResult = foods.includes('papaya')
arrResult = foods.includes('apple', 5) //Second paramater is a start of the search index.

//arr.push(): This method is used to insert the new element to the array from the end
foods.push('Orange')
// console.log(foods)
arrResult = foods.push('Salat') // if assigned to any variable, it returns the new length of the array.
//NOTE: It changes the origninal array

//arr.unshift(item) :It works exactly opposit to the push as it adds an item to the start of the array
arrResult = foods.unshift('Avacado')
// console.log(foods)
//NOTE: It changes the origninal array

//arr.pop() :This method removes the last element from the array
foods.pop() // returns the removed item
// console.log(foods)
//NOTE: It changes the origninal array

//arr.shift() : This removes the first item of the array.
arrResult= foods.shift() // returns the removed item
// console.log(foods)
//NOTE: It changes the origninal array

//arr.toString() : This method combines a array into a one string.
arrResult = foods.toString() // returns : apple,banana,carrot,lemon,mango,appricot,Orange
//NOTE: It will include the commas also while converting to the string

// arr.join(separator) : This works like a toString() method but we can provide a separator and the saperator is inserted in between the items of new string.
arrResult = foods.join('') //returns : applebananacarrotlemonmangoappricotOrange
arrResult = foods.join('-') //returns : apple-banana-carrot-lemon-mango-appricot-Orange

//arr.fill(item) : This method fills the whole array with the item provided in the paramater
const foods2= foods
// console.log(foods)
arrResult = foods2.fill('newItem') //returns ['newItem','newItem','newItem','newItem''newItem','newItem','newItem']
const foods3= foods
arrResult = foods3.fill('newItem', 4) //returns ['apple',   'banana','carrot',  'lemon','newItem', 'newItem','newItem']
//NOTE: It changes the origninal array


//arr.copyWithin(targetIndex, startIndex) :This method make a copy of the array from start till the targetIndes and second paramater is used to declare after with the remaining space in array in filled
arrResult = foods.copyWithin(2) //make of copy of first 2 item and continue the element from start.
arrResult = foods.copyWithin(2,4) //make of copy of first 2 item and continue the element from forth index
arrResult = foods.copyWithin(2,4,7) // /make of copy of first 2 item and continue the element from forth index and donot include the index from seventh index.


//arr.slice(startIndex, endIndex) : It is used to create a new array from existing by slicing its element. It starts from startIndex and goes till endIndex but doesnot include it.
const array1 = ['apple',  'banana', 'carrot', 'lemon','mango',  'appricot','Orange']
arrResult = array1.slice(1,4)

//arr.splice() : It is similar to slicce but it modifies the original array and returns the value after removing from the existing array.
const array2 = array1
arrResult = array2.splice(0,2)


//arr.sort() : This method is used to sort the array. By default it sort in ascending order
arrResult = array1.sort()
//Note: It changes the original array

// arr.reverse(): This method is used to reverse the array elements.
arrResult = array1.reverse()

// Array.from() : This method works on array object. It converts array like object to an array
const sampleStr = '1234'
arrResult = Array.from(sampleStr) //returns : [ '1', '2', '3', '4' ]
//This method can also take second paramater as call back function and works like a map method.
arrResult = Array.from(sampleStr, (item)=>{
    return Number(item)
}) 

//Array.isArray(Arr1): This method works in array object. It is just used to check either the given paramater is array or not
arrResult = Array.isArray(array1) // returns: true
arrResult = Array.isArray('text') // returns: false

//Array.valueOf() : This method is used to create a copy of original array
arrResult= array2.valueOf()

//Array.entries() : This method returns a new Array Iterator Object with a index value and item is each saparate array.
arrResult = array2.entries() // returns : Object [Array Iterator] {}

// Array.keys() : This method returns the index key iterator object.
arrResult = array2.keys() //returns : Object [Array Iterator] {}

//Array.values() : This method returns the values of array in the form of iterator object.
arrResult = array2.values() //Object [Array Iterator] {}
//console.log([...arrResult]) // returns: [ 'mango', 'lemon', 'carrot', 'appricot', 'Orange' ]


//Array.reduce(cb, initialValue) : This method is used to convert the array into single value at the end.
function reducer(previousValue, currentValue){
    return  previousValue +currentValue
}
const array4 = [1,2,3,4,5]
arrResult= array4.reduce(reducer)

//Array.reduceRight() : This method works like reduce instead from left to right this method start from right to left
arrResult = array4.reduceRight(reducer)

//Array.flat() : This method is used to convert multi dimension or nested array into flat one dimension array. By default flat() method goes to depth one.
const array5 = [1,2,3,[3,4,5,[4,2]],[6,8,6]]
arrResult = array5.flat() // returns: [ 1, 2, 3, 3, 4, 5, [ 4, 2 ], 6, 8, 6 ]
arrResult = array5.flat(2) //returns : [1, 2, 3, 3, 4, 5, 4, 2, 6, 8,6]

//Array.flatMap() : This method works like the combination of map() and flat() method. Its like first calling map() method and after the calling flat() method at the same point.
arrResult = array5.flatMap(item=>(item+2)) //returns: [ 3, 4, 5, '3,4,5,4,22', '6,8,62' ]

console.log(arrResult)
