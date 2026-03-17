<template>
  <article class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
    <header class="flex justify-between items-start mb-3">
      <hgroup>
        <h3 class="font-bold text-gray-900">{{ complaint.studentName }}</h3>
        <p class="text-sm text-gray-500">
          <span>ID: <time>{{ complaint.studentId }}</time></span> | 
          <a :href="'mailto:' + complaint.studentEmail" class="hover:underline">{{ complaint.studentEmail }}</a>
        </p>
      </hgroup>
      <button 
        @click="store.deleteComplaint(complaint.id)"
        class="text-red-500 hover:text-red-700 text-sm font-medium"
        aria-label="Delete complaint"
      >
        Delete
      </button>
    </header>
    
    <div class="bg-gray-50 p-3 rounded text-gray-700 text-sm flex-1 whitespace-pre-wrap break-words overflow-hidden">
      <p>{{ complaint.complaintText }}</p>
    </div>
    
    <footer class="mt-3 text-xs text-gray-400">
      <p>Logged on: <time :datetime="new Date(complaint.createdAt).toISOString()">{{ new Date(complaint.createdAt).toLocaleString() }}</time></p>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { useComplainStore, type Complaint } from '../stores/complainStore'

defineProps<{
  complaint: Complaint
}>()

const store = useComplainStore()
</script>
