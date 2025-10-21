<template>
  <div class="bpm-range-slider">
    <label class="slider-label">BPM Range</label>
    <div class="slider-container">
      <div class="slider-values">
        <span class="value-display">{{ minBpm }}</span>
        <span class="value-separator">-</span>
        <span class="value-display">{{ maxBpm }}</span>
      </div>
      <div class="slider-inputs">
        <input
          type="range"
          :min="absoluteMin"
          :max="absoluteMax"
          :value="minBpm"
          @input="handleMinChange"
          class="slider slider-min"
        />
        <input
          type="range"
          :min="absoluteMin"
          :max="absoluteMax"
          :value="maxBpm"
          @input="handleMaxChange"
          class="slider slider-max"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: { min: number; max: number }
  absoluteMin?: number
  absoluteMax?: number
}

interface Emits {
  (e: 'update:modelValue', value: { min: number; max: number }): void
}

const props = withDefaults(defineProps<Props>(), {
  absoluteMin: 60,
  absoluteMax: 200,
})

const emit = defineEmits<Emits>()

const minBpm = ref(props.modelValue.min)
const maxBpm = ref(props.modelValue.max)

const handleMinChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newMin = parseInt(target.value)
  
  if (newMin <= maxBpm.value) {
    minBpm.value = newMin
    emit('update:modelValue', { min: minBpm.value, max: maxBpm.value })
  }
}

const handleMaxChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newMax = parseInt(target.value)
  
  if (newMax >= minBpm.value) {
    maxBpm.value = newMax
    emit('update:modelValue', { min: minBpm.value, max: maxBpm.value })
  }
}

// Sync with external changes
watch(() => props.modelValue, (newValue) => {
  minBpm.value = newValue.min
  maxBpm.value = newValue.max
}, { deep: true })
</script>

<style scoped>
.bpm-range-slider {
  width: 100%;
}

.slider-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.slider-container {
  width: 100%;
}

.slider-values {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.value-display {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6c757d;
  min-width: 50px;
  text-align: center;
}

.value-separator {
  font-size: 1.25rem;
  color: #adb5bd;
}

.slider-inputs {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.slider {
  position: absolute;
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #007bff;
  cursor: pointer;
  border-radius: 50%;
  pointer-events: auto;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: -7px;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #007bff;
  cursor: pointer;
  border-radius: 50%;
  pointer-events: auto;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: -7px;
}

.slider-min::-webkit-slider-thumb {
  background: #1e7e34;
}

.slider-min::-moz-range-thumb {
  background: #1e7e34;
}

.slider-max::-webkit-slider-thumb {
  background: #b02a37;
}

.slider-max::-moz-range-thumb {
  background: #b02a37;
}

.slider-inputs::before {
  content: '';
  position: absolute;
  height: 6px;
  background: #5a5a5a;
  border-radius: 3px;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
}

.slider-min {
  z-index: 2;
}

.slider-max {
  z-index: 1;
}
</style>
