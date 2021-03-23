<template>
  <div class="full-size">
    <div class="wrapper">
      <form @submit.prevent="onSubmit">
        <input
          class="full-width"
          type="file"
          name="files"
          multiple
          @change="onFileChange"
        />
        <input value="upload" type="submit" />
      </form>
      <div v-if="!!result">
        <h2>
          {{ result.date }}
        </h2>
        <table>
          <tr>
            <td>imported</td>
            <td>{{ result.totalOk }}</td>
          </tr>
          <tr>
            <td>not imported</td>
            <td>{{ result.totalNotImported }}</td>
          </tr>
        </table>

        <div>
          <table>
            <tr v-for="result in result.results" :key="result.filename">
              <td>{{ result.contentType }}</td>
              <td>{{ result.filename }}</td>
              <td>{{ result.result }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Upload',
  components: {},
  props: {},
  data () {
    return {
      section: 'media',
      files: [],
      result: {
        totalOk: 10,
        totalNotImported: 12,
        results: [
          { result: 'ok', filename: 'ciao.jpg', contentType: 'image' },
          { result: 'ok', filename: 'ciao-2.jpg', contentType: 'image' },
          {
            result: 'skipped because exists',
            filename: 'ciao-4.jpg',
            contentType: 'image'
          },
          { result: 'ok', filename: 'vacanze.mov', contentType: 'video' }
        ]
      }
    }
  },
  methods: {
    onFileChange (event) {
      console.log('onFileChange', this.files)
      this.files = event.target.files
      console.log(this.files)
    },
    onSubmit (event) {
      console.log('onSubmit')
      const formData = new FormData()
      this.files.forEach(file => formData.append('files', file))
      axios
        .post('backend/to-import/', formData, {
          headers: { 'content-type': 'multipart/form-data' }
        })
        .then(response => {
          const results = response.data
          const totalOk = results.filter(result => result.result === 'ok')
            .length
          this.result = {
            date: new Date().toLocaleString(),
            totalOk,
            totalNotImported: results.length - totalOk,
            results
          }
        })
        .catch(console.log)
    }
  }
}
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
