import mongoose from "mongoose";
const URI = 'mongodb+srv://fllopez2208:Olivia2023@cluster0.445wowt.mongodb.net/ecommerce';


export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
       console.log('Ha ocurrido un error al intentar conectarnos a la DB', error.message); 
    }
    
};
