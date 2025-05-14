import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
   api_key: process.env.CLOUDINARY_API_KEY ,
   api_secret: process.env.CLOUDINARY_API_SECRET ,
    timeout: 20000,
    });

    let uploadImage = async (filePath,folderName)=>{


      try {
        let result = await cloudinary.uploader.upload(filePath,{
            folder: folderName
         })
         try {
            fs.unlinkSync(filePath)
         } catch (error) {
            console.log('Error while remove image from server',error)
         }
         // console.log(result)
         return result
      } catch (error) {
          try {
            fs.unlinkSync(filePath)
         } catch (error) {
            console.log('Error while remove image from server',error)
         }y
         console.log('error while upload image',error)
         return
      }
    }

    let deleteImageFromCloudinary = async(publicId)=>{
      try {
         let result = await cloudinary.uploader.destroy(publicId)
        return result
      } catch (error) {
         console.log('Error while delete from cloudinary',error)

      
      }
   }

export {uploadImage,deleteImageFromCloudinary}