const FormSubmit = (path, payload, isFile=false, method='POST', cookie=false) => {
    const options = {
        method : method
    }

    if(isFile){
        options.body = payload
    }
    else{
        options.headers = {
                    'Content-Type': 'application/json'
                }
        options.body = JSON.stringify(payload)
    }

    if (cookie) {
    options.credentials = 'include'
  }
  
    return (
        fetch(path,options)
    )
}

export default FormSubmit