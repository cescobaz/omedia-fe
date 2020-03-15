<template>
  <div class="full-height">
    <div class="full-height wrapper">
      <div class="navigator-item">
        <div>
          upload
        </div>
      </div>
      <div class="navigator-item">
        <div>
          media
        </div>
      </div>
      <div class="navigator-item">
        <div>
          to import
        </div>
      </div>
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
.navigator-item {
  border: none;
  text-decoration: none;
  position: relative;
  display: block;
  padding: 2px 0;
  margin: 10px 0;
  cursor: pointer;
  width: 100%;
}
.navigator-item div {
  padding: 0 8px;
}
</style>
