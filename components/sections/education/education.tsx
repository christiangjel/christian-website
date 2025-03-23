'use client'

import content from '@/data/content.json'

export const Education = () => {
  return (
    <section className='py-14'>
      <h2 className='text-3xl font-bold tracking-tight mb-12'>
        {content.education.title}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {content.education.items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
            className='block bg-background'
          >
            <div className='border border-mint/20 rounded-lg p-6 h-full transition-colors hover:border-mint hover:bg-mint/5'>
              <div className='text-muted-foreground mb-2'>{item.date}</div>
              <h3 className='font-semibold text-xl mb-2'>{item.title}</h3>
              <p className='text-muted-foreground mb-2'>{item.institution}</p>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
