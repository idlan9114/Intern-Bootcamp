<template>
  <section aria-labelledby="complaints-heading">
    <header>
      <h2 id="complaints-heading" class="sr-only">Complaints List</h2>
      <ComplainFilter />
    </header>
    
    <div v-if="store.filteredComplaints.length === 0" class="text-center p-8 text-gray-500 bg-gray-50 rounded-md border border-gray-200" role="status">
      <p>No complaints found.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
      <ComplainItem 
        v-for="complaint in store.filteredComplaints" 
        :key="complaint.id" 
        :complaint="complaint"
        role="listitem"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useComplainStore } from '../stores/complainStore'
import ComplainFilter from './ComplainFilter.vue'
import ComplainItem from './ComplainItem.vue'

const store = useComplainStore()
</script>
