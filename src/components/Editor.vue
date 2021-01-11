<template>
  <Collapsible :url="url">
    <section id="editor">
      <div id="row_labels" class="row">
        <span class="label">Default</span>
        <span class="label">Replacements</span>
      </div>

      <div class="row" v-bind:key="index" v-for="(word, index) in words">
        <div class="default_word_container">
          <button class="delete_word" v-on:click="$emit('deleteWord', word.default)">✕</button>
          <input type="text" v-model="word.default" class="default_word" />
        </div>
        <div class="synonyms_container">
          <div class="synonym" v-bind:key="idx" v-for="(synonym, idx) in word.synonyms">
            <button v-on:click="$emit('deleteSynonym', word.default, synonym)">{{ synonym }}</button>
          </div>
          <input type="text" v-on:keyup.enter="addSynonym(word.default, $event.target)" placeholder="new synonym">
        </div>
      </div>

      <button id="new_word" class="btn" v-on:click="$emit('addWord')">+ Add Word</button>

      <div class="field_row">
        <label class="label" for="button_text">Button Text: </label>
        <input name="button_text" type="text" v-model="buttonText" v-on:change="$emit('updateBtnText', buttonText)" />
        <button id="update_btn_text" class="btn">Update</button>
      </div>
    </section>
  </Collapsible>
</template>

<script>
import Collapsible from './Collapsible.vue';

export default {
  name: "Editor",
  props: ["words", "buttonText", "url"],
  components: {
    Collapsible
  },
  methods: {
    addSynonym(word, target) {
      this.$emit('addSynonym', word, target.value);
      target.value = '';
    }
  }
}
</script>

<style scoped>
  #editor {
    width: 100%;
    background: #222;
    overflow: scroll;
    padding: 0 1.3rem 1.3rem;
  }

  .label {
    color: #ddd;
    font-weight: bold;
    margin: 0.5rem 0 0.25rem;
  }


  #header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  h2 {
    color: #eee;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-size: 1.25rem;
  }


  .row {
    display: grid;
    margin-bottom: 1rem;
  }
  #row_labels {
    display: none;
  }
  .row input, .field_row input {
    margin: 0.3rem 0;
    font-size: 1.15rem;
    padding: 0.4rem 0.7rem;
  }
  .synonyms_container input {
    font-size: 1rem;
  }


  .default_word_container {
    display: flex;
    align-items: flex-start;
    margin-right: 1rem;
  }
  .delete_word {
    background: transparent;
    border: none;
    color: #f66;
    font-size: 1rem;
    margin-right: 0.5rem;
    margin-top: 0.75rem;
    cursor: pointer;
  }
  .delete_word:hover {
    color: #f33;
  }
  input {
    border-bottom: 1px solid #656565;
  }
  input.default_word {
    width: 100%;
  }


  .synonyms_container {
    display: flex;
    flex-wrap: wrap;
  }
  .synonym button {
    padding: 0.4rem 0.5rem;
    margin: 0.3rem 0.4rem 0.1rem 0;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    background: #ddd;
    transition: 0.1s;
  }
  .synonym button:hover {
    background: #efefef;
  }
  .synonym button:after {
    content: " ✕";
    color: #f33;
    margin-left: 0.25rem;
  }


  #new_word {
    display: block;
    margin: 0.5rem 0 1rem;
  }


  .field_row {
    display: block;
    margin-top: 2rem;
  }
  .field_row input {
    width: 100%;
    margin: 0.5rem 0;
  }
  

  @media (min-width: 600px) {
    .row {
      grid-template-columns: 1fr 3fr;
    }
    #row_labels {
      display: grid;
    }
    #new_word {
      width: calc(25% - 1rem);
    }
    .field_row .label {
      margin-right: 0.25rem;
    }
    .field_row input {
      width: 50%;
      min-width: 30rem;
    }
    #update_btn_text {
      margin-left: 0.75rem;
    }
  }
</style>