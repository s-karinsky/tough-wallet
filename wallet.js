const { Web3 } = require('web3')
const prompt = require('./utils/prompt')()
const createStorage = require('./utils/storage')
const createCommands = require('./commands')
 
process.stdin.resume()
process.stdin.setEncoding( 'utf8' )

function run(cmd, args) {
  const provider = new Web3(Web3.givenProvider || "https://devnet.neonevm.org")
  const storage = createStorage()
  const commands = createCommands({ provider, storage, prompt })

  if (typeof commands[cmd] !== 'function') {
    console.error('Invalid command')
    process.exit(1)
  }
  try {
    commands[cmd](...args).then(() => {
      prompt.close()
      process.exit()
    })
  } catch (e) {
    console.error("\x1b[31mError:\x1b[0m", "\n", e)
    process.exit(1)
  }
}

run(process.argv[2], process.argv.slice(3))