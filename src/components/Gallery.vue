<template>
  <div class="full-size">
    <div class="full-size wrapper">
      <div v-for="(m, index) in media" :key="m.path" class="box">
        <div
          class="box-centered"
          @click="toggleSelection(index, m)"
          :class="{ inverted: selections.indexOf(m.path) >= 0 }"
        >
          <img :src="m.path" />
        </div>
        <ToolBar :actions="actions" :value="m" class="toolbar" />
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from "./ToolBar.vue";
export default {
  name: "Gallery",
  props: {
    media: Array,
    selected: Function
  },
  components: {
    ToolBar
  },
  data() {
    return {
      selections: [],
      actions: [
        { label: "delete", do: console.log },
        { label: "select", do: this.toggleSelection },
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
    toggleSelection(index, media) {
      const sIndex = this.$data.selections.indexOf(media.path);
      if (sIndex >= 0) {
        this.$data.selections.splice(sIndex, 1);
      } else {
        this.$data.selections.push(media.path);
      }
      if (this.selected) {
        this.selected(media, this.$data.selections);
      }
    }
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
  overflow: scroll;
}
.toolbar {
  display: none;
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.box:hover .toolbar {
  display: block;
}
.box {
  height: 300px;
  width: 300px;
  position: relative;
  font-size: 150%;
  margin: 16px;
  padding: 0;
}
.box-centered {
  padding: 2px;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box img {
  max-height: 100%;
  max-width: 100%;
}
</style>
