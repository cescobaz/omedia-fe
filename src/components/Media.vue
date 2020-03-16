<template>
  <div class="full-size">
    <Gallery class="full-size" :media="media" :selected="selected" />
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
      media: [
        {
          id: 0,
          filePath: "PROVA"
        }
      ]
    };
  },
  methods: {
    selected() {}
  },
  mounted() {
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
<style scoped></style>
