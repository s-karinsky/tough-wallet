module.exports = function create(options) {
  const { storage, prompt, provider } = options
  return async function(entropy) {
    if (entropy && String(entropy).length < 32) {
      throw new Error('Entropy must be 32 bytes long')
    }
    const account = provider.eth.accounts.create(entropy)
    console.log('Account succesfully created')
    console.log('Address:', account.address)
    console.log('Private key:', account.privateKey)
    const name = await prompt('Enter name for store wallet data (uncrypted, undeletable, hardcore!). Empty for skip: ')
    storage.set(name.trim(), { address: account.address, privateKey: account.privateKey })
    console.log(`Wallet ${name} successfully stored`)
    return
  }
}
