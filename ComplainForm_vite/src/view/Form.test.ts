import { render, screen, waitFor } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useComplainStore } from '../stores/complainStore'
import Form from './Form.vue'

describe('Form', () => {

  function renderForm() {
    return render(Form, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
  }

  test('should render all form fields', () => {
    renderForm()
    expect(screen.getByLabelText(/id/i)).toBeTruthy()
    expect(screen.getByLabelText(/name/i)).toBeTruthy()
    expect(screen.getByLabelText(/email/i)).toBeTruthy()
    expect(screen.getByLabelText(/description/i)).toBeTruthy()
  })

  test('should render submit button', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy()
  })

  test('should show error when name is empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeTruthy()
    })
  })

  test('should show error when email is empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => {
      expect(screen.getByText('Email is required.')).toBeTruthy()
    })
  })

  test('should show error when description is empty', async () => {
    renderForm()
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => {
      expect(screen.getByText('Description is required.')).toBeTruthy()
    })
  })

  test('should show error when ID does not start with CD', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/id/i), 'AB12345')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => {
      expect(screen.getByText('ID must start with CD*****')).toBeTruthy()
    })
  })

  test('should show error when email is invalid', async () => {
    renderForm()
    await userEvent.type(screen.getByLabelText(/email/i), 'notanemail')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeTruthy()
    })
  })

  test('should call submitComplain with correct values on valid submit', async () => {
    renderForm()
    const store = useComplainStore()

    await userEvent.type(screen.getByLabelText(/id/i), 'CD12345')
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/description/i), 'This is a complaint')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(store.submitComplain).toHaveBeenCalledWith({
        studentId: 'CD12345',
        name: 'John Doe',
        email: 'john@example.com',
        description: 'This is a complaint'
      })
    })
  })

  test('should reset form after successful submit', async () => {
    renderForm()

    await userEvent.type(screen.getByLabelText(/id/i), 'CD12345')
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/description/i), 'This is a complaint')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email/i)).toHaveValue('')
      expect(screen.getByLabelText(/description/i)).toHaveValue('')
    })
  })

})