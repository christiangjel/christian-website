'use client'

import content from '@/data/content.json'

export const Education = () => {
  return (
    <section className='py-14' aria-labelledby='education-heading'>
      <h2
        id='education-heading'
        className='text-3xl font-bold tracking-tight mb-12'
      >
        {content.education.title}
      </h2>
      <div
        className='grid grid-cols-1 md:grid-cols-2 gap-8'
        role='list'
        aria-label='Education history'
      >
        {content.education.items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
            className='block'
            role='listitem'
            aria-labelledby={`education-title-${index}`}
          >
            <div className='border border-mint/20 rounded-lg p-6 h-full bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors hover:border-mint hover:bg-mint/5'>
              <time className='text-muted-foreground mb-2 block'>
                {item.date}
              </time>
              <h3
                id={`education-title-${index}`}
                className='font-bold text-xl mb-2'
              >
                {item.title}
              </h3>
              <p className='text-muted-foreground mb-2'>{item.institution}</p>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
