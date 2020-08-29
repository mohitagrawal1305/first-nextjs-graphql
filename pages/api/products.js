const Product = require( '../../backend/models/Product' );


export default async (req, res) => {
    
    const products = await Product.find();
  
    res.end( products )
}