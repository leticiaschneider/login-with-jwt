const db = require('../database');

const userConverter = row => ({
  id: row.user_id,
  name: row.user_full_name,
  email: row.user_email,
  password: row.user_password,
});

module.exports = {
  add: (user) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO user (user_full_name, user_email, user_password, user_join_date) values (?,?,?,?)`,
        [
          user.fullName,
          user.email,
          user.password,
          new Date()
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Can`t register new user');
          }
          console.log(`User ${user.fullName} registered!`)
          resolve(user);
        });
    });
  },
  findUserByEmail: (userEmail) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM user WHERE user_email = ?`,
        [userEmail],
        (err, user) => {
          if (err) {
            console.log(err);
            return reject('Can`t find user');
          }

          if (user) resolve(user[0]);
          resolve(null);
        }
      )
    });
  },
};