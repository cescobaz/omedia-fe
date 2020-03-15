<template>
  <div class="full-size">
    <div class="full-size wrapper">
      <div v-for="m in media" :key="m.path" class="box">
        <div class="box-centered"><img :src="m.path" /></div>
        <ToolBar :actions="actions" :value="m" class="background toolbar" />
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from "./ToolBar.vue";
export default {
  name: "Gallery",
  props: {
    media: Array
  },
  components: {
    ToolBar
  },
  data() {
    return {
      actions: [
        { label: "delete", do: console.log },
        {
          label: "open",
          do: media => {
            window.open(media.path, "_blank");
          }
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  color: #444;
  overflow: scroll;
}
.toolbar {
  display: none;
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.box:hover .toolbar {
  display: block;
}
.box {
  height: 300px;
  width: 300px;
  position: relative;
  padding: 0;
  font-size: 150%;
  margin: 16px;
}
.box-centered {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box img {
  max-height: 100%;
  max-width: 100%;
}
</style>
