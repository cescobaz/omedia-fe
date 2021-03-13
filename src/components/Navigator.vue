<template>
  <div>
    <div class="wrapper unselectable" unselectable="on">
      <h1>omedia</h1>
      <router-link to="/upload" class="navigator-item">
        <div>
          upload
        </div>
      </router-link>
      <router-link to="/to-import" class="navigator-item" exact>
        <div>
          to import
        </div>
      </router-link>
      <router-link to="/media" class="navigator-item" exact>
        <div>
          media
        </div>
      </router-link>
      <router-link
        v-for="tag in tags"
        :key="tag.tag"
        :to="to(tag)"
        class="navigator-item"
        exact
      >
        <div>
          {{ tag.tag }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actions } from '../store'

export default {
  name: 'Navigator',
  props: { section: String, sectionSelected: Function },
  computed: mapState({ tags: 'tags' }),
  mounted () {
    this.$store.dispatch(actions.LOAD_TAGS)
  },
  methods: {
    to ({ tag }) {
      return { path: '/media/', query: { tags: tag } }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.navigator-item {
  border: none;
  text-decoration: none;
  position: relative;
  display: block;
  padding: 2px 0;
  margin: 0;
  cursor: pointer;
  width: 100%;
}
.navigator-item div {
  margin: 0;
  padding: 2px;
}
</style>
