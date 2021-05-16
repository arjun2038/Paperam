let userHelper=require('../config/connection')
let collection=require('../config/collection')
let bcrypt=require('bcrypt')
module.exports={
    doSignUp:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            userData.password=await bcrypt.hash(userData.password,10)
            hash=await userHelper.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(hash){
                response.reason='Email already exist,Go to login or create account with another Email '
                response.status=true
                resolve(response)
            }
            else{
                userHelper.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                    resolve(response)
                })
            }
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            console.log(userData)
            hash=await userHelper.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(hash){
               await bcrypt.compare(userData.password,hash.password).then((status)=>{
                    if(status){
                        console.log('loggedin')
                        response.status=true;
                        response.user=hash
                        resolve(response)
                    }
                    else{
                        console.log('password invAlid')
                        response.status=false;
                        response.reason='Invalid Password'
                        resolve(response)
                    }
                })
                
            }else{
                console.log('user not exist')
                response.status=false
                response.reason='User doesnot exist,Create a new account'
                resolve(response)
            }
        })
    }
}