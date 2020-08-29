const Product = require( '../models/Product' );

const addProduct = async ( parent, args ) => {

    try {

        const { name, description, price, quantity, images } = args;

        // see if user exists
        let product = await Product.findOne( { name } );


        if( product ) {
            
            return {
                status: 'error',
                msg: `${ name } already exists, try updating product`,
                ...product
            };
        }

         if( !product ) {

            const _images = images.split( ', ' );

             // create new product instance
             product = new Product( {
                 name,
                 description,
                 price,
                 quantity,
                 images: _images
             } );
         }
        

        await product.save();

        return {
            status: 'success',
            msg: 'Product has been added to cart',
            name: product.name,
            images: product.images
        }

        
    } catch( err ) {
        console.log( err.message );
        return {
            msg: err.message,
            status: 'error'
        };
    }   
};

module.exports = {
    addProduct
};