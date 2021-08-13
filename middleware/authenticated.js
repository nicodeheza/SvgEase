

export default function authenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({message:'inicia sesión para realizar esta acción'});
    }
}