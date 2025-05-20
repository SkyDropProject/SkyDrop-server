import { functionsMongoType } from "../types/mongo"

const functionsMongo:functionsMongoType = {}

functionsMongo.insert = async (collection:any, object:object) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let obj = await collection.insertOne(object)
            resolve(obj)
        }catch(err){
            reject(err)
        }
    })
}
 
functionsMongo.update = async (collection:any, _id:string|null, object:object) =>{
    return new Promise((resolve, reject) => {
        collection.findOne({_id:_id}).then((obj:any) => {
            collection.updateOne({_id:obj._id}, object).then((obj:object) =>{
                resolve({...object, _id:_id})
                return
            }).catch((err:any) => {
                reject(err)
                return
            })
        }).catch((err:any) => {
            reject(err)
            return
        })
    })
}
    
functionsMongo.delete = async (collection:any, _id:string|null) =>{
    return new Promise((resolve, reject) => {
        collection.findOne({_id:_id}).then((obj:object) => {
            collection.deleteOne({_id:_id}).then(() =>{
                resolve({})
                return
            }).catch((err:any) => {
                reject(err)
                return
            })
        }).catch((err:any) => {
            reject(err)
            return
        })
    })
}

functionsMongo.deleteMany = async (collection:any, ids:Array<string|null>) =>{
    return new Promise((resolve, reject) => {
        collection.deleteMany({_id:{$in:ids}}, (err:any) =>{
            if(err) reject(err)
            else resolve(null)
            return
        })
    })
}
    
functionsMongo.find = async (collection:any, object:object, populate:string|null = null, sortObject:string|null = null) =>{
    return new Promise((resolve, reject) => {
        collection.find(object).lean().sort(sortObject).populate(populate).then((objs:Array<object>) =>{ 
            resolve(objs)
            return
        }).catch((err:any) =>{
            reject(err)
        })
    })
}
    
functionsMongo.findOne = async (collection:any, object:object, populate:string|null = null) =>{
    return new Promise((resolve, reject) => {
        collection.findOne(object).lean().populate(populate).then((obj:object) =>{ 
            resolve(obj)
            return
        }).catch((err:any) =>{
            reject(err)
        })
    })
}

export {functionsMongo}