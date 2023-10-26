import client from "../database.js";

class Agency {
  #id;
  #address;
  #phone_number;
  #email;

  constructor(config) {
    this.id = config.id;
    this.address = config.address;
    this.phone_number = config.phone_number;
    this.email = config.email;
  }

  get id() {
    return this.#id;
  }

  get address() {
    return this.#address;
  }

  get phone_number() {
    return this.#phone_number;
  }

  get email() {
    return this.#email;
  }

  set id(value) {
    // ici on pourrait une validation du format de l'id
    this.#id = value;
  }

  set address(value) {
    if (/^[a-zA-Z0-9\s,'-]*$/.test(value)) {
      this.#address = value;
    } else {
      throw new Error('Format d\'adresse invalide.');
    }
  }

  set phone_number(value) {
    if (/^[0-9+\s]*$/.test(value)) {
      this.#phone_number = value;
    } else {
      throw new Error('Format de numéro de téléphone invalide.');
    }
  }

  set email(value) {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      this.#email = value;
    } else {
      throw new Error('Format d\'e-mail invalide.');
    }
  }
     findById(id) {
    const result = await client.query('SELECT * FROM agency WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return new Agency(result.rows[0]);
    }
    return null;
  }

   getAll() {
    const result = await client.query('SELECT * FROM agency');
    return result.rows.map(row => new Agency(row));
  }

  create() {
    client.query('INSERT INTO agency (address, email, phone_number) VALUES ($1, $2, $3)',
      [this.address, this.email, this.phone_number]);
  }

  update() {
    client.query('UPDATE agency SET address = $1, email = $2, phone_number = $3 WHERE id = $4',
      [this.address, this.email, this.phone_number, this.id]);
  }

  delete() {
    client.query('DELETE FROM agency WHERE id = $1', [this.id]);
  }

}

export default Agency;
