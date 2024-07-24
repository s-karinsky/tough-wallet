const fs = require('fs')
const path = require('path')

module.exports = function createStorage(filename = '../wallet.json') {
  const file = path.resolve(__dirname, filename)
  let storage = []
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]')
  } else {
    try {
      storage = JSON.parse(fs.readFileSync(file))
    } catch (e) {
      throw new Error('Error on read storage. ', e.message)
    }
  }

  return {
    get: name => storage.find(item => item.name === name),
    getByIndex: index => storage[index],
    getAll: () => storage,
    find: obj => storage.find(item => Object.keys(obj).every(key => obj[key] === item[key])),
    filter: obj => storage.filter(item => Object.keys(obj).every(key => obj[key] === item[key])),
    set: (name, data) => {
      const index = storage.findIndex(item => item.name === name)
      if (index > -1) {
        storage[index] = { ...storage[index], ...data, name }
      } else {
        storage.push({ name, ...data })
      }
      fs.writeFileSync(file, JSON.stringify(storage))
      process.exit()
    }
  }
}