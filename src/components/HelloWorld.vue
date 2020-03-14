<template>
  <div class="hello">
    <div class="wrapper">
      <div v-for="m in media" :key="m.id" class="box">
        <img :src="m.path" />
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
  background-color: #fff;
  color: #444;
}

.box {
  height: 300px;
  width: 300px;
  position: relative;
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
  margin: 10px;
}
.box img {
  max-height: 100%;
  max-width: 100%;
}
</style>
