<template>
  <div class="full-size">
    <div class="wrapper">
      <form
        action="/backend/api/media/"
        method="post"
        enctype="multipart/form-data"
      >
        <input class="full-width" type="file" name="files" multiple />
        <input name="upload" value="upload" type="submit" />
      </form>
    </div>
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
<style scoped>
.wrapper form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  text-align: right;
}
.wrapper form input {
  margin: 8px 0px;
  position: relative;
}
</style>
