<template>
  <section id="editor">
    <h2>Editor</h2>
    <div v-bind:key="index" v-for="(word, index) in words">
      <input type="text" v-model="word.default" class="default_word" />
      <input type="text" v-model="word.synonyms" class="synonyms" />
    </div>

    <label for="button_text">Button Text: </label>
    <input name="button_text" type="text" v-model="buttonText" v-on:change="$emit(updateButtonText)" />
    
    <br />
    <button v-on:click="$emit('addWord')">add new word</button>

    <p>{{ words }}</p>
    <p>{{ buttonText }}</p>
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