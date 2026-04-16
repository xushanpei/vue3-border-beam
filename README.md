# Vue Border Beam

[![npm version](https://img.shields.io/npm/v/vue3-border-beam)](https://www.npmjs.com/package/vue3-border-beam)
[![npm downloads](https://img.shields.io/npm/dm/vue3-border-beam)](https://www.npmjs.com/package/vue3-border-beam)
[![license](https://img.shields.io/npm/l/vue3-border-beam)](./LICENSE)

Animated border beam effect for Vue 3, maintained by `前端开发爱好者`.

## Links

- npm: [vue3-border-beam](https://www.npmjs.com/package/vue3-border-beam)
- GitHub: [xushanpei/vue3-border-beam](https://github.com/xushanpei/vue3-border-beam)

## Features

- Vue 3 component version of the animated border beam effect
- Supports `sm`, `md`, and `line` variants
- Supports `colorful`, `mono`, `ocean`, and `sunset` palettes
- Works with `dark`, `light`, and `auto` theme modes
- Library build and demo site are separated for cleaner npm publishing

## Install

```bash
npm install vue3-border-beam
```

## Basic Usage

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `sm \| md \| line` | `md` | Beam size preset |
| `colorVariant` | `colorful \| mono \| ocean \| sunset` | `colorful` | Color palette |
| `theme` | `dark \| light \| auto` | `dark` | Theme mode |
| `staticColors` | `boolean` | `false` | Disable hue shift animation |
| `duration` | `number` | `1.96 / 2.4` | Animation duration |
| `active` | `boolean` | `true` | Enable or disable the effect |
| `borderRadius` | `number` | `auto detect` | Override border radius |
| `brightness` | `number` | `1.3` | Glow brightness |
| `saturation` | `number` | preset-based | Glow saturation |
| `hueRange` | `number` | `30` | Hue animation range |
| `strength` | `number` | `1` | Overall effect strength |

## Development

```bash
pnpm install
pnpm run dev
pnpm run build:lib
pnpm run build:demo
pnpm run pack:check
```

## License

[MIT](./LICENSE)
