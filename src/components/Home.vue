<template>
  <div class="home">
    <Generator :words="words" :buttonText="buttonText" v-on:regenerate="regenerate" />

    <section id="editor">
      <h2>Editor</h2>
      <div v-bind:key="index" v-for="(word, index) in words">
        <input type="text" v-model="word.default" class="default_word" />
        <input type="text" v-model="word.synonyms" class="synonyms" />
      </div>

      <label for="button_text">Button Text: </label>
      <input name="button_text" type="text" v-model="buttonText" />
      
      <br />
      <button v-on:click="addWord">add new word</button>
    </section>

    <p>{{ words }}</p>
  </div>
</template>

<script>
import Generator from '../components/Generator.vue';
const randomItemFrom = (arr) => (arr[Math.floor(Math.random() * arr.length)])
export default {
  name: 'Home',
  components: {
    Generator
  },
  data() {
    return {
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
    },
    addWord: function() {
      this.words = [...this.words, {
        default: "",
        value: "",
        synonyms: []
      }]
    }
  }
}
</script>

<style>
  p {
    margin-top: 4rem;
    font-size: 1.15rem;
    color: #6e6a72;
  }

  p a {
    color: #6e6a72;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 1.75rem;
    }

    .button {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
      margin-top: 10rem;
    }
  }

  #editor {
    margin-top: 2rem;
  }

  input.synonyms {
    width: 30rem;
  }
  input.default_word {
    width: 10rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1.25rem;
    color: #444;
    border-radius: .5rem;
    margin: .5rem;
    border: 1px solid #aaa;
    outline: none;
  }
</style>