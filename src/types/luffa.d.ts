// Luffa SuperBox SDK Type Definitions

interface LuffaUserInfo {
  address: string
  avatar: string
  cid: string
  nickname: string
  uid: string
}

interface LuffaConnectParams {
  api_name: 'luffaWebRequest'
  methodName: 'connect'
  uuid: string
  network: 'endless' | 'ends' // endless = mainnet, ends = testnet
  metadata: {
    icon: string
    url: string
  }
}

interface LuffaResponse<T = any> {
  code: number
  data: T
  message?: string
}

interface LuffaSignMessageParams {
  api_name: 'luffaWebRequest'
  methodName: 'signMessageV2'
  message: string
  nonce: string
  address?: string
  application?: string
  chainId?: number
}

interface LuffaSignatureData {
  publicKey: string
  signature: string
  fullMessage: string
}

interface LuffaTransactionParams {
  api_name: 'luffaWebRequest'
  methodName: 'signAndSubmitTransaction'
  serializedTransaction: {
    data: string // 16位加密字符串
  }
  network: 'endless' | 'ends'
}

interface LuffaTransactionResponse {
  hash: string
}

interface LuffaSDK {
  /**
   * 通用请求方法
   */
  luffaWebRequest: (params: any) => Promise<LuffaResponse>

  /**
   * 连接钱包并获取用户信息
   */
  connect: (params: Omit<LuffaConnectParams, 'api_name' | 'methodName'>) => Promise<LuffaResponse<LuffaUserInfo>>

  /**
   * 签名消息
   */
  signMessage: (params: Omit<LuffaSignMessageParams, 'api_name' | 'methodName'>) => Promise<LuffaResponse<LuffaSignatureData>>

  /**
   * 发送交易
   */
  sendTransaction: (params: Omit<LuffaTransactionParams, 'api_name' | 'methodName'>) => Promise<LuffaResponse<LuffaTransactionResponse>>
}

interface Window {
  luffa?: LuffaSDK
}

declare const luffa: LuffaSDK | undefined
