import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Remonter en haut"
      className={cn(
        'fixed right-4 bottom-4 rounded-full bg-bordeaux p-3 text-white shadow-lg transition-opacity hover:bg-vigne dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUp size={20} />
    </button>
  )
}
