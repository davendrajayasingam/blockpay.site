export function isValidEmail(email: string)
{
    return email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
}

export function isValidPassword(password: string)
{
    // https://www.w3resource.com/javascript/form/password-validation.php
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,./?~])(?!.*\s).{8,}$/.test(password)
}