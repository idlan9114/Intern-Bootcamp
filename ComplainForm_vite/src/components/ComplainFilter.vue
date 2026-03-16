<template>
  <search class="mb-4">
    <form @submit.prevent>
      <label for="complaint-search" class="sr-only">Search complaints</label>
      <input 
        id="complaint-search"
        v-model="store.searchQuery" 
        type="search" 
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Search complaints by name or ID..."
      >
    </form>
  </search>
</template>

<script setup lang="ts">
import { useComplainStore } from '../stores/complainStore'
const store = useComplainStore()
</script>
