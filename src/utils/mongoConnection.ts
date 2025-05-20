import mongoose from 'mongoose'
import { config } from './config'

const mongoConnection = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongoPath)
        .then(() => {
            resolve(null)
        })
        .catch(error => reject(error))
    })
}

export {mongoConnection}
