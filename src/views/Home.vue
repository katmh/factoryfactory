<template>
  <div>
    <Generator :words="config.words" :buttonText="config.buttonText" v-on:regenerate="regenerate" />
    <Editor :words="config.words" :buttonText="config.buttonText" v-on:addWord="addWord" v-on:deleteSynonym="deleteSynonym" v-on:addSynonym="addSynonym" v-on:updateBtnText="updateBtnText" v-on:deleteWord="deleteWord" />
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
        buttonText: "get another one"
      }
      
    }
  },

  created () {
    // decode URL string and parse as array
    if (this.base64) {
      const arr = JSON.parse(decode(this.base64))
      this.config.words = arr;
    }
  },

  mounted () {
    if (this.config) {
      // TODO: push encoded this.config.words to URL

      // console.log(encode(this.config.words));
      // console.log(`this.config`, this.config);
      // this.$router.push(encode(this.config.words));
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
    },
    deleteSynonym(word, synonym) {
      this.config.words = this.config.words.map((item) => {
        return {
          default: item.default,
          value: item.value || item.default,
          synonyms: item.default == word ? (
            item.synonyms.filter((syn) => syn != synonym)
          ) : item.synonyms
        }
      })
    },
    addSynonym(word, synonym) {
      this.config.words = this.config.words.map((item) => {
        return {
          default: item.default,
          value: item.value || item.default,
          synonyms: item.default == word ? (
            [...item.synonyms, synonym]
          ) : item.synonyms
        }
      })
    },
    updateBtnText(newText) {
      this.config.buttonText = newText;
    },
    deleteWord(word) {
      this.config.words = this.config.words.filter((item) => item.default != word);
    }
  }
}
</script>