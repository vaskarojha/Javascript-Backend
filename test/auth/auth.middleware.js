import Jwt from  "jsonwebtoken"


export const auth = (req, res, next)=>{
    console.log(req.cookies)
    // const mytoken = req.cookies.token
    const {token} = req.cookies
    if(!token){
        res.status(401).send("Login in first!1")
    }
    const decodedJwt = Jwt.verify(token, "mySecretKey")
    console.log(decodedJwt)
    req.user = decodedJwt
    
    return next()
}