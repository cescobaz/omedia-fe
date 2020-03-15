<template>
  <div class="full-size">
    <Gallery class="full-size" :media="media" />
  </div>
</template>

<script>
import axios from "axios";
import Gallery from "./Gallery.vue";

export default {
  name: "Media",
  components: {
    Gallery
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
  mounted() {
    axios
      .get("/backend/api/to-import/")
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
<style scoped></style>
