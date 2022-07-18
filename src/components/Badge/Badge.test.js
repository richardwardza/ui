import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

const SIZES = ['small', 'large']
const COLORS = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
]

describe('#Badge', () => {
  it('should render component correctly', () => {
    const wrapper = render(<Badge>Badge</Badge>)
    expect(screen.getByText('Badge')).toBeInTheDocument()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render different text', () => {
    const wrapper = render(<Badge>Badge</Badge>)
    expect(screen.getByText('Badge')).toBeInTheDocument()
    wrapper.rerender(<Badge>徽章</Badge>)
    expect(screen.getByText('徽章')).toBeInTheDocument()
  })

  it('should render with dot', () => {
    const wrapper = render(<Badge dot={true}>Badge</Badge>)
    expect(screen.getByText('Badge')).toBeInTheDocument()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it.each(COLORS)('should have %s color', (color) => {
    render(<Badge color={color}>{color}</Badge>)
    expect(screen.getByText(color)).toHaveClass(
      `bg-${color}-200 text-${color}-1100 border-${color}-700`
    )
  })

  it.each(SIZES)('should render with %s size', (size) => {
    render(<Badge size={size}>{size}</Badge>)
    expect(screen.getByText(size)).toHaveClass(
      `px-2.5 py-0.5 rounded-full text-xs ${
        size === 'large' ? 'px-3 py-0.5 rounded-full text-sm' : ''
      }`
    )
  })

  it('should render with Classes',()=>{
    render(<Badge className='border-2'>Badge</Badge>)
    expect(screen.getByText('Badge')).toHaveClass('border-2')
  })
})
