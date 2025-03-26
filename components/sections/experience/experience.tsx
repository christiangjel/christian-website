'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TimelineItem } from '@/components/ui/timeline-item/timeline-item'
import content from '@/data/content.json'

export const Experience = () => {
  return (
    <section id='experience' className='py-14'>
      <h2 className='text-3xl font-bold tracking-tight mb-12'>
        {content.experience.title}
      </h2>
      <div className='relative pl-8 ml-3'>
        {content.experience.items.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            company={item.company}
            companyLink={item.companyLink}
            isLast={index === content.experience.items.length - 1}
          />
        ))}
      </div>

      <div className='mt-16'>
        <h3 className='text-xl font-semibold mb-6 border-l-4 border-mint pl-4'>
          Languages
        </h3>
        <Card className='border-mint/20 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <CardContent className='p-6'>
            <div className='space-y-2'>
              {content.experience.languages.map((language, index) => (
                <div
                  key={index}
                  className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1'
                >
                  <span className='font-medium'>{language.name}</span>
                  <span className='text-muted-foreground'>
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
