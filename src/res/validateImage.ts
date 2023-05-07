const validateImage = (file:File|FileList) => {
    const acceptedExt = ['png', 'jpeg', 'jpg', 'gif', 'svg']
    const checker = []

    let isFile = false
    let isAboveSize = false
    let isNotExt = false

    if(file instanceof FileList ){

    }else{
        if(!file){
            checker.push(isFile)
        }
        
        if(file.size >= 2000000){
            checker.push(isAboveSize)
        }
        
        if(!acceptedExt.includes(file.name?.split('.')[1])){
            checker.push(isNotExt)
        }
    }

   

    const results = checker.includes(false)
    return !results
}

export default validateImage