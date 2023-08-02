import Validator, { ValidationSchema } from 'fastest-validator'

const verifyApiRequest = async (body: any, schema: ValidationSchema) =>
{
    const v = new Validator()
    const check = v.compile(schema)
    const validationResponse = check(body)
    return validationResponse === true
}

export default verifyApiRequest