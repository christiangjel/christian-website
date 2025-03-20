'use client'

import content from '@/data/content.json'

export const Footer = () => {
  return (
    <footer className='py-8 border-t'>
      <div className='container'>
        <p className='text-muted-foreground text-sm text-center'>
          {content.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
