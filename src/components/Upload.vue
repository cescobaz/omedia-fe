<template>
  <div class="full-size">
    <div class="wrapper full-size">
      <form class="section-border-b" @submit.prevent="onSubmit">
        <input
          class="input-file full-width"
          type="file"
          name="files"
          multiple
          @change="onFileChange"
        />
        <input value="upload" type="submit" />
      </form>
      <div class="results">
        <div class="result" v-for="(result, index) in results" :key="index">
          <h2>
            {{ result.date }}
          </h2>
          <table class="result-summary-table">
            <tr>
              <td>imported</td>
              <td>{{ result.totalOk }} / {{ result.total }}</td>
            </tr>
            <tr>
              <td>not imported</td>
              <td :class="{ notOk: result.totalNotImported > 0 }">
                {{ result.totalNotImported }}
              </td>
            </tr>
          </table>

          <div>
            <table class="results-table">
              <tr v-for="result in result.results" :key="result.filename">
                <td class="content-type">{{ result.contentType }}</td>
                <td>{{ result.filename }}</td>
                <td :class="{ notOk: !isOk(result), ok: isOk(result) }">
                  {{ result.result }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from '../store'
import { mapState } from 'vuex'
export default {
  name: 'Upload',
  components: {},
  props: {},
  data () {
    return {
      section: 'media',
      files: [],
      uploading: 0
    }
  },
  computed: mapState({
    results: function (state) {
      return [...state.uploadResults].reverse()
    }
  }),
  methods: {
    onFileChange (event) {
      this.files = event.target.files
    },
    onSubmit (event) {
      if (!this.files || !this.files.length) {
        return
      }
      this.uploading += 1
      this.$store
        .dispatch(actions.UPLOAD, { files: this.files })
        .then(() => (this.uploading -= 1))
        .catch(() => (this.uploading -= 1))
    },
    isOk (result) {
      return result && result.result === 'ok'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/variables.scss";
.wrapper {
  display: flex;
  flex-direction: column;
}
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
.input-file {
  box-sizing: border-box;
  padding: 16px;
}
.results {
  overflow: scroll;
}
.result {
}
.result-summary-table,
.results-table {
  margin-left: 8px;
}
.result-summary-table {
  margin-bottom: 8px;
}
.results-table {
}
.content-type {
  color: gray;
}
.ok {
  color: $success-color;
}
.notOk {
  color: $error-color;
}
</style>
