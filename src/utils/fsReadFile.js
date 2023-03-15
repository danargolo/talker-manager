const fs = require('fs').promises;
const path = require('path');

const readTalkers = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const response = JSON.parse(data);

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  readTalkers,
};