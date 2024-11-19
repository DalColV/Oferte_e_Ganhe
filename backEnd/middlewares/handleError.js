export const errorHandler = (err, req, res, next) =>{
    console.error(err.stack);

    if(err.statusCode){
        return res.status(err.statusCode).json({message: "Internal Error!"});
    }
}