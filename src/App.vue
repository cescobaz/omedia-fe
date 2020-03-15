<template>
  <div id="app">
    <Navigation />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
