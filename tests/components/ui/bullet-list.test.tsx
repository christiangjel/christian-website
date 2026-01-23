import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BulletList } from '@/components/ui/bullet-list'

describe('BulletList', () => {
  it('renders items correctly', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']
    render(<BulletList items={items} />)

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('handles grid layout', () => {
    const { container } = render(
      <BulletList items={['Item 1']} layout='grid' />
    )
    expect(container.querySelector('.grid')).toBeInTheDocument()
  })

  it('handles object items with level', () => {
    const items = [
      { name: 'Language 1', level: 'Native' },
      { name: 'Language 2', level: 'Fluent' }
    ]
    render(<BulletList items={items} />)

    expect(screen.getByText('Language 1 (Native)')).toBeInTheDocument()
    expect(screen.getByText('Language 2 (Fluent)')).toBeInTheDocument()
  })
})
