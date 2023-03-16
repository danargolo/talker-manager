const fs = require('fs').promises;
const path = require('path');
// const { readTalkers } = require('./fsReadTalkers');

const talkerPath = path.resolve(__dirname, '../talker.json');

const writeTalkers = async (newTalker) => {
  try {
    const data = JSON.stringify(newTalker);
    await fs.writeFile(talkerPath, data);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  writeTalkers,
};