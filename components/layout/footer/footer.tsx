'use client'

import { useContent } from '@/components/layout/locale/locale-provider'

export const Footer = () => {
  const content = useContent()

  return (
    <footer className='py-8'>
      <div className='container'>
        <p className='text-muted-foreground text-sm text-center'>
          {content.footer.copyright.replace(
            '{year}',
            String(new Date().getFullYear())
          )}
        </p>
      </div>
    </footer>
  )
}
