/**
 * Luffa SDK 辅助函数
 */

/**
 * 检查是否在 Luffa 环境中
 */
export function isInLuffaEnvironment(): boolean {
  return typeof window !== 'undefined' && !!window.luffa
}

/**
 * 生成16位随机UUID (用于 Luffa API 调用)
 */
export function generateUUID(): string {
  return 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => {
    return Math.floor(Math.random() * 16).toString(16)
  })
}

/**
 * 格式化钱包地址
 * @param address - 完整地址
 * @param startLength - 开始显示的字符数 (默认 6)
 * @param endLength - 结尾显示的字符数 (默认 4)
 */
export function formatWalletAddress(
  address: string | null,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return ''
  if (address.length <= startLength + endLength) return address
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}

/**
 * 发送 Luffa 交易
 * @param serializedData - 加密的16位字符串
 * @param network - 网络类型
 */
export async function sendLuffaTransaction(
  serializedData: string,
  network: 'endless' | 'ends' = 'endless'
): Promise<{ success: boolean; hash?: string; error?: string }> {
  try {
    if (!isInLuffaEnvironment()) {
      throw new Error('Not in Luffa environment')
    }

    const params = {
      api_name: 'luffaWebRequest',
      methodName: 'signAndSubmitTransaction',
      serializedTransaction: {
        data: serializedData,
      },
      network,
    }

    const response = await window.luffa!.luffaWebRequest(params)

    if (response.code === 0 && response.data?.hash) {
      return {
        success: true,
        hash: response.data.hash,
      }
    } else {
      return {
        success: false,
        error: response.message || 'Transaction failed',
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 签名消息
 * @param message - 要签名的消息
 * @param nonce - 防重放攻击的随机数
 */
export async function signMessage(
  message: string,
  nonce: string = Date.now().toString()
): Promise<{ success: boolean; signature?: string; error?: string }> {
  try {
    if (!isInLuffaEnvironment()) {
      throw new Error('Not in Luffa environment')
    }

    const params = {
      api_name: 'luffaWebRequest',
      methodName: 'signMessageV2',
      message,
      nonce,
    }

    const response = await window.luffa!.luffaWebRequest(params)

    if (response.code === 0 && response.data?.signature) {
      return {
        success: true,
        signature: response.data.signature,
      }
    } else {
      return {
        success: false,
        error: response.message || 'Signature failed',
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * 等待 Luffa SDK 加载完成
 * @param timeout - 超时时间（毫秒）
 */
export function waitForLuffaSDK(timeout: number = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now()

    const checkSDK = () => {
      if (isInLuffaEnvironment()) {
        resolve(true)
        return
      }

      if (Date.now() - startTime > timeout) {
        resolve(false)
        return
      }

      setTimeout(checkSDK, 100)
    }

    checkSDK()
  })
}
