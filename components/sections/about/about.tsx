import { content } from '@/lib/content'
import { SECTIONS } from '@/constants'

export const About = () => {
  const headingId = 'about-heading'

  return (
    <section id={SECTIONS.ABOUT} className='py-14' aria-labelledby={headingId}>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-1'>
        <div>
          <h2 id={headingId} className='mb-6 text-3xl font-bold tracking-tight'>
            {content.about.title}
          </h2>
          {content.about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-muted-foreground${
                index === content.about.paragraphs.length - 1 ? '' : ' mb-4'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
