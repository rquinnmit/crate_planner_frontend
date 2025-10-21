<template>
  <div id="app" :class="{ 'chat-mode': isGenerating }">
    <header class="header">
      <div class="logo">
        <span class="music-icon">♪</span>
        <h1>CratePilot</h1>
      </div>
      
      <NavigationBar 
        :current-page="currentPage" 
        @navigate="handleNavigate" 
      />
    </header>
    
    <main>
      <!-- Discovery Page - Initial Prompt View -->
      <PromptBox 
        v-if="currentPage === 'discovery' && !isGenerating"
        @generate="handleGenerateCrate" 
      />
      
      <!-- Discovery Page - Chat Interface View -->
      <ChatInterface
        v-else-if="currentPage === 'discovery' && isGenerating"
        :messages="messages"
        :is-thinking="isThinking"
        @send-message="handleSendMessage"
      />
      
      <!-- Library Page -->
      <LibraryPage v-else-if="currentPage === 'library'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PromptBox from './components/PromptBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import LibraryPage from './components/LibraryPage.vue'
import ChatInterface from './components/ChatInterface.vue'

interface PromptData {
  description: string
  bpmRange: { min: number; max: number }
}

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

const currentPage = ref<'discovery' | 'library'>('discovery')
const isGenerating = ref(false)
const messages = ref<Message[]>([])
const isThinking = ref(false)

const handleNavigate = (page: 'discovery' | 'library') => {
  currentPage.value = page
  // Reset generation state when navigating away from discovery
  if (page !== 'discovery') {
    isGenerating.value = false
    messages.value = []
  }
}

const handleGenerateCrate = (data: PromptData) => {
  console.log('Generate crate with data:', data)
  
  // Transform UI - start generation mode
  isGenerating.value = true
  
  // Add initial user message
  const initialMessage = `Generate a crate for: ${data.description}\nBPM Range: ${data.bpmRange.min} - ${data.bpmRange.max}`
  messages.value.push({
    id: Date.now().toString(),
    content: initialMessage,
    isUser: true,
    timestamp: new Date()
  })
  
  // Simulate AI thinking and response
  isThinking.value = true
  
  // TODO: Integrate with backend API
  // For now, simulate AI response
  setTimeout(() => {
    isThinking.value = false
    messages.value.push({
      id: (Date.now() + 1).toString(),
      content: "I'm analyzing your request and starting to build your perfect crate! Let me gather some information about the vibe and energy you're looking for.\n\nCould you tell me more about the event? For example:\n- What's the setting? (club, outdoor festival, intimate gathering)\n- What's the expected crowd energy?\n- Any specific genres or artists you'd like me to focus on?",
      isUser: false,
      timestamp: new Date()
    })
  }, 2000)
}

const handleSendMessage = (message: string) => {
  // Add user message
  messages.value.push({
    id: Date.now().toString(),
    content: message,
    isUser: true,
    timestamp: new Date()
  })
  
  // Simulate AI thinking
  isThinking.value = true
  
  // TODO: Send to backend API
  // Simulate AI response with a crate
  setTimeout(() => {
    isThinking.value = false
    
    // Mock crate data for demonstration
    const mockCrate: Crate = {
      id: 'crate-1',
      name: 'High Energy Club Mix',
      description: 'Perfect for peak hours with progressive energy building',
      bpmRange: { min: 120, max: 130 },
      totalDuration: 3600,
      tracks: [
        {
          id: '1',
          title: 'Levels',
          artist: 'Avicii',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79',
          bpm: 126,
          duration: 210
        },
        {
          id: '2',
          title: 'One More Time',
          artist: 'Daft Punk',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2',
          bpm: 123,
          duration: 320
        },
        {
          id: '3',
          title: 'Titanium',
          artist: 'David Guetta ft. Sia',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
          bpm: 126,
          duration: 245
        },
        {
          id: '4',
          title: 'Animals',
          artist: 'Martin Garrix',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b273a0e05a20e3b3b1d17ef0f548',
          bpm: 128,
          duration: 305
        },
        {
          id: '5',
          title: 'Clarity',
          artist: 'Zedd ft. Foxes',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2bd9',
          bpm: 128,
          duration: 272
        },
        {
          id: '6',
          title: 'Wake Me Up',
          artist: 'Avicii',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b2737c5e77e6b8f8b3c4e11e6cf4',
          bpm: 124,
          duration: 247
        },
        {
          id: '7',
          title: 'Don\'t You Worry Child',
          artist: 'Swedish House Mafia',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
          bpm: 129,
          duration: 213
        },
        {
          id: '8',
          title: 'Reload',
          artist: 'Sebastian Ingrosso & Tommy Trash',
          albumCover: 'https://i.scdn.co/image/ab67616d0000b273e2d156fdc691f57900134342',
          bpm: 128,
          duration: 198
        }
      ]
    }
    
    messages.value.push({
      id: (Date.now() + 1).toString(),
      content: "Perfect! I've curated a high-energy club mix that matches your vibe. This crate includes 8 tracks that will build momentum and keep the crowd engaged throughout your set.",
      isUser: false,
      timestamp: new Date(),
      crate: mockCrate
    })
  }, 2000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  position: relative;
}

.header {
  background: transparent;
  padding: 1rem 2rem 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  position: absolute;
  top: 0;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}


.music-icon {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ff4500 0%, #ff8c00 50%, #ffa500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(255, 69, 0, 0.5));
}

.logo h1 {
  background: linear-gradient(135deg, #ffffff 0%, #ff8c00 50%, #ff4500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.75rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: 3px;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  transition: all 0.3s ease;
}

.chat-mode main {
  align-items: stretch;
  padding: 0;
  max-width: none;
  height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
  }
  
  .logo {
    left: 1rem;
    gap: 0.75rem;
  }
  
  .music-icon {
    font-size: 2rem;
  }
  
  .logo h1 {
    font-size: 1.25rem;
    letter-spacing: 1.5px;
  }
  
  
  main {
    padding: 2rem 1rem;
    max-width: 100%;
  }
}
</style>