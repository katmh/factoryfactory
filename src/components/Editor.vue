<template>
  <section id="editor">
    <div class="flex">
      <div id="editor_content">
        <h2>Editor</h2>
        <div class="row">
          <span class="label">Default</span>
          <span class="label">Replacements</span>
        </div>
        <div class="row" v-bind:key="index" v-for="(word, index) in words">
          <input type="text" v-model="word.default" class="default_word" />
          <div class="synonyms_container">
            <input type="text" v-model="word.synonyms" class="synonyms" />
            <button class="delete">X</button>
          </div>
        </div>

        <button id="new_word" v-on:click="$emit('addWord')">+ Add Word</button>

        <div class="field_row">
          <label class="label" for="button_text">Button Text: </label>
          <input name="button_text" type="text" v-model="buttonText" />
        </div>

        <div class="field_row" id="url_container">
          <label class="label" for="url">Shareable URL (not real yet): </label>
          <input name="url" type="text" value="https://gener-inator.netlify.app/W3siZGVmYXVsdCI6ICJoZWxsbyIsICJ2YWx1ZSI6ICJoZWxsbyIsICJzeW5vbnltcyI6IFsiaGkiLCAiaGV5IiwgIndhc3N1cCIsICJ5byJdfSwgeyJkZWZhdWx0IjogIndvcmxkIiwgInZhbHVlIjogIndvcmxkIiwgInN5bm9ueW1zIjogWyJ1bml2ZXJzZSIsICJnbG9iZSIsICLkuJbnlYwiXX1d" readonly />
        </div>
      </div>
      <div id="debugging">
        <h2>Devtoolz so I can debug</h2>
        <p>words:<br />{{ words }}</p>
        <p>buttonText: {{ buttonText }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Editor",
  props: ["words", "buttonText"]
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
  }
  input.synonyms {
    width: 100%;
  }
  input.default_word {
    min-width: 10rem;
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

  #new_word {
    display: block;
    width: calc(25% - 0.6rem);
    margin: 0.5rem 0 1rem;
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
</style>