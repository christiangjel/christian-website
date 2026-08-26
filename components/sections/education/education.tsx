'use client'

import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { SECTIONS } from '@/constants'

export const Education = () => {
  const content = useContent()

  return (
    <section
      id={SECTIONS.EDUCATION}
      className='py-16 md:py-20'
      aria-labelledby='education-heading'
    >
      <SectionReveal>
        <h2
          id='education-heading'
          className='mb-14 text-3xl font-bold leading-tight tracking-tight md:mb-16 md:text-4xl'
        >
          {content.education.title}
        </h2>
        <div
          className='grid grid-cols-1 gap-8 md:grid-cols-2'
          role='list'
          aria-label={content.education.ariaLabels.history}
        >
          {content.education.items.map((item, index) => (
            <a
              key={`${item.title}-${item.date}`}
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
              role='listitem'
              aria-labelledby={`education-title-${index}`}
            >
              <div className='h-full rounded-lg border border-mint/20 bg-background p-6 backdrop-blur transition-[filter,border-color,background-color] duration-300 hover:border-mint hover:bg-mint/5 hover:brightness-110 supports-[backdrop-filter]:bg-background/60'>
                <time className='mb-2 block text-muted-foreground'>
                  {item.date}
                </time>
                <h3
                  id={`education-title-${index}`}
                  className='mb-2 text-xl font-bold'
                >
                  {item.title}
                </h3>
                <p className='mb-2 text-muted-foreground'>{item.institution}</p>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
