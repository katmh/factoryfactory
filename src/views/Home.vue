<template>
  <div>
    <Generator :words="config.words" :buttonText="config.buttonText" v-on:regenerate="regenerate" />
    <Editor :words="config.words" :buttonText="config.buttonText" v-on:addWord="addWord" />
  </div>
</template>

<script>
import Generator from '../components/Generator.vue';
import Editor from '../components/Editor.vue';

// const encode = str => btoa(unescape(encodeURIComponent(str)));
const decode = str => decodeURIComponent(escape(atob(str)));
const randomItemFrom = (arr) => (arr[Math.floor(Math.random() * arr.length)])

export default {
  name: 'Home',

  props: ["base64"],

  components: {
    Generator,
    Editor
  },
  
  data () {
    return {
      config: {
        words: [
        {
          default: "weird",
          value: "weird",
          synonyms: [
            "weird",
            "odd",
            "bizarre",
            "eccentric",
            "funky",
            "kooky",
            "peculiar",
            "strange",
            "queer",
            "oddball",
            "uncanny",
            "outlandish",
          ],
        },
        {
          default: "flex",
          value: "flex",
          synonyms: [
            "flex",
            "boast",
            "brag",
            "braggadocio",
            "exaggeration",
            "vaunt",
            "grandiloquence",
          ],
        },
        {
          default: "but",
          value: "but",
          synonyms: ["but", "yet"]
        },
        {
          default: "okay",
          value: "okay",
          synonyms: [
            "okay",
            "acceptable",
            "satisfactory",
            "alright",
            "approved",
            "correct",
            "fair",
            "fine",
            "permitted",
            "accurate",
            "adequate",
            "convenient",
            "passable",
            "tolerable",
            "let's toast",
            "👌",
            "🆗",
          ]
        }
      ],
        buttonText: "another one"
      }
      
    }
  },

  created () {
    // decode URL string and parse as array
    if (this.base64) {
      this.config.words = JSON.parse(decode(this.base64));
    }
  },

  methods: {
    regenerate: function() {
      this.config.words = this.config.words.map((item) => {
        return {
          default: item.default,
          value: randomItemFrom(item.synonyms) || item.default,
          synonyms: item.synonyms 
        }
      })
    },
    addWord: function() {
      this.config.words = [...this.config.words, {
        default: "",
        value: "",
        synonyms: []
      }]
    }
  }
}
</script>