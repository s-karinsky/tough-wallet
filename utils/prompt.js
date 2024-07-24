const readline = require('readline')

module.exports = function() {
  const rl = readline.createInterface(process.stdin, process.stdout)

  const Prompt = function(output) {
    return new Promise(
      resolve => {
        rl.setPrompt(output)
        rl.prompt()
        rl.on('line', text => {
          resolve(text.trim())
        })
        rl.on('SIGINT', () => {
          rl.question('Are you sure you want to exit? ', (answer) => {
            if (answer.match(/^y(es)?$/i)) rl.pause()
          })
        })
      }
    )
  }

  Prompt.close = function() {
    rl.close()
  }
  return Prompt
}