// const asyncHandler = (fn) = async(req, res, next) =>{
//     try{
//         fn(req, res,next)
//     }
//     catch(err){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

const asyncHandler = (requestHandler)=>(req, res, next)=>{
    (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>{
            next(err)
        })
    }
}

export  {asyncHandler}