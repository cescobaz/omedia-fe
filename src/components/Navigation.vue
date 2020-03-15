<template>
  <div class="wrapper">
    <div class="navigator" />
    <div class="page">
      <div class="header"></div>
      <div class="content">
        <Gallery :media="media" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Gallery from "./Gallery.vue";
export default {
  name: "Navigation",
  components: {
    Gallery
  },
  props: {},
  data() {
    return {
      media: [
        {
          id: 0,
          filePath: "PROVA"
        }
      ]
    };
  },
  created() {
    axios
      .get("/backend/api/media/")
      .then(response => {
        this.media = response.data.map(media => {
          media.path = "/backend" + media.filePath;
          return media;
        });
      })
      .catch(console.log);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #f0f0f0;
}
.navigator {
  width: 150px;
  height: 100%;
  background-color: #00ff00;
}
.page {
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #ff0000;
}
.header {
  width: 100%;
  height: 64px;
  background-color: #0000ff;
}
.content {
  flex: 1;
  width: 100%;
  overflow: scroll;
}
</style>
