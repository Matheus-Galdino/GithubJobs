<template>
  <nav>
    <router-link to="/"><span>Github</span> Jobs</router-link>
  </nav>
  <router-view />

  <footer>created by <span>Matheus</span> - devChallenges.io</footer>
</template>

<style lang="scss">
@import "./scss/reset.scss";
@import "./scss/_variables.scss";

#app {
  width: 100%;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 1.4rem;
  background: #f6f7fb;

  @media (min-width: $desktop-breakpoint) {
    padding: 30px 120px;
  }
}

nav {
  margin-bottom: 3rem;

  a {
    color: $veryDarkBlue;
    font-size: $heading-fs;
    text-decoration: none;

    span {
      font-weight: 700;
    }
  }
}

footer {
  padding: 2.5rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: $lightGray;
  text-align: center;

  span {
    font-weight: 700;
  }
}
</style>
