<script setup lang="ts">
interface Props {
  w?: number
  h?: number
  color?: string
  name: string
}

const props = defineProps<Props>()
const symbolId = computed(() => `#svg-icon-${props.name}`)
const w = computed(() => props.w || 80)
const h = computed(() => props.h || 80)
const color = computed(() => props.color || 'black')
</script>

<template>
  <svg :width="w" :height="h" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
