import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content'
import type { WebShopCategory } from '@/types/content'

type ContentPanelProps = {
  category: WebShopCategory
}

/**
 * Static outlined panel for Webshop tab content.
 * Renders headline, body, and optional demos, feature lines, or pricing plans.
 */
export const ContentPanel = ({ category }: ContentPanelProps) => {
  const hasDemos = category.demos && category.demos.length > 0
  const hasItems = category.items && category.items.length > 0
  const hasPlans = category.plans && category.plans.length > 0
  const showBodyAbove = !hasPlans

  return (
    <Card className='border-mint/20 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <CardContent className='p-6'>
        <h3 className='mb-4 text-lg font-bold'>{category.headline}</h3>

        {showBodyAbove && category.body && hasItems && (
          <p className='mb-4 text-muted-foreground'>{category.body}</p>
        )}

        {showBodyAbove && category.body && !hasItems && !hasDemos && (
          <p className='text-muted-foreground'>{category.body}</p>
        )}

        {showBodyAbove && category.body && !hasItems && hasDemos && (
          <p className='mb-4 text-muted-foreground'>{category.body}</p>
        )}

        {hasDemos && (
          <div
            className='space-y-4'
            aria-label={content.webShop.ariaLabels.demos}
          >
            {category.demos!.map((demo) => (
              <p key={demo.url} className='text-muted-foreground'>
                <span className='text-foreground'>{demo.prefix}:</span>{' '}
                <Link
                  href={demo.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='transition-colors hover:text-mint'
                  aria-label={demo.ariaLabel}
                >
                  {demo.label}
                </Link>
              </p>
            ))}
          </div>
        )}

        {hasItems && (
          <div className='space-y-4'>
            {category.items!.map((item) => (
              <p key={item.title} className='text-muted-foreground'>
                <span className='text-foreground'>
                  {item.title}
                  {item.comingSoon && (
                    <span className='font-normal italic'>
                      {' '}
                      ({content.webShop.ariaLabels.comingSoon.toLowerCase()})
                    </span>
                  )}
                  :
                </span>{' '}
                {item.description}
              </p>
            ))}
          </div>
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
