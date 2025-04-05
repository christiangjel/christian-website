import content from '@/data/content.json'

export const About = () => {
  const headingId = 'about-heading'

  return (
    <section id='about' className='py-14' aria-labelledby={headingId}>
      <div className='grid grid-cols-1 md:grid-cols-1 gap-12'>
        <div>
          <h2 id={headingId} className='text-3xl font-bold tracking-tight mb-6'>
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
