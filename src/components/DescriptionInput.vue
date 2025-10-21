<template>
  <div class="description-input">
    <label for="description" class="input-label">Event Description</label>
    <textarea
      id="description"
      v-model="localValue"
      @input="handleInput"
      @keydown="handleKeydown"
      :placeholder="placeholder"
      class="description-textarea"
      rows="6"
    ></textarea>
    <div class="char-count" v-if="showCharCount">
      {{ localValue.length }} characters
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  showCharCount?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'enter'): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Describe your desired set... (ex. rooftop sunset, tech house, chill)',
  showCharCount: true,
})

const emit = defineEmits<Emits>()

const localValue = ref(props.modelValue)

const handleInput = () => {
  emit('update:modelValue', localValue.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    emit('enter')
  }
}

// Sync with external changes
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})
</script>

<style scoped>
.description-input {
  width: 100%;
}

.input-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.description-textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  color: #ffffff;
  background-color: #4a4a4a;
  border: 2px solid #5a5a5a;
  border-radius: 8px;
  resize: vertical;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.description-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

.description-textarea::placeholder {
  color: #8a8a8a;
}

.char-count {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #adb5bd;
  text-align: right;
}
</style>
