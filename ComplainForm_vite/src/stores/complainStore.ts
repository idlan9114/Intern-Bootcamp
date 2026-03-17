import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Complaint {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  complaintText: string
  createdAt: number
}

export const useComplainStore = defineStore('complain', () => {
  const complaints = ref<Complaint[]>([])
  const searchQuery = ref('')

  const filteredComplaints = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return complaints.value.filter(c => 
      c.studentName.toLowerCase().includes(query) || 
      c.studentId.toLowerCase().includes(query)
    )
  })

  function submitComplain(data: { studentId: string; name: string; email: string; description: string }) {
    complaints.value.push({
      id: crypto.randomUUID(),
      studentId: data.studentId,
      studentName: data.name,
      studentEmail: data.email,
      complaintText: data.description,
      createdAt: Date.now()
    })
  }

  function deleteComplaint(id: string) {
    complaints.value = complaints.value.filter(c => c.id !== id)
  }

  return { complaints, searchQuery, filteredComplaints, submitComplain, deleteComplaint }
})
