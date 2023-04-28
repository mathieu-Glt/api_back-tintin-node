module.exports = (_db) => {
    db = _db;
    return CharacterModel;
}

class CharacterModel {

    // récupération de tous les personnages de  Tintin
    static getAllCharacters() {
        return db.query('SELECT * FROM Series')
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })
    }

    // récupération d'un personnage par son nom
    static getCharacterByName(name) {
        return db.query('SELECT * FROM Series WHERE nom = ' + db.escape(name))
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

    // récupération d'un personnage par son slug
    static getCharacterBySlug(slug) {
        // return db.query('SELECT * FROM Series WHERE slug = ?', [slug])
        return db.query('SELECT * FROM Series WHERE slug = ' + db.escape(slug))
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }


    // récupération d'un personnage par son id
    static getOneCharacter(id) {
        return db.query('SELECT * FROM Series WHERE id = ' + db.escape(id))
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

    // sauvegarde d'un personnage Tintin
    static saveOneCharacter(req) {
        const nomPerso = db.escape(req.body.nom).replace(/'/g, "");
        const prenomPerso = db.escape(req.body.prenom).replace(/'/g, "");
        const imagePerso = db.escape(req.body.picture).replace(/'/g, "");
        const professionPerso = db.escape(req.body.profession).replace(/'/g, "");
        const personnagePerso = db.escape(req.body.personnage).replace(/'/g, "");
        const personnageSuitePerso = db.escape(req.body.personnage_suite).replace(/'/g, "");
        const slugPerso = db.escape(req.body.slug).replace(/'/g, "");
        return db.query('INSERT INTO Series (nom, prenom, picture, profession, personnage, personnage_suite, slug, creation_times_tamp) VALUES (?,?,?,?,?,?,?, NOW())', [nomPerso, prenomPerso, imagePerso, professionPerso, personnagePerso, personnageSuitePerso, slugPerso])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })
    }


    // modification d'un personnage
    static updateOneCharacter(req, id) {
        const nomPerso = db.escape(req.body.nom).replace(/'/g, "");
        const prenomPerso = db.escape(req.body.prenom).replace(/'/g, "");
        const personnagePerso = db.escape(req.body.personnage).replace(/'/g, "");
        const personnageSuitePerso = db.escape(req.body.personnage_suite).replace(/'/g, "");

        return db.query('UPDATE Series SET nom=?, prenom=?, personnage=?, personnage_suite=? WHERE id = ?', [nomPerso, prenomPerso, personnagePerso, personnageSuitePerso, db.escape(id)])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }

    //suppression d'un personnage
    static deleteOneCharacter(id) {
        return db.query('DELETE FROM Series WHERE id = ?', [id])
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            })

    }







}