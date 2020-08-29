const Product = require( '../models/Product' );

const getAllProductIds = async () => {

  const products = await Product.find();

    return products.map( product => {
        return {
          params: {
            id: product._id
          }
        }
      })
};

const getProductById = async ( id ) => {
  
  const product = await Product.findById( id );

  return product;
};

module.exports = {
    getAllProductIds,
    getProductById
};