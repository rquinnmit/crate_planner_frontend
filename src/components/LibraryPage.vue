<template>
      <div class="library-page" @click="closeCrateMenu">
        <div class="library-header">
      <div class="header-left">
        <h1>Library</h1>
      </div>
          <div class="header-right">
            <button class="import-tracks-button" @click="handleImportTracks">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Import Tracks
            </button>
            <button class="export-tracks-button" @click="handleExportTracks">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Tracks
            </button>
          </div>
    </div>
    
    <div class="library-nav">
      <button 
        class="nav-tab" 
        :class="{ active: currentView === 'crates' }"
        @click="currentView = 'crates'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3h7v7H3z"/>
          <path d="M14 3h7v7h-7z"/>
          <path d="M14 14h7v7h-7z"/>
          <path d="M3 14h7v7H3z"/>
        </svg>
        Crates
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: currentView === 'tracks' }"
        @click="currentView = 'tracks'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        All Tracks
      </button>
    </div>
    
    <div class="library-content">
      <!-- Crates View -->
      <div v-if="currentView === 'crates'" class="crates-view">
        <div class="search-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search crates, creates, artists..." 
            class="search-input"
          />
        </div>
        
        <div class="crates-grid">
          <div 
            v-for="crate in filteredCrates" 
            :key="crate.id" 
            class="crate-card"
            @click="handleCrateClick(crate)"
          >
            <div class="crate-cover">
              <img 
                v-for="(cover, index) in crate.coverImages.slice(0, 4)" 
                :key="index"
                :src="cover" 
                :alt="`Cover ${index + 1}`"
                class="cover-image"
              />
            </div>
            <div class="crate-info">
              <h3 class="crate-name">{{ crate.name }}</h3>
              <div class="crate-meta">
                <span class="track-count">{{ crate.trackCount }} tracks</span>
                <span class="separator">•</span>
                <span class="duration">{{ crate.duration }}</span>
              </div>
              <div class="crate-tags">
                <span 
                  v-for="tag in crate.tags" 
                  :key="tag" 
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <p class="crate-date">Created {{ crate.createdAt }}</p>
            </div>
                <div class="crate-menu-container">
                  <button 
                    class="crate-menu-button" 
                    @click="toggleCrateMenu(crate.id)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="12" cy="5" r="1"/>
                      <circle cx="12" cy="19" r="1"/>
                    </svg>
                  </button>
                  
                  <div 
                    v-if="activeCrateMenu === crate.id" 
                    class="crate-menu-dropdown"
                    @click.stop
                  >
                    <button 
                      class="menu-item delete-item" 
                      @click="handleDeleteCrate(crate)"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                      Delete Crate
                    </button>
                  </div>
                </div>
          </div>
        </div>
        
        <div v-if="filteredCrates.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3h7v7H3z"/>
            <path d="M14 3h7v7h-7z"/>
            <path d="M14 14h7v7h-7z"/>
            <path d="M3 14h7v7H3z"/>
          </svg>
          <h3>No crates yet</h3>
          <p>Create your first crate in the Discovery tab</p>
        </div>
      </div>
      
      <!-- All Tracks View -->
      <div v-else class="tracks-view">
        <div class="search-bar">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search tracks, creates, artists..." 
            class="search-input"
          />
        </div>
        
        <div class="tracks-list">
          <div 
            v-for="track in filteredTracks" 
            :key="track.id" 
            class="track-row"
          >
            <div class="track-main">
              <img 
                v-if="track.albumCover && track.albumCover !== ''" 
                :src="track.albumCover" 
                :alt="track.title" 
                class="track-cover" 
                @error="handleImageError"
              />
              <DefaultTrackCover v-else class="track-cover" />
              <div class="track-info">
                <div class="track-title">{{ track.title }}</div>
                <div class="track-artist">{{ track.artist }}</div>
              </div>
            </div>
            <div class="track-details">
              <span class="track-bpm">{{ track.bpm }} BPM</span>
              <span class="track-genre">{{ track.genre }}</span>
              <span class="track-duration">{{ formatDuration(track.duration) }}</span>
            </div>
            <button class="track-menu-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div v-if="filteredTracks.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <h3>No tracks yet</h3>
          <p>Tracks from your generated crates will appear here</p>
        </div>
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
    
    <!-- Import Menu Modal -->
    <div v-if="showImportMenu" class="import-menu-overlay" @click.self="showImportMenu = false">
      <div class="import-menu-container">
        <div class="import-menu-header">
          <h3>Import Tracks</h3>
          <button class="close-import-button" @click="showImportMenu = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="import-menu-content">
          <div class="import-option" @click="handleFileImport">
            <div class="import-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div class="import-details">
              <h4>Import from File</h4>
              <p>Upload CSV, JSON, or playlist files from your computer</p>
              <span class="import-formats">Supports: CSV, JSON, M3U, PLS</span>
            </div>
          </div>
          
          <div class="import-option" @click="handleSpotifyImport">
            <div class="import-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div class="import-details">
              <h4>Import from Spotify</h4>
              <p>Connect your Spotify account to import playlists</p>
              <span class="import-formats">Requires: Spotify Premium</span>
            </div>
          </div>
          
          <div class="import-option" @click="handleSoundCloudImport">
            <div class="import-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm6.6 13.8c-.3.6-.9.9-1.5.6-1.2-.6-2.7-.9-4.2-.9s-3 .3-4.2.9c-.6.3-1.2 0-1.5-.6-.3-.6 0-1.2.6-1.5 1.8-.9 3.9-1.2 6-1.2s4.2.3 6 1.2c.6.3.9.9.6 1.5z"/>
              </svg>
            </div>
            <div class="import-details">
              <h4>Import from SoundCloud</h4>
              <p>Import tracks and playlists from SoundCloud</p>
              <span class="import-formats">Requires: SoundCloud account</span>
            </div>
          </div>
        </div>
        
        <div class="import-menu-footer">
          <button class="cancel-import-button" @click="showImportMenu = false">
            Cancel
          </button>
        </div>
      </div>
    </div>
    
    <!-- Hidden file input -->
    <input 
      ref="fileInput" 
      type="file" 
      accept=".csv,.json,.m3u,.pls" 
      style="display: none" 
      @change="handleFileSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CrateModal from './CrateModal.vue'
import DefaultTrackCover from './DefaultTrackCover.vue'

interface Crate {
  id: string
  name: string
  trackCount: number
  duration: string
  tags: string[]
  createdAt: string
  coverImages: string[]
}

interface Track {
  id: string
  title: string
  artist: string
  albumCover: string | null
  bpm: number
  genre: string
  duration: number
}

const currentView = ref<'crates' | 'tracks'>('crates')
const searchQuery = ref('')
const selectedCrate = ref<any>(null)
const showImportMenu = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const activeCrateMenu = ref<string | null>(null)

// Mock data for demonstration
const mockCrates = ref<Crate[]>([
  {
    id: '1',
    name: 'Rooftop Sunset Vibes',
    trackCount: 24,
    duration: '2h 12m',
    tags: ['tech-house', 'sunset'],
    createdAt: '2 days ago',
    coverImages: [
      'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
      'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2',
      'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
      'https://i.scdn.co/image/ab67616d0000b273a0e05a20e3b3b1d17ef0f548'
    ]
  },
  {
    id: '2',
    name: 'Underground Warehouse',
    trackCount: 21,
    duration: '2h 43m',
    tags: ['techno', 'industrial'],
    createdAt: '1 week ago',
    coverImages: [
      'https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2bd9',
      'https://i.scdn.co/image/ab67616d0000b2737c5e77e6b8f8b3c4e11e6cf4',
      'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
      'https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342'
    ]
  },
  {
    id: '3',
    name: 'Intimate House Session',
    trackCount: 18,
    duration: '1h 32m',
    tags: ['deep-house', 'intimate'],
    createdAt: '3 days ago',
    coverImages: [
      'https://i.scdn.co/image/ab67616d0000b273a0e05a20e3b3b1d17ef0f548',
      'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
      'https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2bd9',
      'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2'
    ]
  }
])

const mockTracks = ref<Track[]>([
  {
    id: '1',
    title: 'Levels',
    artist: 'Avicii',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
    bpm: 126,
    genre: 'Progressive House',
    duration: 210
  },
  {
    id: '2',
    title: 'One More Time',
    artist: 'Daft Punk',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2',
    bpm: 123,
    genre: 'French House',
    duration: 320
  },
  {
    id: '3',
    title: 'Titanium',
    artist: 'David Guetta ft. Sia',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
    bpm: 126,
    genre: 'Electro House',
    duration: 245
  },
  {
    id: '4',
    title: 'Animals',
    artist: 'Martin Garrix',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273a0e05a20e3b3b1d17ef0f548',
    bpm: 128,
    genre: 'Big Room',
    duration: 305
  },
  {
    id: '5',
    title: 'Clarity',
    artist: 'Zedd ft. Foxes',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2bd9',
    bpm: 128,
    genre: 'Progressive House',
    duration: 272
  },
  {
    id: '6',
    title: 'Unknown Track',
    artist: 'Local Artist',
    albumCover: '', // No album cover - will show default
    bpm: 120,
    genre: 'Electronic',
    duration: 180
  },
  {
    id: '7',
    title: 'Demo Song',
    artist: 'Indie Band',
    albumCover: null, // No album cover - will show default
    bpm: 115,
    genre: 'Indie Rock',
    duration: 195
  }
])

const filteredCrates = computed(() => {
  if (!searchQuery.value) return mockCrates.value
  const query = searchQuery.value.toLowerCase()
  return mockCrates.value.filter(crate => 
    crate.name.toLowerCase().includes(query) ||
    crate.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const filteredTracks = computed(() => {
  if (!searchQuery.value) return mockTracks.value
  const query = searchQuery.value.toLowerCase()
  return mockTracks.value.filter(track => 
    track.title.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query) ||
    track.genre.toLowerCase().includes(query)
  )
})

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleCrateClick = (crate: Crate) => {
  // Convert library crate format to modal crate format
  const modalCrate = {
    id: crate.id,
    name: crate.name,
    description: `A curated collection of ${crate.trackCount} tracks for ${crate.tags.join(', ')} vibes`,
    tracks: mockTracks.value.slice(0, crate.trackCount), // Use mock tracks for demo
    bpmRange: { min: 120, max: 130 }, // Mock BPM range
    totalDuration: crate.trackCount * 240 // Mock total duration
  }
  selectedCrate.value = modalCrate
}

const handleExportCrate = () => {
  if (selectedCrate.value) {
    console.log('Exporting crate:', selectedCrate.value)
    alert(`Exporting crate: ${selectedCrate.value.name}`)
  }
}

const handleFinishCrate = () => {
  if (selectedCrate.value) {
    console.log('Finishing crate:', selectedCrate.value)
    alert(`Crate "${selectedCrate.value.name}" has been finished and saved!`)
    selectedCrate.value = null
  }
}

const handleImportTracks = () => {
  showImportMenu.value = true
}

const handleFileImport = () => {
  showImportMenu.value = false
  fileInput.value?.click()
}

const handleFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    console.log('Selected file:', file.name, file.type, file.size)
    
    // TODO: Implement file parsing based on file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    switch (fileExtension) {
      case 'csv':
        alert(`CSV file selected: ${file.name}\n\nThis will parse CSV format with columns:\n• Title, Artist, BPM, Genre, Duration`)
        break
      case 'json':
        alert(`JSON file selected: ${file.name}\n\nThis will parse JSON format with track objects`)
        break
      case 'm3u':
        alert(`M3U playlist selected: ${file.name}\n\nThis will parse M3U playlist format`)
        break
      case 'pls':
        alert(`PLS playlist selected: ${file.name}\n\nThis will parse PLS playlist format`)
        break
      default:
        alert(`Unsupported file format: ${fileExtension}`)
    }
  }
}

const handleSpotifyImport = () => {
  showImportMenu.value = false
  alert('Spotify Import\n\nThis would:\n• Open Spotify OAuth flow\n• Allow playlist selection\n• Import tracks with metadata\n\nRequires Spotify API integration')
}

const handleSoundCloudImport = () => {
  showImportMenu.value = false
  alert('SoundCloud Import\n\nThis would:\n• Open SoundCloud OAuth flow\n• Allow playlist/track selection\n• Import tracks with metadata\n\nRequires SoundCloud API integration')
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Replace the broken image with the default cover
  img.style.display = 'none'
  // The DefaultTrackCover component will be shown via v-else
}

const toggleCrateMenu = (crateId: string) => {
  console.log('Toggle menu clicked for crate:', crateId)
  activeCrateMenu.value = activeCrateMenu.value === crateId ? null : crateId
  console.log('Active menu is now:', activeCrateMenu.value)
}

const closeCrateMenu = () => {
  activeCrateMenu.value = null
}

const handleDeleteCrate = (crate: Crate) => {
  if (confirm(`Are you sure you want to delete "${crate.name}"? This action cannot be undone.`)) {
    // Remove the crate from the mock data
    const index = mockCrates.value.findIndex(c => c.id === crate.id)
    if (index > -1) {
      mockCrates.value.splice(index, 1)
    }
    activeCrateMenu.value = null
    console.log('Deleted crate:', crate.name)
  }
}

const handleExportTracks = () => {
  console.log('Exporting tracks...')
  // TODO: Implement track export functionality
  alert('Export Tracks functionality will be implemented here!\n\nThis could export to:\n• CSV format\n• JSON format\n• Playlist files')
}
</script>

<style scoped>
.library-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #2a2a2a;
  overflow: hidden;
}

.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 1rem 3rem;
  border-bottom: 1px solid #3a3a3a;
}

.header-left h1 {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.import-tracks-button {
  background: transparent;
  border: 2px solid #28a745;
  color: #28a745;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.import-tracks-button:hover {
  background: #28a745;
  color: #ffffff;
  transform: translateY(-2px);
}

.import-tracks-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.export-tracks-button {
  background: transparent;
  border: 2px solid #adb5bd;
  color: #adb5bd;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.export-tracks-button:hover {
  background: #adb5bd;
  color: #2a2a2a;
  transform: translateY(-2px);
}

.export-tracks-button svg {
  width: 16px;
  height: 16px;
}

.library-nav {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 3rem 0 3rem;
  border-bottom: 2px solid #3a3a3a;
}

.nav-tab {
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #adb5bd;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -2px;
}

.nav-tab svg {
  width: 18px;
  height: 18px;
}

.nav-tab:hover {
  color: #ffffff;
}

.nav-tab.active {
  color: #ff4500;
  border-bottom-color: #ff4500;
}

.library-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 3rem;
}

.library-content::-webkit-scrollbar {
  width: 8px;
}

.library-content::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.library-content::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.library-content::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}

.search-bar {
  position: relative;
  margin-bottom: 2rem;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  stroke: #adb5bd;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: #3a3a3a;
  border: 2px solid #4a4a4a;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: 'Roboto', sans-serif;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #ff4500;
}

.search-input::placeholder {
  color: #6c757d;
}

/* Crates View */
.crates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.crate-card {
  background: #3a3a3a;
  border: 1px solid #4a4a4a;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.crate-card:hover {
  background: #404040;
  border-color: #ff4500;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 69, 0, 0.2);
}

.crate-cover {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.crate-info {
  margin-bottom: 0.5rem;
}

.crate-name {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crate-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #adb5bd;
  margin-bottom: 0.75rem;
}

.separator {
  color: #6c757d;
}

.crate-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag {
  background: #4a4a4a;
  color: #adb5bd;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.crate-date {
  color: #6c757d;
  font-size: 0.8rem;
  margin: 0;
}

.crate-menu-button {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

.crate-card:hover .crate-menu-button {
  opacity: 1;
}

.crate-menu-button:hover {
  background: rgba(255, 69, 0, 0.9);
}

.crate-menu-button svg {
  width: 16px;
  height: 16px;
  stroke: #ffffff;
}

/* Tracks View */
.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.track-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #3a3a3a;
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  transition: all 0.2s;
  position: relative;
}

.track-row:hover {
  background: #404040;
  border-color: #5a5a5a;
}

.track-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.track-cover {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
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
  margin-bottom: 0.25rem;
}

.track-artist {
  color: #adb5bd;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-details {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: #adb5bd;
  margin-right: 2rem;
  flex-shrink: 0;
}

.track-bpm {
  color: #ff4500;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.track-genre {
  color: #adb5bd;
  min-width: 120px;
  text-align: center;
}

.track-duration {
  color: #adb5bd;
  min-width: 50px;
  text-align: right;
}

.track-menu-button {
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

.track-row:hover .track-menu-button {
  opacity: 1;
}

.track-menu-button:hover {
  background: rgba(255, 69, 0, 0.2);
}

.track-menu-button svg {
  width: 16px;
  height: 16px;
  stroke: #adb5bd;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-state svg {
  width: 64px;
  height: 64px;
  stroke: #4a4a4a;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #adb5bd;
  font-size: 1rem;
  margin: 0;
}

/* Import Menu Styles */
.import-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.import-menu-container {
  background: #3a3a3a;
  border-radius: 16px;
  border: 2px solid #5a5a5a;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.import-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #5a5a5a;
}

.import-menu-header h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.close-import-button {
  background: transparent;
  border: none;
  color: #adb5bd;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-import-button:hover {
  background: #5a5a5a;
  color: #ffffff;
}

.close-import-button svg {
  width: 20px;
  height: 20px;
}

.import-menu-content {
  padding: 1.5rem 2rem;
}

.import-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  margin-bottom: 1rem;
}

.import-option:hover {
  background: #4a4a4a;
  border-color: #ff4500;
  transform: translateY(-2px);
}

.import-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5a5a5a;
  border-radius: 12px;
  flex-shrink: 0;
}

.import-icon svg {
  width: 24px;
  height: 24px;
  color: #ff4500;
}

.import-details {
  flex: 1;
}

.import-details h4 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-family: 'Roboto', sans-serif;
}

.import-details p {
  color: #adb5bd;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.import-formats {
  color: #6c757d;
  font-size: 0.8rem;
  font-style: italic;
}

.import-menu-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #5a5a5a;
  display: flex;
  justify-content: flex-end;
}

.cancel-import-button {
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
}

.cancel-import-button:hover {
  background: #adb5bd;
  color: #2a2a2a;
}

/* Crate Menu Dropdown Styles */
.crate-menu-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.crate-menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #3a3a3a;
  border: 1px solid #5a5a5a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  min-width: 160px;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  width: 100%;
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
}

.menu-item:hover {
  background: #4a4a4a;
}

.delete-item {
  color: #ff6b6b;
}

.delete-item:hover {
  background: rgba(255, 107, 107, 0.1);
  color: #ff5252;
}

.menu-item svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

@media (max-width: 768px) {
  .library-header,
  .library-nav,
  .library-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .crates-grid {
    grid-template-columns: 1fr;
  }
  
  .track-details {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    margin-right: 1rem;
    min-width: 80px;
  }
  
  .track-bpm {
    text-align: right;
    min-width: auto;
  }
  
  .track-duration {
    text-align: right;
    min-width: auto;
  }
  
  .track-genre {
    display: none;
  }
}
</style>
