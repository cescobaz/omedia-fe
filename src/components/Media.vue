<template>
  <div class="full-size">
    <ToolBar :label="toolbarLabel" :actions="actions" />
    <Gallery class="full-size" :media="media" :selected="selected" />
  </div>
</template>

<script>
import axios from "axios";
import Gallery from "./Gallery.vue";
import ToolBar from "./ToolBar.vue";

export default {
  name: "Media",
  components: {
    ToolBar,
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
      ],
      selections: [],
      actions: [{ label: "delete" }, { label: "present" }]
    };
  },
  methods: {
    selected(media, selections) {
      this.$data.selections = selections;
    }
  },
  computed: {
    toolbarLabel() {
      return `selected ${this.$data.selections.length} media`;
    }
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
