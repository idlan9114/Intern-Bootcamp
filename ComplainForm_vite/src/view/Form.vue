<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useComplainStore } from '../stores/complainStore'
import SubmitButton from '../components/SubmitButton.vue'

const store = useComplainStore()


const schema = toTypedSchema(z.object({
  studentId: z.string().min(1, 'Student ID is required.').trim(),
  name: z.string().min(1, 'Name is required.').trim(),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.').trim(),
  description: z.string().min(1, 'Description is required.').trim(),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    studentId: '',
    name: '',
    email: '',
    description: '',
  }
})

const { value: studentId, errorMessage: studentIdError } = useField<string>('studentId')
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: description, errorMessage: descriptionError } = useField<string>('description')

const onSubmit = handleSubmit((values) => {
  store.submitComplain({
    studentId: values.studentId,
    name: values.name,
    email: values.email,
    description: values.description,
  })

  resetForm()
  alert('Complaint submitted successfully!')
})
</script>

<template>
  <main class="max-w-screen min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mb-10">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Student Complaint Form</h3>

      <form @submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="studentId" class="text-sm font-medium text-gray-700">
            ID <span class="text-red-500">*</span>
          </label>
          <input
            id="studentId"
            v-model="studentId"
            type="text"
            placeholder="Enter your ID..."
            class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          />
          <p v-if="studentIdError" class="text-red-500 text-xs">{{ studentIdError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm font-medium text-gray-700">
            Name <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your name..."
            class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          />
          <p v-if="nameError" class="text-red-500 text-xs">{{ nameError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email..."
            class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
          />
          <p v-if="emailError" class="text-red-500 text-xs">{{ emailError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="description" class="text-sm font-medium text-gray-700">
            Description <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="description"
            rows="4"
            placeholder="Enter a description..."
            class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
          ></textarea>
          <p v-if="descriptionError" class="text-red-500 text-xs">{{ descriptionError }}</p>
        </div>

        <SubmitButton/>
      </form>
    </div>
  </main>
</template>