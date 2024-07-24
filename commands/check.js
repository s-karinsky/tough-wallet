module.exports = function check(options) {
  const { storage, prompt, provider } = options
  function checkByAddress(address) {
    if (!provider.utils.isAddress(address)) {
      throw new Error('Wrong address')
    }
    return provider.eth.getBalance(String(address))
      .then(balance => console.log(`Balance: ${balance}`))
  }

  return async function(address) {
    if (!address) {
      const stored = storage.getAll()
      stored.map((wallet, i) => console.log(`${i}. ${wallet.name} - ${wallet.address}`))
      const key = await prompt(`Enter ${stored.length > 0 ? 'number of wallet or' : ''} address for check balance: `)
      address = Number(key) !== NaN ? stored[Number(key)]?.address : key
    } 
    return checkByAddress(address)
  }
}