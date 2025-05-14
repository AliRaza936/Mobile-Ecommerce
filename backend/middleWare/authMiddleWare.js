import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) => {

   
   
       const token = req.cookies?.authToken;
    
   
     
       if (!token) {
           return res.status(401).json({ message: "Not Authorized! Please Login First" });
       }
   
       try {
           const decoded = jwt.verify(token, process.env.SECRET_KEY);
           req.user = decoded; // Attach user ID to request
           // console.log(decoded)
           next();
       } catch (error) {
     
           res.status(401).json({ message: "Please Try Again" });
       }
};

let isAdmin = async(req,res,next)=>{
    try {
     let user = req.user
     if(!user || user.role !== 'admin'){
        return res.status(401).send({success:false,message:"You are not authorized to access this resource"})
       

     }
     next()
    } catch (error) {
        return res.status(401).send({success:false,message:"Server Error.Try Again"})
    }   
}
export  {authMiddleware,isAdmin}
