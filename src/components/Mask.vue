<template>
  <div id="mask">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Mask",
});
</script>

<style lang="scss">
#mask {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;

  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;

  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}
</style>