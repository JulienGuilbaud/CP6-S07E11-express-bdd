import client from "../database.js";
import Agency from "../models/Agency.js";


const agencyController = {

  list: async function(req, res) {
    try {
      const result = await client.query('SELECT * FROM agency ORDER BY address;');
      res.render('list', {
        agencies: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error');
    }
  },

  detail: async function(req, res, next) {
    try {
      const result = await client.query('SELECT * FROM agency WHERE id=$1', [req.params.id]);
      if (result.rowCount > 0) {
        res.render('detail', {
          agency: result.rows[0],
        });
      }
      else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).render('error');
    }
  },

  add: function(req, res) {
    try {
      // ça c'est bien pour créer un objet et potentiellement valider toutes les informations qu'il contient à l'aide des validateurs dans nos setters
      const agency = new Agency(req.query);
      // mais il faut ensuite enregistrer cet objet en bdd si on veut le retrouver plus tard
      agency.create();
      // quand c'est fait je retourne voir ma liste
      res.redirect('/');
    } catch(error) {
      // prevoir un cas d'erreur
    }
  }

};

export default agencyController;