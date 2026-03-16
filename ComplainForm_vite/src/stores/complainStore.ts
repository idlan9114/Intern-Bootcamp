import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Complain {
  id: string
  studentId: string
  name: string
  email: string
  description: string
  submittedAt: string
}

export const useComplainStore = defineStore('complain', () => {
  const complains = ref<Complain[]>([])

  function submitComplain(data: Omit<Complain, 'id' | 'submittedAt'>) {
    const newComplain: Complain = {
      id: crypto.randomUUID(),
      ...data,
      submittedAt: new Date().toISOString()
    }
    complains.value.push(newComplain)
  }

  return { complains, submitComplain }
})