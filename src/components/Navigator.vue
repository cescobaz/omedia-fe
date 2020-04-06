<template>
  <div class="full-height">
    <div class="full-height wrapper">
      <div class="selected title">omedia</div>
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
  name: 'Navigator',
  props: { section: String, sectionSelected: Function }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title {
  margin: 0 0 16px 0px;
}
.navigator-item {
  border: none;
  text-decoration: none;
  position: relative;
  display: block;
  padding: 2px 0;
  margin: 0;
  cursor: pointer;
  width: 100%;
}
.navigator-item div {
  margin: 0;
  padding: 2px;
}
</style>
