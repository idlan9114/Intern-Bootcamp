import { render, screen } from '@testing-library/vue'
import { describe, test, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from './Navbar.vue'

// create a fake router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Form</div>' } },
    { path: '/admin', component: { template: '<div>Admin</div>' } }
  ]
})

describe('Navbar', () => {

  test('should render Form link', async () => {
    render(Navbar, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    expect(screen.getByText('Form')).toBeTruthy()
  })

  test('should render Admin link', async () => {
    render(Navbar, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    expect(screen.getByText('Admin')).toBeTruthy()
  })

  test('should have correct href for Form link', async () => {
    render(Navbar, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    const formLink = screen.getByText('Form')
    expect(formLink).toHaveAttribute('href', '/')
  })

  test('should have correct href for Admin link', async () => {
    render(Navbar, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    const adminLink = screen.getByText('Admin')
    expect(adminLink).toHaveAttribute('href', '/admin')
  })

})