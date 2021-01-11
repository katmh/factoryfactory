<template>
  <section id="editor">
    <div id="editor_content">
      <h2>Editor</h2>
      <div class="row">
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

      <div class="field_row" id="url_container">
        <label class="label" for="url">Shareable URL: </label>
        <input name="url" type="text" v-bind:value="url" readonly />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Editor",
  props: ["words", "buttonText", "url"],

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
    position: absolute;
    width: 95%;
    left: 2.5%;
    bottom: 2.5%;
    height: 50vh;
    background: #222;
    overflow: scroll;
    padding: 1.3rem;
    border-radius: 0.5rem;
  }

  .container {
    width: 90%;
    margin: auto;
    max-width: 800px;
  }

  .flex {
    display: flex;
  }
  #debugging {
    width: 30%;
    padding-left: 1.5rem;
    color: #eee;
  }
  #debugging p {
    font-family: monospace;
    margin-bottom: 1rem;
  }

  h2 {
    color: #eee;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-size: 1.25rem;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 3fr;
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
  input.default_word {
    width: 100%;
    margin-right: 0.6rem;
  }

  .label {
    color: #ddd;
    font-weight: bold;
    margin: 0.5rem 0 0.25rem;
  }

  input {
    padding: 0.4rem 0.7rem;
    font-size: 1.15rem;
    color: #fff;
    background: #444;
    margin: 0.3rem 0;
    border-radius: 0.25rem;
    border: none;
    border-bottom: 1px solid #656565;
    outline: none;
  }
  .synonyms_container input {
    font-size: 1rem;
  }

  #new_word {
    display: block;
    width: calc(25% - 0.6rem);
    margin: 0.5rem 0 1rem;
    
  }
  .btn {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    outline: none;
    transition: .15s;
    font-size: 1rem;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    background: #8c3bff;
    transition: 0.1s;
  }
  .btn:hover, .btn:active {
    background: #7d22ff;
  }
  #update_btn_text {
    margin-left: 0.75rem;
  }

  .field_row {
    display: block;
  }
  .field_row .label {
    margin-right: 0.25rem;
  }
  .field_row input {
    width: 50%;
    min-width: 30rem;
  }

  #url_container {
    margin-top: 2rem;
  }

  .delete {
    width: 30px;
    height: 28px;
    background: #f66;
    border: none;
    border-radius: 15px;
    margin: auto 0 auto 0.5rem;
    vertical-align: middle;
    cursor: pointer;
    font-family: arial;
    transition: 0.15s;
  }
  .delete:hover {
    background: #f33;
  }

  .default_word_container {
    display: flex;
    align-items: flex-start;
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
</style>