class ApiError extends Error{
    constructor(message="Something Went Wrong", status,errors=[],stack=""){
        super(message)
        this.status = status
        this.data = null
        this.errors = errors
        this.message=message
        this.success=false

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this, this.constructor); 
        }
    }
}

export {ApiError}