import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/shared/lib/cn'

type MarkdownRendererProps = {
  content: string
  className?: string
}

const components: Components = {
  h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>,
  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc space-y-1 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1 pl-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-600 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-slate-300 px-3 py-2 font-semibold dark:border-slate-700">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-slate-200 px-3 py-2 dark:border-slate-800">{children}</td>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      {children}
    </a>
  ),
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
