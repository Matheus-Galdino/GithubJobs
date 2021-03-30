<template>
  <div class="container">
    <div id="radio" :style="radioStyles" @click="updateValue">
      <div class="inner-bg" v-show="checked"></div>
    </div>
    <input type="radio" :value="option.value" hidden />
    <label @click="updateValue">{{ option.text }}</label>
  </div>
</template>

<script lang="ts">
import RadioOption from "../models/RadioOption.interface";

import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Radio",
  props: {
    option: { type: Object as PropType<RadioOption>, required: true },
    width: { type: String, default: "2rem" },
    height: { type: String, default: "2rem" },
    value: { type: [String, Boolean], required: true },
  },
  methods: {
    updateValue(): void {
      this.$emit("update:value", this.option.value);
    },
  },
  computed: {
    checked(): boolean {
      return this.option.value.toString() === this.value;
    },
    radioStyles(): object {
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
  align-items: center;
}

#radio,
label {
  cursor: pointer;
}

#radio {
  padding: 3px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid $lightGray;

  .inner-bg {
    height: 100%;
    width: 100%;
    background: $blue;
    border-radius: 50%;
  }
}

label {
  color: $darkBlue;
  font-weight: 500;
  font-size: 1.4rem;
  margin-left: 1.25rem;
}
</style>