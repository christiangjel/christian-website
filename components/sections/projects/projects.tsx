'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectCard } from '@/components/ui/project-card/project-card'
import content from '@/data/content.json'

export const Projects = () => {
  return (
    <section id='projects' className='py-14'>
      <h2 className='text-3xl font-bold tracking-tight mb-12'>
        {content.projects.title}
      </h2>
      <Tabs
        defaultValue={content.projects.categories[0].name}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-2 md:grid-cols-4 h-auto min-h-[80px] md:min-h-[unset]'>
          {content.projects.categories.map((category, index) => (
            <TabsTrigger
              key={index}
              value={category.name}
              className='text-xs sm:text-sm md:text-base py-2 h-auto flex items-center justify-center'
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {content.projects.categories.map((category, index) => (
          <TabsContent key={index} value={category.name} className='mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {category.items.map((project, projectIndex) => (
                <ProjectCard
                  key={projectIndex}
                  title={project.title}
                  role={project.role}
                  client={project.client}
                  agency={project.agency}
                  description={project.description}
                  awards={project.awards}
                  link={project.link}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
