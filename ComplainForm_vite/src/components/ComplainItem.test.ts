import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useComplainStore } from '../stores/complainStore'
import ComplainItem from './ComplainItem.vue'

// fake complaint data
const mockComplaint = {
  id: '123',
  studentId: 'CD12345',
  studentName: 'John Doe',
  studentEmail: 'john@example.com',
  complaintText: 'This is a test complaint',
  createdAt: Date.now()
}

describe('ComplainItem', () => {

  test('should render student name', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  test('should render student ID', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    expect(screen.getByText(/CD12345/)).toBeTruthy()
  })

  test('should render student email', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    expect(screen.getByText('john@example.com')).toBeTruthy()
  })

  test('should render complaint text', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    expect(screen.getByText('This is a test complaint')).toBeTruthy()
  })

  test('should render email as mailto link', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    const emailLink = screen.getByText('john@example.com')
    expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com')
  })

  test('should render delete button', () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia()] }
    })
    expect(screen.getByRole('button', { name: /delete complaint/i })).toBeTruthy()
  })

  test('should call deleteComplaint with correct id when delete is clicked', async () => {
    render(ComplainItem, {
      props: { complaint: mockComplaint },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] }
    })

    const store = useComplainStore()
    const deleteButton = screen.getByRole('button', { name: /delete complaint/i })

    await userEvent.click(deleteButton)

    expect(store.deleteComplaint).toHaveBeenCalledWith('123')
  })

})