'use client'

import { content } from '@/lib/content'

export const Footer = () => {
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
