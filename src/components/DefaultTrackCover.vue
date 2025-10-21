<template>
  <div class="default-track-cover">
    <svg class="record-icon" viewBox="0 0 100 100" fill="none">
      <!-- Outer ring -->
      <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2" fill="none"/>
      <!-- Inner grooves -->
      <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="1" fill="none" opacity="0.6"/>
      <circle cx="50" cy="50" r="25" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
      <circle cx="50" cy="50" r="15" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
      <!-- Center hole -->
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
      <!-- Label area -->
      <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.7"/>
    </svg>
    <div class="music-note">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.default-track-cover {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #5a5a5a;
  flex-shrink: 0;
}

.record-icon {
  width: 70%;
  height: 70%;
  color: #ff4500;
  opacity: 0.8;
}

.music-note {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  color: #ff4500;
  opacity: 0.9;
}

.music-note svg {
  width: 100%;
  height: 100%;
}

/* Hover effect */
.default-track-cover:hover {
  background: linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 100%);
  border-color: #ff4500;
  transition: all 0.2s ease;
}

.default-track-cover:hover .record-icon {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.default-track-cover:hover .music-note {
  opacity: 1;
  transition: opacity 0.2s ease;
}
</style>
