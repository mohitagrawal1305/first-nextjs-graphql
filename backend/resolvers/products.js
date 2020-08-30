const Product = require( '../models/Product' );

const database = require( '../databaseConnection' );


const getAllProductIds = async () => {

  await database();

  const products = await Product.find();

  return products.map( product => {
      return {
        params: {
          id: product.id
        }
      }
    })
};

const getProductById = async ( id ) => {

  await database();
  
  const product = await Product.findById( id );

  return {
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    likes: product.likes,
    comments: product.comments,
    images: product.images
  };
};

module.exports = {
    getAllProductIds,
    getProductById
};