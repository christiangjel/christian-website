'use client'

import content from '@/data/content.json'

export const About = () => {
  return (
    <section id='about' className='py-14'>
      <div className='grid grid-cols-1 md:grid-cols-1 gap-12'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight mb-6'>
            {content.about.title}
          </h2>
          {content.about.paragraphs.map((paragraph, index) => (
            <p key={index} className='text-muted-foreground mb-4'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
