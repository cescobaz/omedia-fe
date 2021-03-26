<template>
  <div>
    <div class="wrapper">
      <h1>OMEDIA</h1>
      {{ loading }}
      <h2>buro</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  props: {},
  computed: mapState({
    loading: function (state) {
      return state.loading
    }
  }),
  mounted () {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
.wrapper div {
  text-align: center;
}
</style>
