import { defineStore } from 'pinia'

// Define the shape of a complaint
export interface Complaint {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  complaintText: string
  createdAt: number
}

export const useComplainStore = defineStore('complain', {
  state: () => ({
    // Initialize an empty array of complaints
    complaints: [] as Complaint[],
    // Search query used for filtering the list
    searchQuery: ''
  }),
  getters: {
    // Getter to return the filtered list of complaints based on the search query
    filteredComplaints: (state) => {
      if (!state.searchQuery) return state.complaints
      
      const query = state.searchQuery.toLowerCase()
      // Filter by student name or student ID
      return state.complaints.filter(c => 
        c.studentName.toLowerCase().includes(query) || 
        c.studentId.toLowerCase().includes(query)
      )
    }
  },
  actions: {
    // Action to add a new complaint to the list
    addComplaint(complaintData: Omit<Complaint, 'id' | 'createdAt'>) {
      const newComplaint: Complaint = {
        ...complaintData,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), // Generate a unique ID
        createdAt: Date.now() // Track when it was created
      }
      this.complaints.push(newComplaint)
    },
    // Action to delete a complaint by its ID
    deleteComplaint(id: string) {
      this.complaints = this.complaints.filter(c => c.id !== id)
    },
    // Action to update the search query
    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  }
})