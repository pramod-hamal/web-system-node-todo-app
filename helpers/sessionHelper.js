module.exports = function saveSession(req) {
  return new Promise(function (resolve, reject) {
    req.session.save(function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
