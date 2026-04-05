function execute(command, callback) {
  const { exec, spawn } = require('child_process');

  exec(command, (err, stdout, stderr) => {
    try {
      if (err) {
        throw new Error(err);
      }
    } catch (error) {
      return callback(error);
    }
    console.log('stdout = ', stdout);
    return callback(null, stdout);
  });
}
