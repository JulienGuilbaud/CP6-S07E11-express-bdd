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
    // ici on pourrait une validation du format de l'adresse
    this.#address = value;
  }

  set phone_number(value) {
    // ici on pourrait une validation du format du téléphone
    this.#phone_number = value;
  }

  set email(value) {
    // ici on pourrait une validation du format de l'email
    this.#email = value;
  }

  create() {
    client.query('INSERT INTO agency (address, email, phone_number) VALUES ($1, $2, $3)', [this.address, this.email, this.phone_number]);
  }
}

export default Agency;