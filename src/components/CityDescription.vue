<script setup lang="ts">

defineProps<{
  description: string,
}>()

</script>

<template>
  <main>
    <div class="wrapper">
      <div v-html="description"/>
    </div>
  </main>
</template>
