import { ValidationSchema } from 'fastest-validator'

const schema: ValidationSchema = {
    $$strict: 'remove',
    subject: 'string|min:1|trim:true',
    message: 'string|min:1|trim:true',
    invoiceCode: 'string|optional'
}

export default schema