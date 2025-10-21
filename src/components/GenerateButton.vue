<template>
  <button
    @click="handleClick"
    :disabled="disabled || isLoading"
    class="generate-button"
    :class="{ 'is-loading': isLoading }"
  >
    <span v-if="!isLoading">{{ text }}</span>
    <span v-else class="loading-content">
      <span class="spinner"></span>
      {{ loadingText }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  loadingText?: string
  disabled?: boolean
  isLoading?: boolean
}

interface Emits {
  (e: 'click'): void
}

withDefaults(defineProps<Props>(), {
  text: 'Generate Crate',
  loadingText: 'Generating...',
  disabled: false,
  isLoading: false,
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.generate-button {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);
}

.generate-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #0056b3 0%, #004494 100%);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
  transform: translateY(-2px);
}

.generate-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
}

.generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #6c757d;
  box-shadow: none;
}

.generate-button.is-loading {
  background: #6c757d;
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
