<script setup lang="ts">
import CityName from '@/components/CityName.vue';

defineProps<{
  cityName: string,
  iconSrc: string,
  iconDescription: string,
  currentTemperature: number,
  feelsLikeTemperature: number,
}>()
</script>

<template>
  <header>
    <CityName :cityName="cityName"/>
    <img :src="iconSrc" :alt="iconDescription"/>
    Temperature: {{ currentTemperature }}&nbsp;°C (Feels like: {{ feelsLikeTemperature }}&nbsp;°C)
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
