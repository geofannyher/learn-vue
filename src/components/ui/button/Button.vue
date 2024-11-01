<script setup>
import { cn } from '@/lib/utils'
import { Primitive } from 'radix-vue'
import { buttonVariants } from '.'

const props = defineProps({
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false, default: 'button' },
  onClick: { type: Function, required: false },
})
</script>

<template>
  <Primitive
    :as="as"
    @click="props.onClick"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
