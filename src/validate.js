const mailformat =/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

export function validateEmail(email) {
    let error = ""
    if(!email) {
        error = "Required"
    }

    if(email &&  !email.match(mailformat)) {
        error = "Wrong email format"
    }
    return error
}

export function minLength(value, length) {
    let error = ""
    if(!value) {
        error = "Required"
    }

    if(value && value.length < length) {
        error = `Must be at least ${length} characters long`
    }

    return error
}

export function required(value) {
    let error = ""
    if(!value) {
        error = "Required"
    }

    return error
}