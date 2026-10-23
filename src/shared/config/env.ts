const apiUrl = import.meta.env.VITE_API_URL

if (apiUrl === undefined || apiUrl.trim() === '') {
  throw new Error(
    'VITE_API_URL est manquante. Définissez-la dans le fichier .env correspondant au mode de build (voir .env.example).',
  )
}

const errorReportUrl = import.meta.env.VITE_ERROR_REPORT_URL

const normalizedApiUrl = apiUrl.replace(/\/+$/, '')

export const env = {
  apiUrl: normalizedApiUrl,
  wsUrl: normalizedApiUrl.replace(/^http/, 'ws'),
  errorReportUrl: errorReportUrl === undefined || errorReportUrl.trim() === '' ? null : errorReportUrl,
  mode: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
}
