<template>
  <Mask v-if="loading">
    <img src="../assets/eclipse.gif" />
  </Mask>
  <div class="details" v-else>
    <header>
      <div class="navigation-container">
        <span class="material-icons-round" @click="back">
          keyboard_backspace
        </span>
        <p @click="back">Back to search</p>
      </div>

      <h3>How to apply</h3>
      <span class="dynamic" v-html="job.how_to_apply"></span>
    </header>

    <main>
      <section class="main__header">
        <h1>{{ job.title }}</h1>
        <p class="type">{{ job.type }}</p>
        <p class="time">
          <span class="material-icons-outlined"> watch_later </span>
          {{ new Date(job.created_at).toLocaleDateString() }}
        </p>

        <div class="job__info">
          <img :src="job.company_logo" :alt="job.company" />
          <p class="company-name">{{ job.company }}</p>
          <p class="job-location">
            <span class="material-icons-outlined"> public </span>
            {{ job.location }}
          </p>
        </div>
      </section>

      <section class="main__description">
        <span class="dynamic" v-html="job.description"></span>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import API from "@/API";
import Mask from "../components/Mask.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Details",
  components: {
    Mask,
  },
  props: {
    jobId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      job: {},
      loading: true,
    };
  },
  methods: {
    back(): void {
      this.$router.push("/");
    },
  },
  async beforeMount(): Promise<void> {
    try {
      this.job = await API.getJob(this.jobId);
      this.loading = false;
    } catch (e) {
      alert(e.message);
      this.back();
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/dynamic.css";
@import "../scss/_variables.scss";

.details {
  header {
    flex-basis: 30%;

    h3 {
      display: block;
      color: $lightGray;
      font-weight: bold;
      font-size: 1.4rem;
      margin: 3.5rem 0 1.5rem;
      text-transform: uppercase;
    }
  }

  @media (min-width: $desktop-breakpoint) {
    display: flex;
    column-gap: 75px;
    align-items: flex-start;
  }
}

.navigation-container {
  display: flex;
  align-items: center;

  .material-icons-round,
  p {
    color: $blue;
    cursor: pointer;
  }

  .material-icons-round {
    font-size: 2rem;
  }

  p {
    font-weight: 500;
    font-size: 1.4rem;

    margin: 0;
    margin-left: 1rem;
  }
}

.main__header {
  margin-top: 3.5rem;

  h1 {
    color: $darkBlue;
    font-size: $heading-fs;
  }

  .type {
    display: inline-block;

    color: $darkBlue;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 4px;
    margin: 0.8rem 0;
    padding: 0.5rem 0.7rem;
    border: 1px solid $darkBlue;
  }

  .time {
    display: flex;
    column-gap: 0.5rem;
    align-items: center;

    color: $lightGray;
    text-transform: capitalize;

    .material-icons-outlined {
      font-size: 2rem;
    }
  }

  @media (min-width: $desktop-breakpoint) {
    margin-top: 0;
  }
}

.job__info {
  display: grid;
  grid-template-columns: auto 1fr;

  margin: 3.5rem 0;

  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
    margin-right: 1rem;
    border-radius: 5px;

    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  .company-name {
    color: $darkBlue;
    font-weight: bold;
    font-size: 1.8rem;

    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  .job-location {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    display: flex;
    column-gap: 0.5rem;
    align-items: center;
    color: $lightGray;

    .material-icons-outlined {
      font-size: 1.7rem;
    }
  }
}
</style>