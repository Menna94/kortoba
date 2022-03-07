const db = require('../configs/db');

module.exports = class Product{
    constructor(id, title, price, shortDescription, rating, imgURL, user){
        this.id = id;
        this.title =title ;
        this.price = price;
        this.shortDescription = shortDescription;
        this.rating = rating;
        this.imgURL = imgURL;
        this.user= user;
    }

    save(){
        return db.execute(`
            INSERT INTO products (title, price, shortDescription, rating, imgURL, user)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [ this.title, this.price, this.shortDescription, this.rating, this.imgURL,this.user ]
        );

    }

    static fetchAll(){
        return db.execute(`SELECT * FROM products`);
    }

    static findById(id){
        return db.execute(`SELECT * FROM products WHERE id = ?`, [id])
    }

    static delProduct(id){
        return db.execute(`DELETE FROM products WHERE id = ?`, [id])
    }

    static updateProduct(id, data){
        console.log(data);
        return db.execute(`
                        UPDATE 
                            products 
                        SET 
                            title= COALESCE(${data.title}, title), 
                            price= ISNULL(${data.price}, price),
                            shortDescription= COALESCE(${data.shortDescription}, shortDescription),
                            rating= COALESCE(${data.rating}, rating),
                            imgURL= COALESCE(${data.imgURL}, imgURL)
                        WHERE
                            id = ${id}
                        `);
    }
}