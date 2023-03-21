module.exports= function(req,res,next){
    //401 Unauthorized
    //403 Forbidden
    if(!req.organiser.isAdmin) return res.status(403).send('Access Denied..')
    next()
}