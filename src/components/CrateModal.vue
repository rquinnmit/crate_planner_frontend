<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="modal-header">
        <h2>{{ crate.name }}</h2>
        <p class="crate-description">{{ crate.description }}</p>
      </div>
      
      <div class="modal-body">
        <div class="crate-info">
          <div class="info-item">
            <span class="info-label">Tracks:</span>
            <span class="info-value">{{ crate.tracks.length }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">BPM Range:</span>
            <span class="info-value">{{ crate.bpmRange.min }} - {{ crate.bpmRange.max }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Total Duration:</span>
            <span class="info-value">{{ formatDuration(crate.totalDuration) }}</span>
          </div>
        </div>
        
        <div class="tracks-list">
          <h3>Tracks</h3>
          <div v-for="(track, index) in crate.tracks" :key="track.id" class="track-item">
            <div class="track-number">{{ index + 1 }}</div>
            <img :src="track.albumCover" :alt="track.title" class="track-album-cover" />
            <div class="track-info">
              <div class="track-title">{{ track.title }}</div>
              <div class="track-artist">{{ track.artist }}</div>
            </div>
            <div class="track-meta">
              <span class="track-bpm">{{ track.bpm }} BPM</span>
              <span class="track-duration">{{ formatDuration(track.duration) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="$emit('export')" class="export-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export Crate
        </button>
        <button @click="$emit('finish')" class="finish-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

interface Props {
  crate: Crate
}

interface Emits {
  (e: 'close'): void
  (e: 'export'): void
  (e: 'finish'): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: #2a2a2a;
  border: 2px solid #ff4500;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}

.close-button:hover {
  color: #ff4500;
  transform: rotate(90deg);
}

.close-button svg {
  width: 24px;
  height: 24px;
}

.modal-header {
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #4a4a4a;
}

.modal-header h2 {
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.crate-description {
  color: #adb5bd;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

.modal-body {
  padding: 1.5rem 2rem 2rem 2rem;
}

.crate-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  color: #adb5bd;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
}

.tracks-list h3 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.track-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #3a3a3a;
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.track-item:hover {
  background: #4a4a4a;
  border-color: #5a5a5a;
}

.track-number {
  color: #adb5bd;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.track-album-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-title {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  color: #adb5bd;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.track-bpm {
  color: #ff4500;
  font-size: 0.875rem;
  font-weight: 600;
}

.track-duration {
  color: #adb5bd;
  font-size: 0.875rem;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #4a4a4a;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.export-button {
  background: transparent;
  border: 2px solid #adb5bd;
  color: #adb5bd;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.export-button:hover {
  background: #adb5bd;
  color: #2a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(173, 181, 189, 0.3);
}

.finish-button {
  background: #ff4500;
  border: 2px solid #ff4500;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.finish-button:hover {
  background: #ff5722;
  border-color: #ff5722;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
}

.export-button svg,
.finish-button svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-footer {
    padding: 1rem;
    flex-direction: column;
  }
  
  .close-button {
    top: 1rem;
    right: 1rem;
  }
  
  .crate-info {
    gap: 1rem;
  }
  
  .track-item {
    gap: 0.75rem;
  }
  
  .track-number {
    min-width: 25px;
  }
  
  .track-album-cover {
    width: 40px;
    height: 40px;
  }
  
  .export-button,
  .finish-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

