<template>
  <article class="job" @click="showDetails">
    <img :src="job.company_logo" :alt="job.company" class="job__img" />
    <section class="job__main">
      <h3>{{ job.company }}</h3>
      <p>{{ job.title }}</p>
      <p class="type">{{ job.type }}</p>
    </section>
    <div class="job__footer">
      <p>
        <span class="material-icons-outlined"> public </span>
        {{ job.location }}
      </p>

      <p>
        <span class="material-icons-outlined"> watch_later </span>
        {{ new Date(job.created_at).toLocaleDateString() }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import JobType from "@/models/jobType.interface";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Job",
  props: {
    job: { type: Object as PropType<JobType>, required: true },
  },
  methods: {
    showDetails(): void {
      this.$router.push(`/details/${this.job?.id}`);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.job {
  display: grid;
  row-gap: 2rem;
  column-gap: 2rem;
  grid-template-columns: auto 2fr;
  grid-template-areas:
    "img text text"
    "img text text"
    ". footer footer";

  padding: 1.5rem;
  padding-right: 2.4rem;

  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  @media (min-width: $desktop-breakpoint) {
    grid-template-columns: auto 2fr 2fr;
    grid-template-areas:
      "img text ."
      "img text ."
      "img text footer";
  }

  &__img {
    width: 9rem;
    height: 9rem;
    border-radius: 5px;
    object-fit: contain;

    grid-area: img;
  }

  &__main {
    grid-area: text;

    h3 {
      color: $darkBlue;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      text-transform: capitalize;
    }

    p {
      color: $darkBlue;
      font-size: 1.4rem;
    }

    .type {
      display: inline-block;

      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 0.3rem;
      padding: 0.5rem 0.7rem;
      border: 1px solid $darkBlue;
    }
  }

  &__footer {
    grid-area: footer;

    display: flex;
    column-gap: 1.5rem;
    align-items: center;

    @media (min-width: $desktop-breakpoint) {
      justify-self: end;
    }

    p {
      display: flex;
      column-gap: 0.5rem;
      align-items: center;

      color: $lightGray;
      text-transform: capitalize;

      .material-icons-outlined {
        font-size: 1.7rem;
      }
    }
  }
}
</style>