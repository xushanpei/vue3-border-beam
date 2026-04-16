# Vue Border Beam

Animated border beam effect for Vue 3, maintained by `前端开发爱好者`.

- npm: [vue3-border-beam](https://www.npmjs.com/package/vue3-border-beam)
- GitHub: [xushanpei/vue3-border-beam](https://github.com/xushanpei/vue3-border-beam)

## Install

```bash
npm install vue3-border-beam
```

## Usage

```vue
<script setup lang="ts">
import { BorderBeam } from 'vue3-border-beam';
</script>

<template>
  <BorderBeam size="md" color-variant="colorful" theme="dark">
    <div class="card">Content</div>
  </BorderBeam>
</template>
```

## Plugin Usage

```ts
import { createApp } from 'vue';
import BorderBeamPlugin from 'vue3-border-beam';
import App from './App.vue';

createApp(App).use(BorderBeamPlugin).mount('#app');
```

## Props

- `size`: `sm | md | line`
- `colorVariant`: `colorful | mono | ocean | sunset`
- `theme`: `dark | light | auto`
- `staticColors`
- `duration`
- `active`
- `borderRadius`
- `brightness`
- `saturation`
- `hueRange`
- `strength`

## Scripts

```bash
npm run dev
npm run build:lib
npm run build:demo
npm run pack:check
```
