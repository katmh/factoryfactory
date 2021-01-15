<template>
  <div>
    <Generator :words="config.words" :buttonText="config.buttonText" v-on:regenerate="regenerate" />
    <Editor :words="config.words" :buttonText="config.buttonText" v-on:addWord="addWord" v-on:deleteSynonym="deleteSynonym" v-on:addSynonym="addSynonym" v-on:updateBtnText="updateBtnText" v-on:deleteWord="deleteWord" v-on:makeURL="makeURL" />
  </div>
</template>

<script>
import Generator from '../components/Generator.vue';
import Editor from '../components/Editor.vue';

const randomItemFrom = (arr) => (arr[Math.floor(Math.random() * arr.length)])

export default {
  name: 'Home',

  props: ["id"],

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
        buttonText: "get another flex 💪"
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

  created () {
    // get and set config based on ID in URL
    if (this.id) {
      const path = `/.netlify/functions/getConfig?id=${this.id}`;
      fetch(path)
        .then((res) => res.text())
        .then((data) => {
          this.config.words = data.words || this.config.words;
          this.config.buttonText = data.buttonText || this.config.buttonText;
        })
        .catch((e) => console.log(e));
    }
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
    },
    updateURL(id) {
      history.pushState({}, null, id);
    },
    makeURL() {
      const body = JSON.stringify({
        words: this.config.words,
        buttonText: this.config.buttonText
      });
      const path = "/.netlify/functions/makeConfig"
      fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          this.updateURL(data._id);

          // copy URL from hidden input
          var tempInput = document.createElement("input");
          tempInput.value = `${window.location.origin}/${data._id}`;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);

          document.getElementById("url_btn").innerHTML = "Copied!";
        })
        .catch((e) => {
          console.error(e.toString());
          document.getElementById("url_btn").innerHTML = "An error occurred :(";
          setTimeout(() => {
            document.getElementById("url_btn").innerHTML = "Get Shareable URL";
          }, 2000);
        });
    }
  }
}
</script>