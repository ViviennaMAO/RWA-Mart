import { useCallback } from 'react'
import { isInLuffaEnvironment } from '../utils/luffaHelpers'

interface ShareOptions {
  title: string
  description?: string
  imageUrl?: string
  link?: string
}

export function useLuffaShare() {
  const shareToLuffa = useCallback(async (options: ShareOptions) => {
    try {
      if (!isInLuffaEnvironment()) {
        // 降级方案：使用 Web Share API
        if (navigator.share) {
          await navigator.share({
            title: options.title,
            text: options.description,
            url: options.link || window.location.href,
          })
          return { success: true }
        } else {
          // 复制到剪贴板
          const text = `${options.title}\n${options.description || ''}\n${options.link || window.location.href}`
          await navigator.clipboard.writeText(text)
          return { success: true, message: 'Copied to clipboard' }
        }
      }

      // Luffa 环境中使用 setShareInfo API
      const params = {
        api_name: 'luffaWebRequest',
        methodName: 'setShareInfo',
        title: options.title,
        desc: options.description || '',
        imgUrl: options.imageUrl || window.location.origin + '/vite.svg',
        link: options.link || window.location.href,
      }

      const response = await window.luffa!.luffaWebRequest(params)

      if (response.code === 0) {
        return { success: true }
      } else {
        return {
          success: false,
          error: response.message || 'Share failed',
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }, [])

  // 分享协议卡片
  const shareProtocol = useCallback(
    async (protocolName: string, apy: number, tvl: string) => {
      return shareToLuffa({
        title: `🚀 Check out ${protocolName}`,
        description: `APY: ${apy.toFixed(1)}% | TVL: ${tvl}\nExplore Real World Assets on RWA Mart`,
        link: window.location.href,
      })
    },
    [shareToLuffa]
  )

  // 分享市场数据
  const shareMarketData = useCallback(
    async (totalTVL: string, protocols: number) => {
      return shareToLuffa({
        title: '📊 RWA Market Overview',
        description: `Total Value Locked: ${totalTVL}\n${protocols} Protocols Available\nDiscover tokenized real-world assets`,
        link: window.location.origin,
      })
    },
    [shareToLuffa]
  )

  return {
    shareToLuffa,
    shareProtocol,
    shareMarketData,
  }
}
