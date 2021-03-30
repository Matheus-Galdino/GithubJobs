<template>
  <div class="container">
    <div
      id="checkbox"
      :class="{ active: checked }"
      @click="$emit('update:checked', !checked)"
      :style="checkboxStyles"
    >
      <span class="material-icons-outlined" v-show="checked"> check </span>
    </div>
    <input type="checkbox" :checked="checked" hidden />
    <label @click="$emit('update:checked', !checked)">{{ content }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    content: { type: String, required: true },
    checked: { type: Boolean, required: true },
    width: { type: String, default: "2rem" },
    height: { type: String, default: "2rem" },
  },
  computed: {
    checkboxStyles(): object {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.container {
  display: flex;
  column-gap: 1rem;
  align-items: center;

  user-select: none;

  label {
    cursor: pointer;
    font-weight: 500;
    color: $darkBlue;
    font-size: 1.4rem;
  }
}

#checkbox {
  cursor: pointer;
  border-radius: 3px;
  background: #fff;
  border: 1px solid $darkBlue;

  display: grid;
  place-content: center;

  &.active {
    border: none;
    background: $blue;
  }

  .material-icons-outlined {
    color: #fff;
    font-size: 1.8rem;
  }
}
</style>