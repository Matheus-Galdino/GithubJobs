<template>
  <Mask v-if="loading">
    <img src="../assets/eclipse.gif" />
  </Mask>
  <div class="home" v-else>    
    <header class="home__header">
      <form @submit.prevent="search">
        <span class="material-icons-outlined">work_outline</span>
        <input
          type="text"
          placeholder="Title, companies, expertise"
          v-model="query"
        />
        <button type="submit" @click.prevent="search">Search</button>
      </form>
    </header>

    <section class="home__main">
      <section class="filters">
        <checkbox v-model:checked="fullTime" content="Full time" />

        <label for="location">Location</label>
        <div class="input-container">
          <span class="material-icons-outlined"> public </span>
          <input
            type="text"
            id="location"
            v-model="location"
            placeholder="City, state, zip code or country"
          />
        </div>

        <div class="locations">
          <Radio
            :key="local"
            :option="{ value: local, text: local }"
            v-model:value="location"
            v-for="local in locationSuggestions"
          />
        </div>
      </section>

      <section class="jobs">
        <Job v-for="job in jobs" :key="job.id" :job="job" />
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import Job from "../components/Job.vue";
import Mask from "../components/Mask.vue";
import Radio from "../components/Radio.vue";
import Checkbox from "../components/Checkbox.vue";

import API from "../API";
import JobType from "../models/jobType.interface";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Job,
    Mask,
    Radio,
    Checkbox,
  },
  data() {
    return {
      query: "",
      location: "",
      loading: true,
      fullTime: false,
      jobs: [] as JobType[],
      locationSuggestions: ["London", "Amsterdam", "New York", "Berlin"],
    };
  },
  methods: {
    async search(): Promise<void> {
      this.jobs = await API.getJobsWithFilters(
        this.query,
        this.location,
        this.fullTime
      );
    },
  },
  async mounted() {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state.toString() != "granted") {
      this.jobs = await API.getJobs();
      this.loading = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(async (x) => {
      try {
        this.jobs = await API.getJobsByLocation(
          x.coords.latitude,
          x.coords.longitude
        );
      } catch (e) {
        this.jobs = await API.getJobs();
      } finally {
        this.loading = false;
      }
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.home__header {
  background: url("../assets/backgroundImg.png") no-repeat;
  background-size: cover;

  margin-bottom: 3rem;
  padding: 4rem 2rem;
  border-radius: 10px;

  form {
    display: flex;
    column-gap: 1rem;
    align-items: center;

    padding: 0.5rem;
    border-radius: 10px;
    background: #fff;

    .material-icons-outlined {
      margin-left: 1rem;
      color: $lightGray;
    }

    input {
      flex: 1;
      border: none;
    }

    button {
      border: none;
      color: #fff;
      background: $blue;
      font-size: 1.6rem;
      border-radius: 5px;
      padding: 1.5rem 3rem;
      transition: all 0.3s ease-out;

      &:hover {
        background: $darkBlue;
      }
    }
  }

  @media (min-width: $desktop-breakpoint) {
    form {
      margin: 0 auto;
      max-width: 800px;
    }
  }
}

.home__main {
  @media (min-width: $desktop-breakpoint) {
    display: flex;
    column-gap: 30px;
    align-items: flex-start;
  }
}

.filters {
  margin-bottom: 2.5rem;

  @media (min-width: $desktop-breakpoint) {
    flex: 1;
  }

  > label {
    display: block;
    color: $lightGray;
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .input-container {
    display: flex;
    align-items: center;

    padding: 1.5rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

    .material-icons-outlined {
      color: $lightGray;
      margin-right: 1.5rem;
    }

    input {
      flex: 1;
      border: none;
    }
  }

  .locations {
    margin-top: 3rem;
    margin-left: 1.5rem;

    display: flex;
    row-gap: 1.5rem;
    flex-direction: column;

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
      margin: 0;
      text-transform: none;
      margin-left: 1.25rem;
    }
  }
}

.jobs {
  display: flex;
  row-gap: 2.5rem;
  flex-direction: column;

  @media (min-width: $desktop-breakpoint) {
    flex: 2;
  }
}

.home__header {
  background: url("../assets/backgroundImg.png") no-repeat;
  background-size: cover;

  margin-bottom: 3rem;
  padding: 4rem 2rem;
  border-radius: 10px;

  form {
    display: flex;
    column-gap: 1rem;
    align-items: center;

    padding: 0.5rem;
    border-radius: 10px;
    background: #fff;

    .material-icons-outlined {
      margin-left: 1rem;
      color: $lightGray;
    }

    input {
      flex: 1;
      border: none;
    }

    button {
      border: none;
      color: #fff;
      background: $blue;
      font-size: 1.6rem;
      border-radius: 5px;
      padding: 1.5rem 3rem;
      transition: all 0.3s ease-out;

      &:hover {
        background: $darkBlue;
      }
    }
  }

  @media (min-width: $desktop-breakpoint) {
    form {
      margin: 0 auto;
      max-width: 800px;
    }
  }
}

.home__main {
  @media (min-width: $desktop-breakpoint) {
    display: flex;
    column-gap: 30px;
    align-items: flex-start;
  }
}

.filters {
  margin-bottom: 2.5rem;

  @media (min-width: $desktop-breakpoint) {
    flex: 1;
  }

  > label {
    display: block;
    color: $lightGray;
    font-weight: bold;
    font-size: 1.4rem;
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .input-container {
    display: flex;
    align-items: center;

    padding: 1.5rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

    .material-icons-outlined {
      color: $lightGray;
      margin-right: 1.5rem;
    }

    input {
      flex: 1;
      border: none;
    }
  }

  .locations {
    margin-top: 3rem;
    margin-left: 1.5rem;

    display: flex;
    row-gap: 1.5rem;
    flex-direction: column;

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
      margin: 0;
      text-transform: none;
      margin-left: 1.25rem;
    }
  }
}

.jobs {
  display: flex;
  row-gap: 2.5rem;
  flex-direction: column;

  @media (min-width: $desktop-breakpoint) {
    flex: 2;
  }
}
</style>