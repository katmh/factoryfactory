<template>
  <section id="generator">
    <h1>
      <span v-bind:key="index" v-for="(word, index) in words">
        {{ word.value }}
      </span>
    </h1>
    <button v-on:click="$emit('regenerate')">{{ buttonText }}</button>
  </section>
</template>

<script>
export default {
  name: "Generator",
  props: ["words", "buttonText"]
}
</script>

<style scoped>
  #generator {
    padding: 10% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 4rem;
    margin: 2rem 0;
    word-wrap: break-word;
    word-break: break-word;
    text-align: center;
  }

  button {
    text-decoration: none;
    padding: 0.5em 0.9em;
    font-size: 1.5rem;
    background: #8c3bff;
    color: #f9f9f9;
    border-radius: 1.5em;
    transition: 0.15s;
    display: inline-block;
    border: none;
    cursor: pointer;
    outline: none;
  }

  button:hover,
  button:focus {
    transform: scale(1.1);
  }

  button:active {
    transform: scale(1.05);
  }
</style>