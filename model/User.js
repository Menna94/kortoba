const db = require('../configs/db');

module.exports = class User{
    constructor(id, name, email, password, role){
        this.id = id;
        this.name =name ;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    save(){
        return db.execute(`
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)`,
            [ this.name, this.email, this.password, this.role ]
        );

    }

    static fetchAll(){
        return db.execute(`SELECT * FROM users`);
    }

    static findById(id){
        return db.execute(`SELECT * FROM users WHERE uid = ?`, [id])
    }

    static delUser(id){
        return db.execute(`DELETE FROM users WHERE uid = ?`, [id])
    }

    static updateUser(id, data){
        console.log(data);
        return db.execute(`
                        UPDATE 
                            users 
                        SET 
                            name= COALESCE(${data.name}, name), 
                            email= ISNULL(${data.email}, email),
                            password= COALESCE(${data.password}, password),
                            role= COALESCE(${data.role}, role)
                        WHERE
                            uid = ${id}
                        `);
    }
}