<template>
  <div class="hello">
    <div class="wrapper">
      <div v-for="m in media" :key="m.id" class="box">
        <a target="_blank" :href="m.path"><img :src="m.path"/></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
  name: "HelloWorld",
  props: {
    msg: String
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
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  color: #444;
}

.box {
  height: 300px;
  width: 300px;
  position: relative;
  padding: 0;
  font-size: 150%;
  margin: 10px;
}
.box a {
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
