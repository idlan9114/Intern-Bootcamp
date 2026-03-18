import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import SubmitButton from './SubmitButton.vue'

describe('SubmitButton', () => {

  test('should render a submit button', () => {
    render(SubmitButton)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toBeTruthy()
  })

  test('should have type submit', () => {
    render(SubmitButton)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toHaveAttribute('type', 'submit')
  })

  test('should display correct text', () => {
    render(SubmitButton)
    expect(screen.getByText('Submit')).toBeTruthy()
  })

})