module.exports = function send(options) {
  const { storage, prompt, provider } = options
  return async function() {
    const stored = storage.getAll()
    stored.map((wallet, i) => console.log(`${i}. ${wallet.name} - ${wallet.address}`))
    const key = await prompt(`Enter ${stored.length > 0 ? 'number of wallet or' : ''} address sending wallet: `)
    let wallet = Number(key) !== NaN ? stored[parseInt(key, 10)] : { address: key }
    if (!wallet.privateKey) {
      wallet.privateKey = await prompt('Enter private key for wallet: ')
    }
    const keyDest = await prompt(`Enter ${stored.length > 0 ? 'number of wallet or' : ''} address for send coins: `)
    const addressTo = Number(key) !== NaN ? stored[parseInt(keyDest, 10)]?.address : key
    const value = await prompt('Coins to submit: ')
    console.log(`Trying to send transaction from ${wallet.address} to ${addressTo}`)
    prompt.close()
    const tx = await provider.eth.accounts.signTransaction({
      to: addressTo,
      value: provider.utils.toWei(value, 'ether'),
      gasPrice: await provider.eth.getGasPrice(),
      nonce: await provider.eth.getTransactionCount(wallet.address),
    }, wallet.privateKey)

    const result = await provider.eth.sendSignedTransaction(tx.rawTransaction)
    console.log(`Transaction hash: ${result.transactionHash}`)
  }
}