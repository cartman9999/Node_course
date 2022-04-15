// 6,194,783 unique codes
// Following this pattern: 
// 12 characters in total
// begiing with letter "N"
// 11 following digits

const crypto = require("crypto")
const fs = require("fs")

/**
 * Randomly create codes
 * 
 * @param none
 * @return String code
 */
function createCode() {
    // Create random bytes
    let code = crypto.randomBytes(5)

    // parse buffer into hex and then to decimal
    code = parseInt(code.toString('hex'), 16)

    // return length 11 digits string
    return 'N' + code.toString().substring(0,11)
}

/**
 * Create file with codes
 * 
 * @param String writeName 
 * @param String line 
 * @return File
 */
async function addCodeToFile(writeName, codes) {
    // Creates the file
    // 'a' means appending (old data will be preserved)
    const newFile = fs.createWriteStream(writeName, { flags: 'a' })

    // Insert code into file
    for await (const code of codes) {
        // newFile.write(`${code}\n`)
        newFile.write(`INSERT IGNORE INTO codes(id, code) VALUES (NULL, '${code}');
`)
    }
    newFile.end()
}


/**
 * Create codes and insert them into a file
 * 
 * @param Int quantity 
 * @return File
 */
async function printCodes(quantity, writeName) {
    // Insert codes into array
    let codes = []

    for (let index = 0; index < quantity; index++) {
       codes.push(createCode())
    }

    // Write codes in file
    await addCodeToFile(writeName, codes)
    
    console.log("Done")
}

printCodes(800_000, "rep_dom_codes_final_v2.sql")
