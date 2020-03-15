<template>
  <div class="full-height">
    <div class="full-height wrapper">
      <button>upload</button>
      <ul>
        <li>media</li>
        <li>to import</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  props: { section: String, sectionSelected: Function }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
}
</style>
