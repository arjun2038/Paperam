var db = require('../config/connection')
var collection = require('../config/collection')
module.exports = {
    doCustomerCreate: (customerData) => {
        db.get().collection(collection.CUSTOMER_COLLECTION).insertOne(customerData)
    },
    doCustomerDisplay: () => {
        return new Promise(async(resolve, reject) => {
            products =await db.get().collection(collection.CUSTOMER_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}