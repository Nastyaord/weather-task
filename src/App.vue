<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CITY_NAME } from './constants';
import { getCityInfo, getWeatherByCityName } from './api';

import TheSpinner from '@/components/TheSpinner.vue';
import CityDescription from '@/components/CityDescription.vue'
import WeatherHeader from '@/components/WeatherHeader.vue'

const isLoading = ref(true);

let weatherData = ref()
let cityInfo = ref()

onMounted(async () => {
  isLoading.value = true;

  try {
    [weatherData.value, cityInfo.value] = await Promise.all([
      getWeatherByCityName(CITY_NAME),
      getCityInfo(CITY_NAME)
    ]);
  } catch (error) {
    // TODO: ADD TOAST FOR USER NOTIFICATION
    alert(`Помилка при завантаженні даних: ${error}`);
  } finally {
    isLoading.value = false;
  }
})

const cityDescription = computed(() => {
  const pages = cityInfo.value?.query?.pages;

  if (!pages) return '';

  return Object.values(pages)[0]?.extract || '';
});

const weatherDataCurrent = computed(() => {
  return weatherData.value?.current
})

const iconSrc = computed(() => {
  return weatherDataCurrent.value?.condition?.icon || ''
})

const iconDescription = computed(() => {
  return weatherDataCurrent.value?.condition?.text || ''
})

const currentTemperature = computed(() => {
  return weatherDataCurrent.value.temp_c || ''
})

const feelsLikeTemperature = computed(() => {
  return weatherDataCurrent.value.feelslike_c || ''
})
</script>

<template>
  <TheSpinner :cityName="CITY_NAME" v-if="isLoading"/>
  <div v-else>
    <WeatherHeader :cityName="CITY_NAME" :alt="iconDescription" :currentTemperature="currentTemperature"
                   :feelsLikeTemperature="feelsLikeTemperature" iconDescription="iconDescription" :iconSrc="iconSrc"/>
    <CityDescription :description="cityDescription"/>
  </div>
</template>
