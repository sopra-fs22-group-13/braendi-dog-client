/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.avatar = null;
    this.description = null;
    this.wins = null;
    this.gotInGoals = null;

    Object.assign(this, data);
  }
}
export default User;
