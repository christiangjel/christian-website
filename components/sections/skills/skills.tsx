'use client'

import content from '@/data/content.json'

export const Skills = () => {
  return (
    <section id='skills' className='py-14'>
      <h2 className='text-3xl font-bold tracking-tight mb-12'>
        {content.skills.title}
      </h2>

      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 mb-12'>
        {content.skills.categories.map((category, index) => (
          <div key={index}>
            <h3 className='text-xl font-semibold mb-4 border-l-4 border-mint pl-4'>
              {category.name}
            </h3>
            <div className='border border-mint/20 rounded-lg p-6 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
              <div className='grid grid-cols-2 gap-x-2 gap-y-3'>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex items-center gap-2'>
                    <span className='text-mint'>•</span>
                    <span className='font-medium'>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className='text-xl font-semibold mb-4 border-l-4 border-mint pl-4'>
          Soft Skills
        </h3>
        <div className='border border-mint/20 rounded-lg p-6 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3'>
            {content.skills.softSkills.map((skill, index) => (
              <div key={index} className='flex items-center gap-2'>
                <span className='text-mint'>•</span>
                <span className='font-medium text-sm sm:text-base'>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
