import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import Admin from './Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div/>' } },
    { path: '/admin', component: { template: '<div/>' } }
  ]
})

describe('Admin', () => {

  function renderAdmin() {
    return render(Admin, {
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
  }

  test('should render Admin Portal heading', async () => {
    renderAdmin()
    await router.isReady()
    expect(screen.getByText('Admin Portal')).toBeTruthy()
  })

  test('should render Recent Complaints heading', async () => {
    renderAdmin()
    await router.isReady()
    expect(screen.getByText('Recent Complaints')).toBeTruthy()
  })

  test('should render search filter', async () => {
    renderAdmin()
    await router.isReady()
    expect(screen.getByRole('searchbox')).toBeTruthy()
  })

  test('should show empty message when no complaints', async () => {
    renderAdmin()
    await router.isReady()
    expect(screen.getByText('No complaints found.')).toBeTruthy()
  })

})