<template>
  <div class="full-height">
    <div class="full-height wrapper">
      <router-link to="/upload" class="navigator-item">
        <div>
          upload
        </div>
      </router-link>
      <router-link to="/media" class="navigator-item">
        <div>
          media
        </div>
      </router-link>
      <router-link to="/to-import" class="navigator-item">
        <div>
          to import
        </div>
      </router-link>
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
