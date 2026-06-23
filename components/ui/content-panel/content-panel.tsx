import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content'
import type { WebShopCategory } from '@/types/content'

type ContentPanelProps = {
  category: WebShopCategory
}

/**
 * Static outlined panel for Web Shop tab content.
 * Renders headline, body, and optional demos, bullets, or pricing plans.
 */
export const ContentPanel = ({ category }: ContentPanelProps) => {
  const hasDemos = category.demos && category.demos.length > 0
  const hasBullets = category.bullets && category.bullets.length > 0
  const hasPlans = category.plans && category.plans.length > 0
  const showBodyAbove = !hasPlans

  return (
    <Card className='border-mint/20 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <CardContent className='p-6'>
        <h3 className='mb-4 text-lg font-bold'>{category.headline}</h3>

        {showBodyAbove && hasBullets && (
          <p className='mb-4 text-muted-foreground'>{category.body}</p>
        )}

        {showBodyAbove && !hasBullets && (
          <p className='text-muted-foreground'>{category.body}</p>
        )}

        {hasDemos && category.demosHeading && (
          <div className='mt-6'>
            <p className='mb-2'>
              <span className='text-foreground'>{category.demosHeading}:</span>
            </p>
            <ul
              className='list-inside list-disc space-y-1 text-muted-foreground'
              aria-label={content.webShop.ariaLabels.demos}
            >
              {category.demos!.map((demo) => (
                <li key={demo.url}>
                  <Link
                    href={demo.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-colors hover:text-mint'
                    aria-label={demo.ariaLabel}
                  >
                    {demo.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasBullets && (
          <ul className='mt-2 list-inside list-disc space-y-2 text-muted-foreground'>
            {category.bullets!.map((bullet) => (
              <li key={bullet.title}>
                <span className='font-medium text-foreground'>
                  {bullet.title}
                  {bullet.comingSoon && (
                    <span className='font-normal italic'>
                      {' '}
                      ({content.webShop.ariaLabels.comingSoon.toLowerCase()})
                    </span>
                  )}
                </span>
                {'—'}
                {bullet.description}
              </li>
            ))}
          </ul>
        )}

        {hasPlans && (
          <div className='space-y-4'>
            {category.plans!.map((plan) => (
              <p key={plan.name} className='text-muted-foreground'>
                <span className='text-foreground'>{plan.name}:</span>{' '}
                {plan.description}
              </p>
            ))}
            <p className='text-muted-foreground'>{category.body}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
