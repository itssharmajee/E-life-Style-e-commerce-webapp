import mongoose from "mongoose";

export async function mongoConnection(URL){
    return await mongoose.connect(URL).then(()=>{
        console.log("mongoDB connected successfully");
    }).catch((err) => {
            console.log(`there might be internet issue or internal issue`,err);
    });
}

