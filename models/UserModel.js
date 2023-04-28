const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (_db) => {
    db = _db;
    return UserModel;
}


class UserModel {
    // récupération de tous les utilisateurs
    static getAllUsers() {
        return db.query('SELECT * FROM Users')
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })
    }


    // récupération d'un utilisateur par son id
    static getOneUser(id) {
        return db.query('SELECT * FROM Users WHERE id = ?', [id])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

    // récupération d'un utilisateur par son email
    static getUserByMail(email) {
        // console.log(' email :', db.escape(email));
        // console.log(' sans escape email :', email);
        const emailUser = db.escape(email).replace(/'/g, "");
        console.log(emailUser);

        return db.query('SELECT * FROM Users WHERE email = ?', [emailUser])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

    // sauvegarde d'un utilisateur
    static async saveOneUser(req) {
        // console.log(req);
        const userFirstname = db.escape(req.body.firstName).replace(/'/g, "");
        console.log(userFirstname);
        const userLastname = db.escape(req.body.lastName).replace(/'/g, "");
        console.log(userLastname);
        const userEmail = db.escape(req.body.email).replace(/'/g, "");
        console.log(userEmail);
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        return db.query('INSERT INTO Users (firstName, lastName, email, hashPassword, role, creation_times_tamp) VALUES(?,?,?,?,"user", NOW())', [userFirstname, userLastname, userEmail, hash])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })
    }
    // SELECT `role` FROM Users WHERE `id` = 97
    // recupération role user table
    static getRoleUser(userId) {
        return db.query('SELECT role FROM Users WHERE id = ?', [db.escape(userId)])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

}
