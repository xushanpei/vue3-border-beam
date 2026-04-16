<script setup lang="ts">
import { computed, ref } from 'vue';
import BorderBeam from './components/BorderBeam.vue';
import CopyButton from './components/CopyButton.vue';
import type { BorderBeamColorVariant, BorderBeamSize } from './types';

const icons = {
  at: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></svg>`,
  chevron: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" style="transform: rotate(90deg)"><polyline points="9 18 15 12 9 6" /></svg>`,
  arrowUp: `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>`,
  search: `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`,
};

const sizeOptions: { value: BorderBeamSize; label: string }[] = [
  { value: 'md', label: 'Large' },
  { value: 'sm', label: 'Small' },
  { value: 'line', label: 'Line' },
];

const colorOptions: { value: BorderBeamColorVariant; label: string }[] = [
  { value: 'colorful', label: 'Colorful' },
  { value: 'mono', label: 'Mono' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'sunset', label: 'Sunset' },
];

const playgroundActive = ref(true);
const playgroundSize = ref<BorderBeamSize>('md');
const playgroundColorVariant = ref<BorderBeamColorVariant>('colorful');
const playgroundDuration = ref(1.96);
const playgroundStrength = ref(70);
const baseUrl = import.meta.env.BASE_URL;

const installCmd = 'npm install border-beam';
const usageCode = `import { BorderBeam } from 'border-beam';

<BorderBeam>
  <YourCard>Content</YourCard>
</BorderBeam>`;

const playgroundCode = computed(() => {
  return `<BorderBeam size="${playgroundSize.value}" colorVariant="${playgroundColorVariant.value}" duration={${playgroundDuration.value}}${playgroundStrength.value < 100 ? ` strength={${playgroundStrength.value / 100}}` : ''}>
  <Card>Content</Card>
</BorderBeam>`;
});

function setSize(value: BorderBeamSize) {
  playgroundSize.value = value;
  playgroundDuration.value = value === 'line' ? 2.4 : 1.96;
}

function togglePlayground() {
  playgroundActive.value = !playgroundActive.value;
}

function onPlaygroundKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    togglePlayground();
  }
}
</script>

<template>
  <a href="#main-content" class="skip-link">
    Skip to content
  </a>

  <main id="main-content" class="app">
    <header class="header">
      <div class="top-bar-links" aria-label="Account info">
        <span class="account-badge">公众号：前端开发爱好者</span>
      </div>
      <div class="header-icon" aria-hidden="true">
        <img
          class="header-icon-img"
          :src="`${baseUrl}icon-web.png`"
          alt=""
          width="207"
          height="138"
        />
      </div>
      <h1 class="title">Border beam</h1>
      <p class="subtitle-sm">Animated border beam component</p>
    </header>

    <section class="examples-section" aria-label="Effect demonstrations">
      <div class="example-row-full">
        <BorderBeam size="md" color-variant="colorful" theme="dark" :active="true">
          <div class="mock-chat" role="img" aria-label="Chat input UI example with border beam effect">
            <div class="mock-chat-inner">
              <div class="pill">
                <span v-html="icons.at" />
              </div>
              <div class="placeholder">Build anything...</div>
              <div class="bottom-row">
                <div class="tag">
                  Agent
                  <span v-html="icons.chevron" />
                </div>
                <div class="tag">
                  Auto
                  <span v-html="icons.chevron" />
                </div>
                <div class="send-btn">
                  <span v-html="icons.arrowUp" />
                </div>
              </div>
            </div>
          </div>
        </BorderBeam>
      </div>

      <div class="example-row-split">
        <div class="example-cell">
          <BorderBeam size="sm" color-variant="colorful" theme="dark" :active="true">
            <div class="mock-icon-btn" role="img" aria-label="Icon button UI example with border beam effect">
              <div class="mock-icon-btn-square" />
            </div>
          </BorderBeam>
        </div>

        <div class="example-cell">
          <BorderBeam
            size="line"
            color-variant="colorful"
            theme="dark"
            :active="true"
            :duration="2.4"
            :border-radius="20"
          >
            <div class="mock-search" role="img" aria-label="Search bar UI example with border beam effect">
              <div class="mock-search-inner">
                <span v-html="icons.search" />
                <span>Search</span>
              </div>
            </div>
          </BorderBeam>
        </div>
      </div>
    </section>

    <section class="section" aria-label="Installation">
      <h2 class="section-title">Installation</h2>
      <div class="code-block">
        <code>{{ installCmd }}</code>
        <CopyButton :text="installCmd" label="Copy install command" />
      </div>
    </section>

    <section class="section" aria-label="Usage">
      <h2 class="section-title section-title--muted">Usage</h2>
      <div class="code-block code-block--multi">
        <code>{{ usageCode }}</code>
        <CopyButton :text="usageCode" label="Copy usage example" />
      </div>
    </section>

    <section class="playground-section" aria-label="Interactive playground">
      <h2 class="section-title">Playground</h2>

      <div class="playground-controls">
        <div class="control-group" role="radiogroup" aria-label="Effect type">
          <span class="control-label">Type</span>
          <div class="control-options">
            <button
              v-for="{ value, label } in sizeOptions"
              :key="value"
              class="tab-btn"
              role="radio"
              :aria-checked="playgroundSize === value"
              :data-active="playgroundSize === value"
              @click="setSize(value)"
            >
              {{ label }}
            </button>
          </div>
        </div>

        <div class="control-group" role="radiogroup" aria-label="Color variant">
          <span class="control-label">Color</span>
          <div class="control-options">
            <button
              v-for="{ value, label } in colorOptions"
              :key="value"
              class="tab-btn"
              role="radio"
              :aria-checked="playgroundColorVariant === value"
              :data-active="playgroundColorVariant === value"
              @click="playgroundColorVariant = value"
            >
              {{ label }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label class="control-label" for="duration-input">Duration</label>
          <div class="control-options">
            <input
              id="duration-input"
              v-model.number="playgroundDuration"
              type="number"
              class="duration-input"
              min="0.5"
              max="10"
              step="0.1"
              aria-label="Animation duration in seconds"
            />
          </div>
        </div>

        <div class="control-group control-group--strength">
          <span class="control-label">Strength</span>
          <div class="strength-track">
            <div
              v-if="playgroundStrength > 0"
              class="strength-fill"
              :style="{ width: `${playgroundStrength}%` }"
            />
            <span class="strength-value">{{ playgroundStrength }}%</span>
            <input
              v-model.number="playgroundStrength"
              type="range"
              class="strength-input"
              min="0"
              max="100"
              step="1"
              aria-label="Effect strength"
            />
          </div>
        </div>
      </div>

      <div
        class="playground-preview"
        role="button"
        tabindex="0"
        :aria-pressed="playgroundActive"
        :aria-label="playgroundActive ? 'Pause animation' : 'Play animation'"
        @click="togglePlayground"
        @keydown="onPlaygroundKeydown"
      >
        <BorderBeam
          :size="playgroundSize"
          :color-variant="playgroundColorVariant"
          theme="dark"
          :active="playgroundActive"
          :duration="playgroundDuration"
          :strength="playgroundStrength / 100"
        >
          <div :class="['card', playgroundSize === 'sm' ? 'card-sm' : 'card-md']">
            <p class="card-text">
              {{ playgroundSize === 'sm' ? '' : 'Build anything...' }}
            </p>
          </div>
        </BorderBeam>
      </div>

      <div class="code-block code-block--multi">
        <code>{{ playgroundCode }}</code>
        <CopyButton :text="playgroundCode" label="Copy playground code" />
      </div>
    </section>

    <footer class="footer">
      <span class="footer-muted">公众号</span>
      {{ ' ' }}
      <span class="footer-name">前端开发爱好者</span>
    </footer>
  </main>
</template>
