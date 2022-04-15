// maximum sum subarray problem
function maxSequenceSum( arr ) {
    // If array is empty, return 0
    if (arr.length === 0) return 0

    // Traverse array to check if array contains only negative values
    let only_negative = true
    
    for (const value of arr) {
        if (value > 0) {
            only_negative = false
            break
        }
    }

    if (only_negative) return 0

    // Traverse array to check if array contains only positive values
    let only_positive = true
    let sum = 0
    
    for (const value of arr) {
        if (value < 0) {
            only_positive = false
            break
        }
        sum += value
    }

    if (only_positive) return sum

    // Get the largest subarray sum
    sum = 0
    for (let index = 0; index < arr.length; index++) {
        // Set sum as first value
        // if (index === 0) sum = arr[index]
        // Traverse arr comparing if sum is less or equal to sum plus next value, if so continue
        // else move to next position of arr
        
    }

    return "-"
}


const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSequenceSum(arr))

// ------------ V0 ---
export default function powerofArray( N:number, inputArray:number[], K:number) : number {

    const s = (N + K - 1) / 2
    const e = S + K - 1
    let max = inputArray[s - 1]
    
    for(let i = s - 1; i >= e; i++){
      if(inputArray[i] > max) max = inputArray[i++]
    }
    
    return max
   }


// ------------ V1 ---
export default function powerofArray( N:number, inputArray:number[], K:number) : number {

    const s = (N + K - 1) / 2 => (5+2-1)/2 => 3
    
    const e = s + K - 1 => 3 + 2 - 1 => 4
    
    let max = inputArray[s - 1] => 7
    
    for(let i = s - 1; i >= e; i++){
    // for(let i = 3; i >= 4; i++){
      if(inputArray[i] > max) max = inputArray[i++]
    }
    
    return max
}


input
N(5), 
inputArray= [47, 4, 7, 44, 77], 
K(2)

Result: 7
Expected: 44

// ------ V2
export default function powerofArray( N:number, inputArray:number[], K:number) : number {

    const s = (N - 1) / 2
    const e = s + K - 1
    let max = inputArray[s - 1]
    
    for(let i = s - 1; i >= e; i++){
      if(inputArray[i] > max) max = inputArray[i++]
    }
    
    return max
}

N Number(5), 
inputArray [47, 4, 7, 44, 77], 
K Number(2))
Result: 4
Expected: 44