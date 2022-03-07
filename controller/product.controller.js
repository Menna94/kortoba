const Product = require('../model/Product');


exports.addProduct = (req, res, next) => {
    const {
        title, price, shortDescription, rating, imgURL, user
    } = req.body;

    const product = new Product(
        null, title, price, shortDescription, rating, imgURL, user
    );

    product
        .save()
        .then(() => {
            if (!product) {
                return res.status(400).send({
                    success: false,
                    message: 'Something Went Wrong While Creating A Product!',
                    data: null
                })
            }
            res.status(201).send({
                success: false,
                message: 'Product Created Successfully',
                data: product
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Creating A Product!',
                data: err.message
            })
        })
}


exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(([rows, fieldData]) => {
            if (!rows) {
                return res.status(404).send({
                    success: false,
                    message: 'No Products Were Found!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'Products Fetched Successfully',
                count: rows.length,
                data: rows
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Fetching Products!',
                data: err.message
            })
        })
}



exports.getAProduct = (req, res, next) => {
    const productId = req.params.id;

    Product
        .findById(productId)
        .then(([row, fieldData]) => {
            if (!row) {
                return res.status(404).send({
                    success: false,
                    message: 'No Products Were Found!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'Product Fetched Successfully',
                data: row
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Fetching Product!',
                data: err.message
            })
        })
}



exports.delAProduct = async(req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(!product[0]){
        return res.status(404).send({
            success: false,
            message: 'There Is No Product Whith The Provided ID!',
            data: null
        })
    }

    Product
        .delProduct(productId)
        .then(([row, fieldData]) => {
            if (!row) {
                return res.status(400).send({
                    success: false,
                    message: 'No Products Were DELETED!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'Product Deleted Successfully',
                data: row
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Deleting A Product!',
                data: err.message
            })
        })
}



exports.updateAProduct = async(req, res, next) => {
    const productId = req.params.id;
    const {
        title , 
        price, 
        shortDescription,
        rating, 
        imgURL, 
        user
    } = req.body;
    Product
        .findById(productId)
        .then(([product, fieldData])=>{
            const data ={
                title: title? title : null,
                price: price? price: null,
                shortDescription: shortDescription? shortDescription: null,
                rating: rating?rating: null,
                imgURL: imgURL ?imgURL: null,
            }
            // product.title = title;
            // product.price = price;
            // product.shortDescription = shortDescription;
            // product.rating = rating;
            // product.imgURL = imgURL;
            // product.user = user;

            return Product.updateProduct(productId, data)
            // return product.save();
        })
        .then(res=>{
            console.log(res);
            // res.status(200).send({
            //     success: true,
            //     message: 'Product Updated Successfully',
            //     data: res
            // })
        })
        .catch(err=>{
            return res.status(404).send({
                success: false,
                message: 'There Is No Product Whith The Provided ID!',
                data: err.message
            })
        })

}