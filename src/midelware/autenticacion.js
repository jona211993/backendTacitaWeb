

export const verifyUser = (req, res ,next)=>{
    const token = req.cookies.token;
    console.log("en el verifyUser tengo : ", token)
    if(!token){
        return res.json({Message: "Nosotros necesitamos el token please, proveelo"})
    }
    else{
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if(err){
                return res.json({Message: "Error de autenticación"})
            } else{
                req.name = decoded.name;
                next();
            }
        })
    }


}