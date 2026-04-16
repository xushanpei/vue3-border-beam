<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  text: string;
  label: string;
}>();

const copied = ref(false);

const copyIcon = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>`;
const checkIcon = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`;

async function handleCopy() {
  await navigator.clipboard.writeText(props.text);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <button
    class="copy-btn"
    :aria-label="copied ? 'Copied' : props.label"
    @click="handleCopy"
  >
    <Transition name="copy-btn-icon" mode="out-in">
      <div
        :key="copied ? 'check' : 'copy'"
        class="copy-btn-icon"
        v-html="copied ? checkIcon : copyIcon"
      />
    </Transition>
  </button>
</template>
