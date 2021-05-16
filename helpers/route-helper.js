var db = require('../config/connection')
var collection = require('../config/collection')
const { Db } = require('mongodb')
module.exports = {
    doRouteCreate: (routeData) => {
        db.get().collection(collection.ROUTE_COLLECTION).insertOne(routeData)
    },
    doRouteDisplay: () => {
        return new Promise(async(resolve, reject) => {
            products =await db.get().collection(collection.ROUTE_COLLECTION).find().toArray()
            resolve(products)
        })
    }
}