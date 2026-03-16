<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
    <!-- Top Navigation Bar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <!-- Brand Icon -->
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-800 leading-tight">Admin Portal</h1>
            <p class="text-xs text-slate-500 font-medium">Student Complaints System</p>
          </div>
        </div>
        
        <!-- User Profile Area -->
        <div class="flex items-center space-x-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-inner">
            A
          </div>
          <span class="text-sm font-semibold text-slate-700 hidden sm:block pr-2">Admin User</span>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-slate-100 p-4 sm:p-7 overflow-hidden">
        <div class="pb-5 border-b border-slate-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
           <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Recent Complaints</h2>
           <div class="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-1.5">
             <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Live Feed
           </div>
        </div>
        
        <ComplainList class="flex-1 w-full" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ComplainList from '../components/ComplainList.vue'
</script>
