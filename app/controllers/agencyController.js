import client from "../database.js";
import Agency from "../models/Agency.js";

const AgencyController = {
  // Méthode pour créer une nouvelle agence
  async createAgency(req, res) {
    try {
      const agencyData = req.body; // Supposons que les données sont dans le corps de la requête
      const newAgency = new Agency(agencyData);
      await newAgency.create(); // Utilisez la méthode create de la classe Agency

      return res.status(201).json({ message: 'Agence créée avec succès' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Méthode pour mettre à jour les informations d'une agence
  async updateAgency(req, res) {
    try {
      const agencyData = req.body;
      const agencyId = req.params.id; // Supposons que l'ID de l'agence est dans les paramètres de la requête
      const agency = await Agency.findById(agencyId);

      if (!agency) {
        return res.status(404).json({ message: 'Agence non trouvée' });
      }

      // Mettez à jour les propriétés de l'agence avec les nouvelles données
      agency.address = agencyData.address;
      agency.email = agencyData.email;
      agency.phone_number = agencyData.phone_number;

      await agency.update();

      return res.status(200).json({ message: 'Agence mise à jour avec succès' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Méthode pour supprimer une agence
  async deleteAgency(req, res) {
    try {
      const agencyId = req.params.id;
      const agency = await Agency.findById(agencyId);

      if (!agency) {
        return res.status(404).json({ message: 'Agence non trouvée' });
      }

      await agency.delete();

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Méthode pour récupérer toutes les agences
  async getAllAgencies(req, res) {
    try {
      const agencies = await Agency.getAll();
      return res.status(200).json(agencies);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default AgencyController;
