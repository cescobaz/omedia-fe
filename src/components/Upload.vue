<template>
  <div class="full-size">
    <form
      action="/backend/api/media/"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="file" name="file1" />
      <input name="upload" value="upload" type="submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  components: {},
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
