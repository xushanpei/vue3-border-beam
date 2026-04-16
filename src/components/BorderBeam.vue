<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useId,
  watch,
} from 'vue';
import { generateBeamCSS, sizePresets, sizeThemePresets } from '../styles';
import type { BorderBeamColorVariant, BorderBeamProps, BorderBeamTheme } from '../types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BorderBeamProps>(), {
  size: 'md',
  colorVariant: 'colorful',
  theme: 'dark',
  staticColors: false,
  duration: undefined,
  active: true,
  borderRadius: undefined,
  brightness: 1.3,
  saturation: undefined,
  hueRange: 30,
  strength: 1,
});

const emit = defineEmits<{
  activate: [];
  deactivate: [];
  animationend: [event: AnimationEvent];
}>();

const attrs = useAttrs();
const baseId = useId();
const id = baseId.replace(/:/g, '-');
const root = ref<HTMLDivElement | null>(null);
const isDarkSystem = ref(true);
const isActive = ref(props.active);
const isFading = ref(false);
const detectedRadius = ref<number | null>(null);

let mediaQuery: MediaQueryList | null = null;
let mutationObserver: MutationObserver | null = null;
let mediaQueryHandler: ((event: MediaQueryListEvent) => void) | null = null;
let styleEl: HTMLStyleElement | null = null;

function resolveTheme(theme: BorderBeamTheme, systemTheme: 'dark' | 'light'): 'dark' | 'light' {
  return theme === 'auto' ? systemTheme : theme;
}

function updateRadius() {
  if (props.borderRadius != null) {
    return;
  }

  const el = root.value;
  if (!el) {
    return;
  }

  const child = el.firstElementChild as HTMLElement | null;
  if (!child) {
    return;
  }

  const computedStyle = getComputedStyle(child);
  const raw = Number.parseFloat(computedStyle.borderTopLeftRadius);
  if (!Number.isNaN(raw) && raw > 0) {
    detectedRadius.value = raw;
  }
}

const resolvedTheme = computed(() => {
  return resolveTheme(props.theme, isDarkSystem.value ? 'dark' : 'light');
});

const sizeConfig = computed(() => sizePresets[props.size]);
const themeConfig = computed(() => sizeThemePresets[props.size][resolvedTheme.value]);
const finalBorderRadius = computed(() => props.borderRadius ?? detectedRadius.value ?? sizeConfig.value.borderRadius);
const finalDuration = computed(() => props.duration ?? (props.size === 'line' ? 2.4 : 1.96));
const finalSaturation = computed(() => props.saturation ?? themeConfig.value.saturation);
const finalHueRange = computed(() => (props.size === 'line' ? Math.min(props.hueRange, 13) : props.hueRange));
const finalStaticColors = computed(() => (props.colorVariant === 'mono' ? true : props.staticColors));

const cssStyles = computed(() => {
  return generateBeamCSS({
    id,
    borderRadius: finalBorderRadius.value,
    borderWidth: sizeConfig.value.borderWidth,
    duration: finalDuration.value,
    strokeOpacity: themeConfig.value.strokeOpacity,
    innerOpacity: themeConfig.value.innerOpacity,
    bloomOpacity: themeConfig.value.bloomOpacity,
    innerShadow: themeConfig.value.innerShadow,
    size: props.size,
    colorVariant: props.colorVariant as BorderBeamColorVariant,
    staticColors: finalStaticColors.value,
    brightness: props.brightness,
    saturation: finalSaturation.value,
    hueRange: finalHueRange.value,
    theme: resolvedTheme.value,
  });
});

const mergedStyle = computed(() => {
  const style = attrs.style;
  return [
    style as any,
    {
      '--beam-strength': Math.max(0, Math.min(1, props.strength)),
    },
  ];
});

const forwardedAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    onAnimationend: _onAnimationend,
    onAnimationEnd: _onAnimationEnd,
    ...rest
  } = attrs as Record<string, unknown>;

  return rest;
});

function handleAnimationEnd(event: AnimationEvent) {
  const animationName = event.animationName;

  if (animationName.includes('fade-out')) {
    isActive.value = false;
    isFading.value = false;
    emit('deactivate');
  } else if (animationName.includes('fade-in')) {
    emit('activate');
  }

  emit('animationend', event);
}

watch(
  () => props.active,
  value => {
    if (value && !isActive.value && !isFading.value) {
      isActive.value = true;
    } else if (!value && isActive.value && !isFading.value) {
      isFading.value = true;
    }
  }
);

watch(
  () => props.borderRadius,
  () => {
    nextTick(updateRadius);
  }
);

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  isDarkSystem.value = mediaQuery.matches;
  mediaQueryHandler = event => {
    isDarkSystem.value = event.matches;
  };
  mediaQuery.addEventListener('change', mediaQueryHandler);

  nextTick(updateRadius);

  mutationObserver = new MutationObserver(() => updateRadius());
  if (root.value) {
    mutationObserver.observe(root.value, { childList: true, subtree: false });
  }

  styleEl = document.createElement('style');
  styleEl.setAttribute('data-border-beam-style', id);
  styleEl.textContent = cssStyles.value;
  document.head.appendChild(styleEl);
});

watch(cssStyles, value => {
  if (styleEl) {
    styleEl.textContent = value;
  }
});

onBeforeUnmount(() => {
  mutationObserver?.disconnect();
  if (mediaQuery && mediaQueryHandler) {
    mediaQuery.removeEventListener('change', mediaQueryHandler);
  }
  styleEl?.remove();
  styleEl = null;
});
</script>

<template>
  <div
    ref="root"
    v-bind="forwardedAttrs"
    :class="attrs.class"
    :style="mergedStyle"
    :data-beam="id"
    :data-active="isActive && !isFading ? '' : undefined"
    :data-fading="isFading ? '' : undefined"
    @animationend="handleAnimationEnd"
  >
    <slot />
    <div data-beam-bloom />
  </div>
</template>
