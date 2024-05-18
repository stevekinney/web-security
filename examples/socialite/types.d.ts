declare namespace Express {
  export interface Request {
    user: import('./database.js').User;
  }
}
