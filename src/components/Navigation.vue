<template>
  <div class="full-size">
    <div class="wrapper">
      <Navigator class="navigator" />
      <div class="page">
        <div class="header">{{ section }}</div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navigator from "./Navigator.vue";

export default {
  name: "Navigation",
  components: {
    Navigator
  },
  props: {},
  data() {
    return {
      section: "media",
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
}
.navigator {
  width: 150px;
  height: 100%;
}
.page {
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.header {
  width: 100%;
  padding: 8px;
}
.content {
  flex: 1;
  width: 100%;
  overflow: scroll;
}
</style>
