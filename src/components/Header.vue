<template>
  <div>
    <div class="wrapper">
      <h1>OMEDIA</h1>
      <h2>buro</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {},
  computed: {},
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
