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
  },
  delete: async function(req, res) {
    try {
      const agencyId = req.params.id; // Récupérer l'ID de l'agence à supprimer depuis les paramètres de la requête
      // Utiliser une requête SQL DELETE pour supprimer l'agence avec l'ID spécifié
      await client.query('DELETE FROM agency WHERE id = $1', [agencyId]);
      // Rediriger l'utilisateur vers la liste des agences après la suppression
      res.redirect('/list');
    } catch (error) {
      console.error(error);
      res.status(500).render('error');
    },
  update: async function(req, res) {
    try {
      const agencyId = req.params.id; // Récupérer l'ID de l'agence à mettre à jour depuis les paramètres de la requête
      const newData = req.body; // Récupérer les nouvelles données de l'agence depuis le corps de la requête

      // Utiliser une requête SQL UPDATE pour mettre à jour l'agence avec les nouvelles données
      const updateQuery = `
        UPDATE agency
        SET email = $1, address = $2, phone_number = $3
        WHERE id = $4;
      `;

      await client.query(updateQuery, [
        newData.email,
        newData.address,
        newData.phone_number,
        agencyId
      ]);

      // Rediriger l'utilisateur vers la liste des agences après la mise à jour
      res.redirect('/list');
    } catch (error) {
      console.error(error);
      res.status(500).render('error');
    }
  },

};

export default agencyController;
