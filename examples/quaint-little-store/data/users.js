/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {boolean} admin
 * @property {string} creditCard
 * @property {string} cvv
 * @property {string} expirationDate
 */

/**
 * A list of users to insert into the database.
 * @type {User[]}
 */
const users = [
  {
    name: 'Bobby Tables',
    email: 'bobby@tables.com',
    password: 'password123',
    admin: false,
    creditCard: '3615-500732-9915',
    cvv: '994',
    expirationDate: '05/2025',
  },
  {
    name: 'Laurie Mante',
    email: 'admin@example.com',
    password: 'password564',
    admin: true,
    creditCard: '3748-933522-84323',
    cvv: '564',
    expirationDate: '12/2024',
  },
  {
    name: 'Wilford Wilkinson',
    email: 'Wilford_Wilkinson68@yahoo.com',
    password: 'password326',
    admin: false,
    creditCard: '3663-292494-4638',
    cvv: '326',
    expirationDate: '02/2025',
  },
  {
    name: 'Velva Baumbach',
    email: 'Velva_Baumbach86@hotmail.com',
    password: 'password469',
    admin: false,
    creditCard: '5038932374579266484',
    cvv: '469',
    expirationDate: '09/2024',
  },
  {
    name: 'Devante Collier',
    email: 'Devante.Collier@yahoo.com',
    password: 'password388',
    admin: false,
    creditCard: '5553-5227-9814-4179',
    cvv: '388',
    expirationDate: '04/2025',
  },
  {
    name: 'Claire Connelly',
    email: 'Claire_Connelly@yahoo.com',
    password: 'password130',
    admin: false,
    creditCard: '3567-8334-0292-2903',
    cvv: '130',
    expirationDate: '12/2024',
  },
  {
    name: 'Darion Walsh-Brakus',
    email: 'Darion.Walsh-Brakus21@hotmail.com',
    password: 'password261',
    admin: false,
    creditCard: '6578-6278-7865-1703-7615',
    cvv: '261',
    expirationDate: '03/2025',
  },
  {
    name: 'Jaylen Schinner',
    email: 'Jaylen_Schinner5@gmail.com',
    password: 'password339',
    admin: false,
    creditCard: '3528-0842-3042-4195',
    cvv: '339',
    expirationDate: '06/2024',
  },
  {
    name: 'Tara Reynolds',
    email: 'Tara_Reynolds82@gmail.com',
    password: 'password335',
    admin: false,
    creditCard: '3770-321572-45976',
    cvv: '335',
    expirationDate: '02/2025',
  },
  {
    name: 'Merlin Weber',
    email: 'Merlin.Weber@hotmail.com',
    password: 'password310',
    admin: false,
    creditCard: '3428-269985-92658',
    cvv: '310',
    expirationDate: '09/2024',
  },
];

export default users;
