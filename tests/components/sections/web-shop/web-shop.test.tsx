import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WebShop } from '@/components/sections/web-shop/web-shop'
import { content } from '@/lib/content'
import { scrollToSection } from '@/lib/utils'
import { SECTIONS } from '@/constants'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    )
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>
}))

vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>()
  return {
    ...actual,
    scrollToSection: vi.fn()
  }
})

describe('WebShop', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders section title, subtitle, and four tabs', () => {
    render(<WebShop />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      content.webShop.title
    )
    expect(screen.getByText(content.webShop.subtitle)).toBeInTheDocument()

    content.webShop.categories.forEach((category) => {
      expect(
        screen.getByRole('tab', { name: category.label })
      ).toBeInTheDocument()
    })
  })

  it('renders overview content and demo link by default', () => {
    render(<WebShop />)

    const overview = content.webShop.categories[0]!
    expect(screen.getByText(overview.headline)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: overview.demos![0]!.ariaLabel })).toHaveAttribute(
      'href',
      overview.demos![0]!.url
    )
  })

  it('switches tab content when a tab is clicked', () => {
    render(<WebShop />)

    fireEvent.click(screen.getByRole('tab', { name: 'Technology' }))

    const technology = content.webShop.categories.find(
      (c) => c.name === 'technology'
    )!
    expect(screen.getByText(technology.headline)).toBeInTheDocument()
    expect(screen.getByText(technology.body)).toBeInTheDocument()
  })

  it('renders features and pricing tabs with expected content', () => {
    render(<WebShop />)

    fireEvent.click(screen.getByRole('tab', { name: 'Features' }))
    const features = content.webShop.categories.find(
      (c) => c.name === 'features'
    )!
    expect(screen.getByText(features.headline)).toBeInTheDocument()
    expect(
      screen.getAllByText(
        `(${content.webShop.ariaLabels.comingSoon.toLowerCase()})`
      )
    ).toHaveLength(2)

    fireEvent.click(screen.getByRole('tab', { name: 'Pricing' }))
    const pricing = content.webShop.categories.find(
      (c) => c.name === 'pricing'
    )!
    expect(screen.getByText(pricing.plans![0]!.name)).toBeInTheDocument()
    expect(screen.getByText(pricing.body)).toBeInTheDocument()
  })

  it('exposes web-shop section id for navigation', () => {
    const { container } = render(<WebShop />)

    expect(container.querySelector(`#${SECTIONS.WEB_SHOP}`)).toBeInTheDocument()
  })

  it('scrolls to contact when Get in Touch is clicked', () => {
    render(<WebShop />)

    fireEvent.click(
      screen.getByRole('button', {
        name: content.webShop.cta.contact.ariaLabel
      })
    )

    expect(scrollToSection).toHaveBeenCalledWith(SECTIONS.CONTACT)
  })
})
