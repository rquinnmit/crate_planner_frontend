<template>
  <div class="prompt-box">
    <div class="prompt-box-header">
      <h2>Create Your Crate</h2>
      <p>Describe your event and let AI generate the perfect track list</p>
    </div>
    
    <div class="prompt-box-content">
      <DescriptionInput
        v-model="description"
        @enter="handleGenerate"
        class="prompt-section"
      />
      
      <BPMRangeSlider
        v-model="bpmRange"
        class="prompt-section"
      />
      
      <GenerateButton
        @click="handleGenerate"
        :disabled="!isValid"
        :is-loading="isGenerating"
        class="prompt-section"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DescriptionInput from './DescriptionInput.vue'
import BPMRangeSlider from './BPMRangeSlider.vue'
import GenerateButton from './GenerateButton.vue'

interface PromptData {
  description: string
  bpmRange: { min: number; max: number }
}

interface Emits {
  (e: 'generate', data: PromptData): void
}

const emit = defineEmits<Emits>()

// Reactive state
const description = ref('')
const bpmRange = ref({ min: 120, max: 128 })
const isGenerating = ref(false)

// Computed validation
const isValid = computed(() => {
  return description.value.trim().length > 0
})

// Handle generate action
const handleGenerate = () => {
  if (!isValid.value || isGenerating.value) return
  
  isGenerating.value = true
  
  emit('generate', {
    description: description.value,
    bpmRange: bpmRange.value,
  })
  
  // Reset loading state after a brief delay (parent will handle actual loading)
  setTimeout(() => {
    isGenerating.value = false
  }, 500)
}

// Expose method to reset form if needed
defineExpose({
  reset: () => {
    description.value = ''
    bpmRange.value = { min: 120, max: 128 }
    isGenerating.value = false
  }
})
</script>

<style scoped>
.prompt-box {
  background: #3a3a3a;
  border-radius: 16px;
  border: 2px solid #ff4500;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 2.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.prompt-box-header {
  text-align: center;
  margin-bottom: 2rem;
}

.prompt-box-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.prompt-box-header p {
  font-size: 1rem;
  color: #adb5bd;
  margin: 0;
}

.prompt-box-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.prompt-section {
  width: 100%;
}

@media (max-width: 768px) {
  .prompt-box {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .prompt-box-header h2 {
    font-size: 1.5rem;
  }
}
</style>
