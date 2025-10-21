<template>
  <nav class="navigation-bar">
    <button 
      class="nav-item" 
      :class="{ active: currentPage === 'discovery' }"
      @click="$emit('navigate', 'discovery')"
    >
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <span class="nav-label">Discovery</span>
    </button>
    
    <button 
      class="nav-item"
      :class="{ active: currentPage === 'library' }"
      @click="$emit('navigate', 'library')"
    >
      <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
      <span class="nav-label">Library</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  currentPage: 'discovery' | 'library'
}

interface Emits {
  (e: 'navigate', page: 'discovery' | 'library'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.navigation-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3a3a3a;
  border: 2px solid transparent;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Roboto', sans-serif;
}

.nav-item:hover {
  background: #4a4a4a;
  border-color: #5a5a5a;
}

.nav-item.active {
  background: #4a4a4a;
  border-color: #ff4500;
}

.nav-icon {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  stroke-width: 2;
}

.nav-label {
  font-family: inherit;
  font-weight: 500;
}

@media (max-width: 768px) {
  .navigation-bar {
    gap: 0.5rem;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .nav-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
