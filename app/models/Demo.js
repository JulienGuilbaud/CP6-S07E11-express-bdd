import client from "../database.js";

class Teacher {
  #id;
  #name;
  
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
  }
  
  get id() {
    return this.#id;
  }
  
  get name() {
    return this.#name;
  }
  
  set id(value) {
    if (typeof value !== 'number' && typeof value !== 'undefined') {
      throw new Error('Id incorrect');
    }
    this.#id = value;
  }
  
  set name(value) {
    if (typeof value !== 'string') {
      throw new Error('Nom incorrect');
    }
    this.#name = value;
  }

  // L'objectif de create va être de sauvegarder un objet en bdd
  async create() {
    const text = `
      INSERT INTO teacher (name)
      VALUES ($1)
      RETURNING id;
    `; // RETURNING permet de récupérer des informations de la ligne insérée, ici l'id
    const values = [this.name];
    const result = await client.query(text, values);
    // on modifie l'instance pour qu'elle possède son id
    this.#id = result.rows[0].id; 
  }

  // L'objectif de read est de trouver une ligne en bdd en fonction d'un id recherché et de fournir un objet Teacher
  static async read(id) {
    const text = `
      SELECT * FROM teacher
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rowCount > 0) {
      return new Teacher(result.rows[0]); // on retourne une nouvelle instance
    }
    else {
      throw new Error('Teacher non trouvé');
    }
  }

  // objectif : faire persister des changements de notr objet
  async update() {
    const text = `
      UPDATE teacher 
      SET name = $1
      WHERE id = $2;
    `;
    const values = [this.name, this.id];
    client.query(text, values);
  }

  // objectif ; effacer la ligne en bdd qui correspond à notre objet
  async delete() {
    const text = `
      DELETE FROM teacher 
      WHERE id = $1;
    `;
    const values = [this.id];
    client.query(text, values);
  }
}

export default Teacher;


// on doit attendre le retour d'une fonction asynchrone
// const prof = await Teacher.read(3);
// console.log(prof);
// console.log(prof.id);
// console.log(prof.name);
// await prof.delete();


// const dwaTeacher = new Teacher({ name: 'Etienne' });
// console.log(dwaTeacher.name);
// console.log(dwaTeacher.id);
// await dwaTeacher.create();
// console.log(dwaTeacher.id);
// dwaTeacher.name = 'Etienne Aime';
// pour faire persister une mise à jour
// soit on écrit la requête à la main
// await client.query('UPDATE teacher SET name = $1 WHERE id = $2', [dwaTeacher.name, dwaTeacher.id])
// soit on fait appel à la méthode qui définit la même requête
// await dwaTeacher.update();
// await dwaTeacher.delete();
