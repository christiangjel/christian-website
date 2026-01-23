import { content } from '@/lib/content'
import { BulletList } from '@/components/ui/bullet-list'
import { SECTIONS } from '@/constants'

export const Skills = () => {
  return (
    <section
      id={SECTIONS.SKILLS}
      className='pt-14 pb-8'
      aria-labelledby='skills-heading'
    >
      <h2
        id='skills-heading'
        className='mb-12 text-3xl font-bold tracking-tight'
      >
        {content.skills.title}
      </h2>

      <div
        className='grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3'
        role='list'
        aria-label={content.skills.ariaLabels.categories}
      >
        {content.skills.categories.map((category, index) => (
          <div key={category.name} role='listitem'>
            <h3
              id={`category-heading-${index}`}
              className='mb-4 border-l-4 border-mint pl-4 text-xl font-bold'
            >
              {category.name}
            </h3>
            <div className='rounded-lg pt-6 px-6 pb-6'>
              <BulletList
                items={category.items}
                layout='grid'
                aria-labelledby={`category-heading-${index}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills */}
      {/* <div>
        <h3
          id='soft-skills-heading'
          className='text-xl font-bold mb-4 border-l-4 border-mint pl-4'
        >
          Soft Skills
        </h3>
        <div className='border border-mint/20 rounded-lg p-6 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div
            className='grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3'
            role='list'
            aria-labelledby='soft-skills-heading'
          >
            {content.skills.softSkills.map((skill, index) => (
              <div
                key={index}
                className='flex items-center gap-2'
                role='listitem'
              >
                <span className='text-mint' aria-hidden='true'>
                  •
                </span>
                <span className='text-[13px] sm:text-base text-muted-foreground'>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  )
}
