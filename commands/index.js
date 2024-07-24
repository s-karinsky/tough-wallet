const fn = module.fn = {
  create: require('./create'),
  send: require('./send'),
  check: require('./check')
}

module.exports = function createCommands(options) {
  const cmd = {}
  for (let name in fn) {
    if (typeof fn[name] === 'function') cmd[name] = fn[name](options)
  }
  return cmd
}