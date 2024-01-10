const str = "my random string"

let result = undefined
//returns how many character in the string.
result = str.length

//reading the each character of string:
result = str[0] // returns first character
result = str[str.length-1]// returns last character 

// charAt() also works as a same way like []
result = str.charAt(5)

// indexOf(): this method takes the word or string as a paramater and returns the postion of the first available string
const str1 = "The is one or many word in one sentence"
result = str1.indexOf('one')
// more over the start position of search can be defined
result = str1.indexOf('one', 10)

// lastIndexOf(): this method takes the word or string as a paramater and returns the postion of the available string but this start search from the last i.e right side
// more over the start position of search can be defined
result = str1.lastIndexOf('one')
result = str1.lastIndexOf('one', 20)
// NOTE : Both indexOf() and lastIndexOf() returns -1 if no word in found
// NOTE : If no paramater is provided it takes undefined as paramater and search for word 'undefined'

// String.slice(indexStart) || String.slice(indexStart, indexEnd)
result = str1.slice(5) //provides all strings after position index 5
result = str1.slice(5,9) //provides only those strings that are between position 5 and 0 
result = str.slice(-7)

// String.substring(indexStart) || String.slice(indexStart, indexEnd)
result = str1.substring(5) // work same as str.slice()
result = str1.substring(5,9) // work same as str.slice()
result = str1.substring(-7) //NOTE : Work differently here as it donot accept negative indexing and provide whole string when negative indexing provided

// string.split() : Returns a array without modifying the original string
result = str1.split('e') //takes an argument on what character the string need to be splited
result = str1.split(' ')
result = str1.split('')
result = str1.split('e' , 2) //It will stop after first 2 split operation


//string.includes() : is use to check for string in another set of string
result = str1.includes('word') // returns true of false
result = str1.includes('on', 15) // second paramater can be used to start of the search index


// string.startsWith(searchString) : checks if the string starts with the search string paramater
result = str1.startsWith('The') // NOTE : It is case sensitive

// string.endsWith(searchString) : checks if the string ends with the search string paramater
result = str1.endsWith('sentence') // NOTE : It is case sensitive

// string.concat(string value) : add two string value and return new value
result = str1.concat(' new string ')
result = str1.concat(' new string ', " another new string")
result = str1.concat(' new string ', " another new string", ' more another string')

// NOTE: Assignment operator are more performance effieient then concat string.

// string.repeat() : repeat the same string as much time the paramater integer is given
result = str1.repeat(2)

//string.trim()
const str2 = '   hello    '
result = str2.trimStart() //trims white space in the start
result = str2.trimEnd()//trims white space in the end
result = str.trim()//trims white space in the start and end

// string.padStart: adds characters to the string
const str4 = 'hello'
result = str4.padStart(10) // In total it will create as new string of 10 character with 5 spaces in start
result = str4.padStart(10, 'abc') // In total it will create as new string of 10 character with including second paramater

// string.padEnd(): adds characters to the string
result = str4.padEnd(10) // In total it will create as new string of 10 character with 5 spaces in end
result = str4.padEnd(10, 'abc') // In total it will create as new string of 10 character with including second paramater


// string.localeCompare(): Compares two strings, provides negative value where refrence string occurs before compare string
result = 'a'.localeCompare('b') //Provides negative value 
result = 'b'.localeCompare("a") //Provides positive value
result = 'a'.localeCompare('a') //Provide zero value    
// NOTE : It takes second paramator, if no paramater passed it takes browser default language. 
result = 'a'.localeCompare('a', 'de')

//string.search(regexp) : It helps to search string in the provided strings and accepts regexp as paramater. It returns the indes value in the string set.
result = str2.search('he')
result = str2.search(/he/)
result = str2.search(/he/i) //search for both upper case and lower case

//string.match(regex) : It works like a search method but returns an array instead of index value
const str5 = 'abcd main GAIN  plain abc def'
result = str5.match('ain') // returns a list of object with all information like searched value, found index position, input string provided and group
result = str5.match(/ain/g) // returns the lists of all matches
result = str5.match(/ain/gi) // returns the lists of all matches with case insensitive

//string.matchAll() : Check for the match throughout the string and returns a iterator object with all information as string.match() does
result = str5.matchAll('ain')
result = [...result] //destructuring the iterator
result = str5.matchAll(/ain/gi)
result = [...result] //destructuring the iterator


console.log(result)

