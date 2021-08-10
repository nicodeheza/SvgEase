

export default  function adminAuth (req, res, next){
    if(req.isAuthenticated()){
        if(req.user.admin){
            next();
        }else{
            res.json({message: 'usuario no autorizado'});
        }
    }else{
        res.json({message: 'debes estar logeado como administrador para realizar esta acción'});
    }
}