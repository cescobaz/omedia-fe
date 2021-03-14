<template>
  <div>
    <div class="wrapper unselectable" unselectable="on">
      <h1>omedia</h1>
      <router-link to="/upload" class="navigator-item">
        <div class="activable">
          upload
        </div>
      </router-link>
      <router-link to="/to-import" class="navigator-item" exact>
        <div class="activable">
          to import
        </div>
      </router-link>
      <router-link to="/media" class="navigator-item" exact>
        <div class="activable">
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
        <div class="activable">
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
  text-decoration: none;
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
}
</style>
