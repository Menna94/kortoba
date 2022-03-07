const User = require('../model/User');


exports.getUsers = (req, res, next) => {
    User
        .fetchAll()
        .then(([rows, fieldData]) => {
            if (!rows) {
                return res.status(404).send({
                    success: false,
                    message: 'No Users Were Found!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'Users Fetched Successfully',
                count: rows.length,
                data: rows
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Fetching Users!',
                data: err.message
            })
        })
}



exports.getUser = (req, res, next) => {
    const userId = req.params.id;

    User
        .findById(userId)
        .then(([row, fieldData]) => {
            if (!row) {
                return res.status(404).send({
                    success: false,
                    message: 'No Users Were Found!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'User Fetched Successfully',
                data: row
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Fetching User!',
                data: err.message
            })
        })
}



exports.delUser = async(req, res, next) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if(!user[0]){
        return res.status(404).send({
            success: false,
            message: 'There Is No User Whith The Provided ID!',
            data: null
        })
    }

    User
        .delUser(userId)
        .then(([row, fieldData]) => {
            if (!row) {
                return res.status(400).send({
                    success: false,
                    message: 'No Users Were DELETED!',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'User Deleted Successfully',
                data: row
            })
        })
        .catch(err => {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error While Deleting User!',
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