<template>
  <div class="full-size">
    <Gallery
      class="full-size"
      :media="media"
      :actions="actions"
      :selected="selected"
    />
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
      media: [],
      actions: [
        {
          label: "delete",
          do: (index, { id }) => {
            axios
              .delete(`/backend/api/media/${id}`)
              .then(() => {
                const index = this.$data.media.findIndex(m => m.id === id);
                if (index >= 0) {
                  this.$data.media.splice(index, 1);
                }
              })
              .catch(console.log);
          }
        },
        {
          label: "present",
          do: (index, media) => {
            window.open(media.path, "_blank");
          }
        }
      ]
    };
  },
  methods: {
    selected() {},
    reload() {
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
  },
  mounted() {
    this.reload();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
