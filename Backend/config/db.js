import mongoose from 'mongoose'

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Database connected : ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}
export default connectDB