<script setup lang="ts">
</script>

<template>
    <nav class="bg-white shadow px-6 py-4 flex gap-4">

        <router-link 
          to="/" 
          class="text-blue-600 hover:text-blue-800 font-medium"
          active-class="underline font-bold">
            Form
        </router-link>

        <router-link 
          to="/admin" 
          class="text-blue-600 hover:text-blue-800 font-medium"
          active-class="underline font-bold">
            Admin
        </router-link>

    </nav>
</template>
