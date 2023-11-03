import mongoose from "mongoose";

export const init = async () => {
    try {
        const URI = 'mongodb+srv://fllopez2208:Olivia2023@cluster0.445wowt.mongodb.net/products';
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
       console.log('Ha ocurrido un error al intentar conectarnos a la DB', error.message); 
    }
    
};
