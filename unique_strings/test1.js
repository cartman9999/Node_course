function odd_even_product(my_list) {
    let product=1
    for (const number of my_list) {
        product *= number
    }

    if (product % 2 == 0) {
        let sum=0
        for (const num of my_list) {
            sum +=  num
        }

        return sum
    }

    return 0
}

// const values = [1,2,3,4] 
const values = [5,7,9]

console.log(odd_even_product(values))