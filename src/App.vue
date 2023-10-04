<template>
  <header class="flex justify-center bg-violet-800">
    <div class="h-16 text-center w-[50%] justify-center">
      <router-link
        :to="{ name: 'weather' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-gray-400 hover:text-white w-20 text-white delay-400"
      >
        Weather
      </router-link>
      <router-link
        :to="{ name: 'todo' }"
        class="inline-flex items-center px-5 h-full transition-colors hover:bg-gray-400 hover:text-white w-20 text-center text-white delay-400"
      >
        Todo
      </router-link>
    </div>
  </header>

  <div class="w-full">
    <router-view />
  </div>
</template>

<script setup></script>
