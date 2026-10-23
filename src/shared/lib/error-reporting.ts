import { env } from '@/shared/config/env'

type ErrorReport = {
  message: string
  stack: string | null
  url: string
  occurredAt: string
  mode: string
}

function toReport(reason: unknown): ErrorReport {
  const isError = reason instanceof Error
  return {
    message: isError ? reason.message : String(reason),
    stack: isError ? (reason.stack ?? null) : null,
    url: window.location.href,
    occurredAt: new Date().toISOString(),
    mode: env.mode,
  }
}

function sendReport(report: ErrorReport) {
  console.error('[erreur application]', report.message, report.stack ?? '')

  if (env.errorReportUrl === null) {
    return
  }

  try {
    navigator.sendBeacon(env.errorReportUrl, new Blob([JSON.stringify(report)], { type: 'application/json' }))
  } catch {
    console.error('[erreur application] envoi du rapport impossible')
  }
}

export function installErrorReporting() {
  window.addEventListener('error', (event: ErrorEvent) => {
    sendReport(toReport(event.error ?? event.message))
  })

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    sendReport(toReport(event.reason))
  })
}
