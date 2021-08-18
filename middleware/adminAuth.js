

export default  function adminAuth (req, res, next){
    if(req.isAuthenticated()){
        if(req.user.admin){
            next();
        }else{
            res.status(401).json({message: 'usuario no autorizado'});
        }
    }else{
        res.status(401).json({message: 'debes estar logeado como administrador para realizar esta acción'});
    }
}