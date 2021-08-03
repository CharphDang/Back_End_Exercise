let name = '';
const setName = newName => (name = newName);
const getName = () => name;

module.exports = {
  setName,
  getName
};
