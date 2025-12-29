'use client'

import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ui/forms/contact-form'
import content from '@/data/content.json'

export const Contact = () => {
  return (
    <section id='contact' className='py-14'>
      <h2 className='mb-12 text-3xl font-bold tracking-tight'>
        {content.contact.title}
      </h2>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
        <div>
          <p className='mb-8 text-muted-foreground'>
            {content.contact.description}
          </p>
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <Mail className='mt-0.5 h-5 w-5 text-mint' />
              <div>
                <h3 className='font-bold'>Email</h3>
                <a
                  href={`mailto:${content.contact.email}`}
                  className='text-muted-foreground transition-colors hover:text-mint active:text-mint focus:text-mint visited:text-mint focus-visible:outline-none'
                >
                  {content.contact.email.replace('@', '(at)\u200B')}
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <Phone className='mt-0.5 h-5 w-5 text-mint' />
              <div>
                <h3 className='font-bold'>Phone</h3>
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                  className='text-muted-foreground transition-colors hover:text-mint active:text-mint focus:text-mint visited:text-mint focus-visible:outline-none'
                >
                  {content.contact.phone}
                </a>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mt-0.5 text-mint'
              >
                <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
                <circle cx='12' cy='10' r='3' />
              </svg>
              <div>
                <h3 className='font-bold'>Location</h3>
                <p className='text-muted-foreground'>
                  {content.contact.location}
                </p>
              </div>
            </div>
            <div className='mt-4 flex flex-wrap gap-4'>
              {content.contact.social.map((item, index) => (
                <Button
                  key={index}
                  variant='outline'
                  className='flex items-center gap-2'
                  asChild
                >
                  <Link href={item.url} target='_blank'>
                    {item.icon === 'linkedin' && (
                      <Linkedin className='h-4 w-4' />
                    )}
                    {item.icon === 'github' && <Github className='h-4 w-4' />}
                    {item.icon === 'xing' && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='mr-2'
                      >
                        <path d='M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.016z' />
                      </svg>
                    )}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
