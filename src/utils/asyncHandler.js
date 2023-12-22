const asyncHandler = (fn) => async(req, res, next) =>{
    try{
        return fn(req, res,next)
    }
    catch(err){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

// const asyncHandler = (requestHandler)=>(req, res, next)=>{
//     return (req, res, next)=>{
//         Promise.resolve(requestHandler(req, res, next)).catch((err)=>{
//             next(err)
//         })
//     }
// }

export  {asyncHandler}