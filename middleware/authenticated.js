

export default function authenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({message:'inicia sesión para realizar esta acción'});
    }
}