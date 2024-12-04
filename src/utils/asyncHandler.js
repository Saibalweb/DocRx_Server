const asyncHandler = func => async (req,res,next)=>{
    try {
        return await func(req,res,next);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message:error.message,
            success:false,
            statusCode:error.statusCode||500
        })
    }
}
export {asyncHandler};