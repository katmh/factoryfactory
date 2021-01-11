<template>
  <div>
    <Generator :words="words" buttonText="gimme another one" v-on:regenerate="regenerate" />
  </div>
</template>

<script>
import Generator from '../components/Generator.vue';

// const encode = str => btoa(unescape(encodeURIComponent(str)));
const decode = str => decodeURIComponent(escape(atob(str)));
const randomItemFrom = (arr) => (arr[Math.floor(Math.random() * arr.length)])

export default {
  props: ["productPath"],
  components: {
    Generator
  },
  data () {
    return {
      words: {}
    }
  },
  created () {
    // decode URL string and parse as array
    this.words = JSON.parse(decode(this.productPath));
  },
  methods: {
    regenerate: function() {
      this.words = this.words.map((item) => {
        return {
          default: item.default,
          value: randomItemFrom(item.synonyms) || item.default,
          synonyms: item.synonyms 
        }
      })
    }
  }
}
</script>