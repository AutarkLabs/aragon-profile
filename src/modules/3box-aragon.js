import Box from '3box'

class Web3ProviderProxy {
  constructor(ethereumAddress, onSignatures, web3Provider) {
    this.ethereumAddress = ethereumAddress
    this.onSignatures = onSignatures
    this.web3Provider = web3Provider
  }

  sendAsync = ({ fromAddress, method, params, jsonrpc }, callback) => {
    const overridenMethods = {
      personal_sign: ([message, address], callback) => {
        if (address.toLowerCase() !== this.ethereumAddress.toLowerCase()) {
          throw new Error('Address mismatch')
        }
        const signatureBag = {
          message,
          requestingApp: '3Box-Aragon Profile',
          resolve: signature =>
            callback(null, { result: signature, error: null }),
          reject: error => callback(error, { error }),
        }
        return this.onSignatures(signatureBag)
      },
    }

    // if we want to override a default web3 behavior (like personal_sign), we return the overriden method here
    if (overridenMethods[method]) {
      return overridenMethods[method](params, callback)
    }
    return this.web3Provider.sendAsync(
      {
        fromAddress,
        method,
        params,
        jsonrpc,
      },
      callback
    )
  }
}

export class Profile {
  constructor(ethereumAddress, onSignatures, web3Provider) {
    this.ethereumAddress = ethereumAddress
    this.web3ProviderProxy = new Web3ProviderProxy(
      ethereumAddress,
      onSignatures,
      web3Provider
    )
    this.boxState = {
      opened: false,
      errorFetchingBox: false,
    }
    this.unlockedBox = null
  }

  _getPublic = async () => {
    const publicProfile = this.boxState.opened
      ? await this.unlockedBox.public.all()
      : await Box.getProfile(this.ethereumAddress)
    return publicProfile
  }

  getPublic = async () => {
    const publicProfile = await this._getPublic()
    if (!Object.keys(publicProfile).length) {
      return publicProfile
    }

    const { github, twitter } = await Box.getVerifiedAccounts(publicProfile)
    return {
      ...publicProfile,
      github: github || { username: '', proof: '' },
      twitter: twitter || { username: '', proof: '' },
    }
  }

  unlock = async () => {
    const openedBox = await Box.openBox(
      this.ethereumAddress,
      this.web3ProviderProxy
    )
    this.boxState = { opened: true, synced: false }
    this.unlockedBox = openedBox
    return openedBox
  }

  sync = () =>
    new Promise(async (resolve, reject) => {
      if (this.boxState.opened) {
        try {
          await this.unlockedBox.syncDone
          this.boxState = { opened: true, synced: true }
          resolve(this.unlockedBox)
        } catch (err) {
          this.boxState = { opened: true, synced: false }
          return reject(err)
        }
      } else
        reject(new Error('Box needs to be unlocked before it can be synced'))
    })

  unlockAndSync = async () => {
    const openedBox = await Box.openBox(
      this.ethereumAddress,
      this.web3ProviderProxy
    )

    this.boxState = { opened: true, synced: false }
    this.unlockedBox = openedBox
    return this.sync()
  }

  createProfile = () => this.unlockedBox.linkAddress()

  hasProfile = async () => {
    try {
      const config = await Box.getConfig(this.ethereumAddress)
      // in case config comes back undefined or empty
      return config && config.links && config.links.length > 0
    } catch (error) {
      return false
    }
  }

  isLoggedIn = () => Box.isLoggedIn(this.ethereumAddress)

  logout = () => this.unlockedBox.logout()

  getPrivate = () => {
    if (this.boxState.opened && this.boxState.synced) {
      return this.unlockedBox.private.all()
    }

    throw new Error('box was not unlocked or has not finished syncing')
  }

  checkForErrorsBeforeSetting = (fields, values) => {
    if (!this.boxState.opened || !this.boxState.synced) {
      throw new Error('box was not unlocked or has not finished syncing')
    }
    if (!Array.isArray(fields) || !Array.isArray(values)) {
      throw new Error('must pass two arrays')
    }
  }

  setPublicFields = async (fields, values) => {
    this.checkForErrorsBeforeSetting(fields, values)
    try {
      await this.unlockedBox.public.setMultiple(fields, values)
    } catch (err) {
      throw new Error(`Error setting in box: ${err}`)
    }
  }

  setPrivateFields = async (fields, values) => {
    this.checkForErrorsBeforeSetting(fields, values)
    try {
      await this.unlockedBox.private.setMultiple(fields, values)
    } catch (err) {
      throw new Error(`Error setting in box: ${err}`)
    }
  }

  removePublicField = async field => {
    try {
      await this.unlockedBox.public.remove(field)
    } catch (err) {
      throw new Error(`Error removing field from box ${err}`)
    }
  }

  removePrivateField = async field => {
    try {
      await this.unlockedBox.private.remove(field)
    } catch (err) {
      throw new Error(`Error removing field from box ${err}`)
    }
  }
}
