import { useEffect, useRef } from 'react'

const initialDelayMs = 1_000
const maxDelayMs = 30_000
const unauthorizedCloseCode = 4001

type UseWebSocketOptions = {
  url: string | null
  onMessage: (data: string) => void
}

export function useWebSocket({ url, onMessage }: UseWebSocketOptions) {
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    if (url === null) {
      return
    }

    let socket: WebSocket | null = null
    let retryTimer: number | undefined
    let attempt = 0
    let closedByApp = false

    const connect = () => {
      socket = new WebSocket(url)

      socket.onopen = () => {
        attempt = 0
      }

      socket.onmessage = (event) => {
        onMessageRef.current(event.data)
      }

      socket.onclose = (event) => {
        if (closedByApp || event.code === unauthorizedCloseCode) {
          return
        }

        const delay = Math.min(initialDelayMs * 2 ** attempt, maxDelayMs)
        attempt += 1
        retryTimer = window.setTimeout(connect, delay)
      }
    }

    connect()

    return () => {
      closedByApp = true
      window.clearTimeout(retryTimer)
      socket?.close()
    }
  }, [url])
}
