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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #222222;
  width: 100%;
  height: 100%;
}
</style>
