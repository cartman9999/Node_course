
sendEmailToCustomer()

async function sendEmailToCustomer() {
    try {
        const customer = await getCustomer(1)
        console.log(customer)
        const topMovies = await getTopMovies()
        console.log(topMovies)
        const email = await sendEmail(customer.email, topMovies)
        console.log(email)
    } catch (err) {
        console.error(err)
    }

}

async function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'test@email.com' 
            });
          }, 4000); 
    })
}
  
async function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    })
}
  
async function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Email sent to ${email}`);
          }, 4000);
    })
}