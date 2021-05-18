var db = require('../config/connection')
var collection = require('../config/collection')
var ObjectId=require('mongodb').ObjectID
const { response } = require('express')
module.exports = {
    doCustomerCreate: (customerData) => {
        db.get().collection(collection.CUSTOMER_COLLECTION).insertOne(customerData)
    },
    doCustomerDisplay: () => {
        return new Promise(async(resolve, reject) => {
            products =await db.get().collection(collection.CUSTOMER_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    doDeleteCustomer:(customerId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CUSTOMER_COLLECTION).removeOne({_id:ObjectId(customerId)}).then(()=>{resolve()})
        })
    },
    doEditCustomer:(custId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CUSTOMER_COLLECTION).findOne({_id:ObjectId(custId)}).then((response)=>{resolve(response)})
        })
    }
}