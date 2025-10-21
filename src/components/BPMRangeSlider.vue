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
          ref="minSlider"
          type="range"
          :min="absoluteMin"
          :max="absoluteMax"
          v-model.number="minBpm"
          @input="handleMinChange"
          class="slider slider-min"
        />
        <input
          ref="maxSlider"
          type="range"
          :min="absoluteMin"
          :max="absoluteMax"
          v-model.number="maxBpm"
          @input="handleMaxChange"
          class="slider slider-max"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

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
const minSlider = ref<HTMLInputElement | null>(null)
const maxSlider = ref<HTMLInputElement | null>(null)

const handleMinChange = () => {
  // Ensure minimum 5 BPM gap between min and max
  if (minBpm.value > maxBpm.value - 5) {
    minBpm.value = maxBpm.value - 5
  }
  
  // Ensure within bounds
  if (minBpm.value < props.absoluteMin) {
    minBpm.value = props.absoluteMin
  }
  
  emit('update:modelValue', { min: minBpm.value, max: maxBpm.value })
}

const handleMaxChange = () => {
  // Ensure minimum 5 BPM gap between min and max
  if (maxBpm.value < minBpm.value + 5) {
    maxBpm.value = minBpm.value + 5
  }
  
  // Ensure within bounds
  if (maxBpm.value > props.absoluteMax) {
    maxBpm.value = props.absoluteMax
  }
  
  emit('update:modelValue', { min: minBpm.value, max: maxBpm.value })
}

// Sync with external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue.min !== minBpm.value) {
    minBpm.value = newValue.min
  }
  if (newValue.max !== maxBpm.value) {
    maxBpm.value = newValue.max
  }
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
  width: 12px;
  height: 24px;
  background: white;
  cursor: pointer;
  border-radius: 6px;
  pointer-events: auto;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: -9px;
}

.slider::-moz-range-thumb {
  width: 12px;
  height: 24px;
  background: white;
  cursor: pointer;
  border-radius: 6px;
  pointer-events: auto;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: -9px;
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
  z-index: 3;
}

.slider-max {
  z-index: 4;
}
</style>
