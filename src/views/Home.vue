<template>
  <div>
    <Generator :words="config.words" :buttonText="config.buttonText" v-on:regenerate="regenerate" />
    <Editor :words="config.words" :buttonText="config.buttonText" :url="url" v-on:addWord="addWord" v-on:deleteSynonym="deleteSynonym" v-on:addSynonym="addSynonym" v-on:updateBtnText="updateBtnText" v-on:deleteWord="deleteWord" />
  </div>
</template>

<script>
import Generator from '../components/Generator.vue';
import Editor from '../components/Editor.vue';

const encode = str => btoa(unescape(encodeURIComponent(str)));
const decode = str => decodeURIComponent(escape(atob(str)));
const randomItemFrom = (arr) => (arr[Math.floor(Math.random() * arr.length)])

export default {
  name: 'Home',

  props: ["base64"],

  components: {
    Generator,
    Editor
  },
  
  // default config
  data () {
    return {
      config: {
        words: [
        {
          default: "weird",
          value: "weird",
          synonyms: [
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
          synonyms: ["yet"]
        },
        {
          default: "okay",
          value: "okay",
          synonyms: [
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

  metaInfo() {
    return {
      titleTemplate: () => {
        const words = JSON.parse(JSON.stringify(this.config.words));
        const phrase = words.map((item) => item.default).join(" ");
        return phrase ? `"${phrase}" | phrase factory factory` : 'phrase factory factory'
      }
    }
  },

  computed: {
    url: function() {
      return `https://factoryfactory.netlify.app/${encode(JSON.stringify(this.config))}`
    }
  },

  created () {
    // decode URL string and parse as array
    if (this.base64) {
      const obj = JSON.parse(decode(this.base64))
      this.config = obj;
    }

    // website.com/ index -> website.com/[base64 encoding of default config]
    history.pushState(
      {},
      null,
      encode(JSON.stringify(this.config))
    )
  },

  methods: {
    regenerate: function() {
      this.config.words = this.config.words.map((item) => {
        return {
          default: item.default,
          // make sure we can pick default word, w/o redundantly needing to include it in synonyms list
          value: randomItemFrom([...item.synonyms, item.default]) || item.default,
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
      this.updateURL();
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
      this.updateURL();
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
      this.updateURL();
    },
    updateBtnText(newText) {
      this.config.buttonText = newText;
      this.updateURL();
    },
    deleteWord(word) {
      this.config.words = this.config.words.filter((item) => item.default != word);
      this.updateURL();
    },
    updateURL() {
      const encoded = encode(JSON.stringify(this.config));
      history.pushState({}, null, encoded);
    }
  }
}
</script>