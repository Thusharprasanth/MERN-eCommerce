const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode===200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_DEV==='production'? null : err.stack
    })
}

const notFound = (req,res,next)=>{
    const error = new Error('Page not found')
    res.status(404)
    next(error)
}

export  {
    errorHandler,
    notFound
}