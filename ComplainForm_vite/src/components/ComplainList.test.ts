import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useComplainStore } from '../stores/complainStore'
import ComplainList from './ComplainList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div/>' } },
    { path: '/admin', component: { template: '<div/>' } }
  ]
})

const mockComplaints = [
  {
    id: '1',
    studentId: 'CD11111',
    studentName: 'John Doe',
    studentEmail: 'john@example.com',
    complaintText: 'First complaint',
    createdAt: Date.now()
  },
  {
    id: '2',
    studentId: 'CD22222',
    studentName: 'Jane Smith',
    studentEmail: 'jane@example.com',
    complaintText: 'Second complaint',
    createdAt: Date.now()
  }
]

describe('ComplainList', () => {

  test('should show empty message when no complaints', () => {
    render(ComplainList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              complain: {
                complaints: [],
                searchQuery: ''
              }
            }
          }),
          router
        ]
      }
    })

    expect(screen.getByText('No complaints found.')).toBeTruthy()
  })

  test('should render complaints when store has data', async () => {
    render(ComplainList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              complain: {
                complaints: mockComplaints,
                searchQuery: ''
              }
            }
          }),
          router
        ]
      }
    })

    await router.isReady()

    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('Jane Smith')).toBeTruthy()
  })

  test('should render correct number of complaint items', async () => {
    render(ComplainList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              complain: {
                complaints: mockComplaints,
                searchQuery: ''
              }
            }
          }),
          router
        ]
      }
    })

    await router.isReady()

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })

  test('should render search filter', () => {
    render(ComplainList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              complain: {
                complaints: [],
                searchQuery: ''
              }
            }
          }),
          router
        ]
      }
    })

    expect(screen.getByRole('searchbox')).toBeTruthy()
  })

})