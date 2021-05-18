var db = require('../config/connection')
var collection = require('../config/collection')
var ObjectId=require('mongodb').ObjectID
const { response } = require('express')
module.exports = {
    doRouteCreate: (routeData) => {
        db.get().collection(collection.ROUTE_COLLECTION).insertOne(routeData)
    },
    doRouteDisplay: () => {
        return new Promise(async(resolve, reject) => {
            products =await db.get().collection(collection.ROUTE_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    doDeleteRoute:(routeId)=>{
        return new Promise((resolve)=>{
            db.get().collection(collection.ROUTE_COLLECTION).removeOne({_id:ObjectId(routeId)}).then(()=>{resolve()})
        })
    },
    doEditRoute:(routeId)=>
    {
        return new Promise((resolve)=>{
            db.get().collection(collection.ROUTE_COLLECTION).findOne({_id:ObjectId(routeId)}).then((response)=>{resolve(response)})
        })
    },
    doUpdateRoute:(routeId,changes)=>{
        db.get().collection(collection.ROUTE_COLLECTION).updateOne({_id:ObjectId(routeId)},{
            $set:{
            routename:changes.routename,
            distributername:changes.distributername,
            distributernumber:changes.distributernumber
        }})
    }
}