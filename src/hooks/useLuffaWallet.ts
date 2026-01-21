import { useState, useEffect, useCallback } from 'react'

interface WalletState {
  address: string | null
  nickname: string | null
  avatar: string | null
  uid: string | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

export function useLuffaWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    nickname: null,
    avatar: null,
    uid: null,
    isConnected: false,
    isLoading: true,
    error: null,
  })

  // 生成16位随机UUID
  const generateUUID = () => {
    return 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => {
      return Math.floor(Math.random() * 16).toString(16)
    })
  }

  // 连接钱包
  const connect = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // 检查 Luffa SDK 是否存在
      if (typeof window === 'undefined' || !window.luffa) {
        throw new Error('Luffa SDK not loaded')
      }

      const params = {
        api_name: 'luffaWebRequest',
        methodName: 'connect',
        uuid: generateUUID(),
        network: 'endless' as const, // 主网
        metadata: {
          icon: window.location.origin + '/vite.svg',
          url: window.location.origin,
        },
      }

      const response = await window.luffa.luffaWebRequest(params)

      if (response.code === 0 && response.data) {
        setWalletState({
          address: response.data.address,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
          uid: response.data.uid,
          isConnected: true,
          isLoading: false,
          error: null,
        })

        // 保存到 localStorage
        localStorage.setItem('luffa_wallet', JSON.stringify({
          address: response.data.address,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
          uid: response.data.uid,
        }))
      } else {
        throw new Error(response.message || 'Failed to connect wallet')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setWalletState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      console.error('Wallet connection error:', error)
    }
  }, [])

  // 断开连接
  const disconnect = useCallback(() => {
    setWalletState({
      address: null,
      nickname: null,
      avatar: null,
      uid: null,
      isConnected: false,
      isLoading: false,
      error: null,
    })
    localStorage.removeItem('luffa_wallet')
  }, [])

  // 格式化地址显示
  const formatAddress = useCallback((address: string | null) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [])

  // 初始化时检查是否有缓存的连接
  useEffect(() => {
    const checkConnection = async () => {
      // 等待 SDK 加载
      await new Promise(resolve => setTimeout(resolve, 500))

      const cached = localStorage.getItem('luffa_wallet')
      if (cached) {
        try {
          const data = JSON.parse(cached)
          setWalletState({
            ...data,
            isConnected: true,
            isLoading: false,
            error: null,
          })
        } catch {
          setWalletState(prev => ({ ...prev, isLoading: false }))
        }
      } else {
        // 如果在 Luffa 环境中，自动连接
        if (typeof window !== 'undefined' && window.luffa) {
          await connect()
        } else {
          setWalletState(prev => ({ ...prev, isLoading: false }))
        }
      }
    }

    checkConnection()
  }, [connect])

  return {
    ...walletState,
    connect,
    disconnect,
    formatAddress,
  }
}
