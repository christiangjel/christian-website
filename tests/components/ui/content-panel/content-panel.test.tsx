import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContentPanel } from '@/components/ui/content-panel/content-panel'
import { content } from '@/lib/content'

describe('ContentPanel', () => {
  const overview = content.webShop.categories.find((c) => c.name === 'overview')!
  const features = content.webShop.categories.find((c) => c.name === 'features')!
  const technology = content.webShop.categories.find(
    (c) => c.name === 'technology'
  )!
  const pricing = content.webShop.categories.find((c) => c.name === 'pricing')!

  it('renders overview paragraphs and the demo button', () => {
    render(<ContentPanel category={overview} />)

    const demo = overview.demos![0]!

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      overview.headline
    )
    overview.paragraphs!.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    })
    expect(screen.getByText(overview.demosIntro!)).toBeInTheDocument()

    const demoLink = screen.getByRole('link', { name: demo.ariaLabel })
    expect(demoLink).toHaveAttribute('href', demo.url)
    expect(demoLink).toHaveTextContent(demo.label)
  })

  it('renders feature lines with foreground titles', () => {
    render(<ContentPanel category={features} />)

    const branding = features.items![0]!

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      features.headline
    )
    expect(screen.getByText(`${branding.title}:`)).toHaveClass('text-foreground')
    expect(screen.getByText(branding.description)).toBeInTheDocument()
  })

  it('renders technology intro, bullet list, and closing text', () => {
    render(<ContentPanel category={technology} />)

    expect(screen.getByText(technology.headline)).toBeInTheDocument()
    expect(screen.getByText(technology.bullets![0]!)).toBeInTheDocument()
    expect(screen.getByText(technology.closing!)).toBeInTheDocument()
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders pricing plans before the closing text', () => {
    render(<ContentPanel category={pricing} />)

    const saasPlan = pricing.plans![0]!
    const lifetimePlan = pricing.plans![1]!

    expect(screen.getByText(saasPlan.name)).toBeInTheDocument()
    expect(screen.getByText(saasPlan.subtitle!)).toBeInTheDocument()
    expect(screen.getByText(lifetimePlan.name)).toBeInTheDocument()
    expect(screen.getByText(saasPlan.bullets![0]!)).toBeInTheDocument()
    expect(screen.getByText(pricing.closing!)).toBeInTheDocument()

    const cardText = screen.getByRole('region').textContent ?? ''
    const planIndex = cardText.indexOf(saasPlan.name)
    const closingIndex = cardText.indexOf(pricing.closing!)
    expect(planIndex).toBeGreaterThan(-1)
    expect(closingIndex).toBeGreaterThan(planIndex)
  })
})
