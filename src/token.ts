import crypto from 'crypto-js'

const secret = process.env.CRYPTO_SECRET || 'secret'

export const encrypt = (value: string) =>
  crypto.AES.encrypt(value, secret).toString()

export const decrypt = (value: string) =>
  crypto.AES.decrypt(value, secret).toString(crypto.enc.Utf8)
