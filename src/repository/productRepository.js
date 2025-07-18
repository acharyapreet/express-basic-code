const productSchema = require('../schema/productSchema')
const BadRequestError = require('../utilities/badRequestError')
const InternalServerError = require('../utilities/internalServerError')
async function createProduct(productDetails){
    try {
        const response = await productSchema.create(productDetails)
        return response
    } catch (error) {
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError()

        // console.log('problem at product repository',error)
    }
}

async function findId(id) {
    try{
        const product = await productSchema.findById(id)
        return product
    }catch(error){
        console.log('problem at product repository',error)
        throw new InternalServerError()
    }
}
async function deleteId(id) {
    try{
        const response = await productSchema.findByIdAndDelete(id)
        return response
    }catch(error){
        console.log('problem at product repository',error)
    }
}

module.exports = {
    createProduct,
    findId,
    deleteId
}