<script setup lang="ts">
import {login} from '@/api'

login('admin', 'e+9DrLsJaxHRT4XIHOicoNagV+BtgfoIYcW5oj8X8Ut+9dnOMFGnQaSNvFdPdVj4xSIF829d7uQp2WSQdNqc4g==', '1', 'captcha-code:e090ad0f1d6941398a77cb6de2061e98').then(res => {
  console.log(res)
})
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
