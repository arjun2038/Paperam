var db = require('../config/connection')
var collection = require('../config/collection')
var objectId=require('mongodb').ObjectID
module.exports = {
    doProductCreate: (productData) => {
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(productData)
    },
    doProductDisplay: () => {
        return new Promise(async(resolve, reject) => {
            products =await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(productId)}).then(()=>{resolve()})
        })
    }
}