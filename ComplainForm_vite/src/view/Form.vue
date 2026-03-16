<script setup lang="ts">
import { ref } from 'vue'
import { useComplainStore } from '../stores/complainStore'

const store = useComplainStore()

const studentId = ref('')
const name = ref('')
const email = ref('')
const description = ref('')

function handleSubmit() {
  if (!studentId.value || !name.value || !email.value || !description.value) {
    alert('Please fill in all fields.')
    return
  }

  store.submitComplain({
    studentId: studentId.value,
    name: name.value,
    email: email.value,
    description: description.value,
  })

  studentId.value = ''
  name.value = ''
  email.value = ''
  description.value = ''

  alert('Complaint submitted!')
}
</script>

<template>
  <main class="w-screen h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Student Complaint Form</h3>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">

        <div class="flex flex-col gap-1">
          <label for="studentId" class="text-sm font-medium text-gray-700">ID</label>
          <input id="studentId" v-model="studentId" type="text" placeholder="Enter your ID..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm font-medium text-gray-700">Name</label>
          <input id="name" v-model="name" type="text" placeholder="Enter your name..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700">Email</label>
          <input id="email" v-model="email" type="text" placeholder="Enter your email..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="description" class="text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
          <textarea id="description" v-model="description" rows="4" placeholder="Enter a description..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        </div>

        <button type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer">
          Submit
        </button>

      </form>
    </div>
  </main>
</template>