<template>
  <div class="chat-interface">
    <div class="chat-messages" ref="messagesContainer">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :content="message.content"
        :is-user="message.isUser"
        :timestamp="message.timestamp"
        :crate="message.crate"
        @view-crate="handleViewCrate"
      />
      
      <div v-if="isThinking" class="thinking-indicator">
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
        <span class="thinking-text">CratePilot is thinking...</span>
      </div>
    </div>
    
    <!-- Fixed input at bottom -->
    <div class="fixed-input-container">
      <div class="input-wrapper">
        <textarea
          v-model="userInput"
          @keydown.enter="handleSend"
          placeholder="Send a message to CratePilot..."
          class="chat-input"
          rows="1"
        />
        <button @click="handleSend" class="send-button" :disabled="!userInput.trim()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13"/>
            <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Crate Modal -->
    <CrateModal 
      v-if="selectedCrate" 
      :crate="selectedCrate" 
      @close="selectedCrate = null"
      @export="handleExportCrate"
      @finish="handleFinishCrate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import ChatMessage from './ChatMessage.vue'
import CrateModal from './CrateModal.vue'

interface Track {
  id: string
  title: string
  artist: string
  albumCover: string
  bpm: number
  duration: number
}

interface Crate {
  id: string
  name: string
  description: string
  tracks: Track[]
  bpmRange: { min: number; max: number }
  totalDuration: number
}

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  crate?: Crate
}

interface Props {
  messages: Message[]
  isThinking?: boolean
}

interface Emits {
  (e: 'sendMessage', message: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const userInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const selectedCrate = ref<Crate | null>(null)

const handleSend = (event?: KeyboardEvent) => {
  if (event && event.shiftKey) {
    return // Allow new line with Shift+Enter
  }
  
  if (event) {
    event.preventDefault()
  }
  
  const message = userInput.value.trim()
  if (message) {
    emit('sendMessage', message)
    userInput.value = ''
  }
}

const handleViewCrate = (crate: Crate) => {
  selectedCrate.value = crate
}

const handleExportCrate = () => {
  if (selectedCrate.value) {
    console.log('Exporting crate:', selectedCrate.value)
    // TODO: Implement export functionality
    // This could export to various formats like JSON, CSV, or integrate with DJ software
    alert(`Exporting crate: ${selectedCrate.value.name}`)
  }
}

const handleFinishCrate = () => {
  if (selectedCrate.value) {
    console.log('Finishing crate:', selectedCrate.value)
    // TODO: Implement finish functionality
    // This could save the crate to the library or mark it as complete
    alert(`Crate "${selectedCrate.value.name}" has been finished and saved!`)
    selectedCrate.value = null
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, () => {
  scrollToBottom()
})

watch(() => props.isThinking, () => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: 100px; /* Space for fixed input */
  display: flex;
  flex-direction: column;
  gap: 0;
}

.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}

.thinking-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #3a3a3a;
  border: 1px solid #ff4500;
  border-radius: 12px;
  max-width: 80%;
  margin-right: auto;
}

.thinking-dot {
  width: 8px;
  height: 8px;
  background: #ff4500;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

.thinking-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.thinking-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.thinking-text {
  color: #adb5bd;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

    .fixed-input-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem 2rem;
      background: transparent;
      display: flex;
      justify-content: center;
      z-index: 1000;
    }

    .input-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 0.75rem;
      background: #3a3a3a;
      border: 2px solid #5a5a5a;
      border-radius: 16px;
      padding: 0.75rem;
      max-width: 1200px;
      width: 100%;
      transition: border-color 0.2s;
    }

    .input-wrapper:focus-within {
      border-color: #ff4500;
    }

    .chat-input {
      flex: 1;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0.5rem;
      color: #ffffff;
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      resize: none;
      min-height: 60px;
      max-height: 180px;
      overflow-y: auto;
      outline: none;
    }


.chat-input::placeholder {
  color: #8a8a8a;
}

    .send-button {
      background: #ff4500;
      border: none;
      border-radius: 12px;
      padding: 0.75rem;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 48px;
      flex-shrink: 0;
    }

.send-button:hover:not(:disabled) {
  background: #ff5722;
  transform: translateY(-2px);
}

.send-button:disabled {
  background: #4a4a4a;
  cursor: not-allowed;
  opacity: 0.5;
}

.send-button svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

@media (max-width: 768px) {
  .chat-messages {
    padding: 1rem;
    padding-bottom: 100px;
  }
  
  .fixed-input-container {
    padding: 1rem;
  }
}
</style>

