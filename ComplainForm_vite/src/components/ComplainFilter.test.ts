import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useComplainStore } from '../stores/complainStore'
import ComplainFilter from './ComplainFilter.vue'

describe('ComplainFilter', () => {

  test('should render search input', () => {
    render(ComplainFilter, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    expect(screen.getByRole('searchbox')).toBeTruthy()
  })

  test('should render correct placeholder', () => {
    render(ComplainFilter, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    expect(screen.getByPlaceholderText('Search complaints by name or ID...')).toBeTruthy()
  })

  test('should update store searchQuery when user types', async () => {
    const { getByRole } = render(ComplainFilter, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    const store = useComplainStore()
    const input = getByRole('searchbox')

    await userEvent.type(input, 'John')

    expect(store.searchQuery).toBe('John')
  })

})