<template>
  <div class="chat-message" :class="{ 'user-message': isUser, 'ai-message': !isUser }">
    <div class="message-header">
      <span class="message-sender">{{ isUser ? 'You' : 'CratePilot AI' }}</span>
      <span class="message-time">{{ formatTime(timestamp) }}</span>
    </div>
    <div class="message-content">
      {{ content }}
    </div>
    
    <!-- Crate display if crate data exists -->
    <div v-if="crate" class="crate-preview">
      <div class="crate-header">
        <h4>{{ crate.name }}</h4>
        <span class="track-count">{{ crate.tracks.length }} tracks</span>
      </div>
      
      <div class="album-covers">
        <div 
          v-for="track in crate.tracks.slice(0, 6)" 
          :key="track.id"
          class="album-cover-container"
        >
          <img 
            v-if="track.albumCover && track.albumCover !== ''" 
            :src="track.albumCover" 
            :alt="track.title"
            class="album-cover"
            @error="handleImageError"
          />
          <DefaultTrackCover v-else class="album-cover" />
        </div>
        <div v-if="crate.tracks.length > 6" class="more-albums">
          +{{ crate.tracks.length - 6 }}
        </div>
      </div>
      
      <button @click="$emit('view-crate', crate)" class="view-button">
        View Crate
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultTrackCover from './DefaultTrackCover.vue'

interface Track {
  id: string
  title: string
  artist: string
  albumCover: string | null
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

interface Props {
  content: string
  isUser: boolean
  timestamp: Date
  crate?: Crate
}

interface Emits {
  (e: 'view-crate', crate: Crate): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<style scoped>
.chat-message {
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  max-width: 80%;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  background: #4a4a4a;
  margin-left: auto;
  border: 1px solid #5a5a5a;
}

.ai-message {
  background: #3a3a3a;
  margin-right: auto;
  border: 1px solid #ff4500;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.message-sender {
  font-weight: 600;
  color: #ffffff;
}

.user-message .message-sender {
  color: #ffffff;
}

.ai-message .message-sender {
  color: #ff4500;
}

.message-time {
  color: #adb5bd;
  font-size: 0.75rem;
}

.message-content {
  color: #ffffff;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.crate-preview {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #4a4a4a;
}

.crate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.crate-header h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.track-count {
  color: #adb5bd;
  font-size: 0.875rem;
}

.album-covers {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.album-cover {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #5a5a5a;
  transition: transform 0.2s, box-shadow 0.2s;
}

.album-cover:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
  border-color: #ff4500;
}

.more-albums {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a4a4a;
  border-radius: 6px;
  border: 1px solid #5a5a5a;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
}

.view-button {
  width: 100%;
  background: transparent;
  border: 2px solid #ff4500;
  color: #ff4500;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
}

.view-button:hover {
  background: #ff4500;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
}

@media (max-width: 768px) {
  .chat-message {
    max-width: 90%;
  }
  
  .album-covers {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
}
</style>

