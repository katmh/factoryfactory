<template>
  <details>
    <EditorHeader />
    <div class="row" v-bind:key="index" v-for="(word, index) in words">
      <button class="delete_word" v-on:click="$emit('deleteWord', word.default)">
        ✕
      </button>
      <div class="word">
        <div class="default_word_container">
          <input
            class="default_word"
            type="text"
            v-model="word.default"
            placeholder="default word(s)"
          />
        </div>
        <div class="synonyms_container">
          <button
            class="synonym"
            v-for="(synonym, idx) in word.synonyms"
            v-bind:key="idx"
            v-on:click="$emit('deleteSynonym', word.default, synonym)"
          >
            {{ synonym }}
          </button>
          <input
            class="new_synonym"
            type="text"
            v-on:keyup.enter="addSynonym(word, $event.target)"
            placeholder="new synonym"
          />
        </div>
      </div>
    </div>

    <button
      id="new_word"
      class="btn"
      v-on:click="$emit('addWord')"
    >
      + Add Word
    </button>

    <div class="btn_text_container">
      <label class="btn_text_label" for="button_text">
        Button Text:
      </label>
      <input
        class="btn_text"
        name="button_text"
        type="text"
        v-model="buttonText"
        v-on:change="$emit('updateBtnText', buttonText)"
      />
      <button id="update_btn_text" class="btn">
        Update
      </button>
    </div>
  </details>
</template>

<script>
import EditorHeader from './EditorHeader.vue';

export default {
  name: "Editor",
  props: ["words", "buttonText"],
  components: {
    EditorHeader
  },
  methods: {
    addSynonym(word, target) {
      if (target.value === "") {
        target.style.border = "1px solid red";
        throw "Synonym is empty";
      }
      if (word.synonyms.includes(target.value)) {
        target.style.border = "1px solid red";
        throw "Synonym is already added";
      }
      this.$emit('addSynonym', word.default, target.value);
      target.value = '';
      target.style.border = "1px solid transparent";
    }
  }
}
</script>

<style scoped>
details {
  width: 100%;
  background: #222;
  overflow: scroll;
  padding: 0 1rem;
}

@media (min-width: 600px) {
  details {
    width: 95%;
    position: absolute;
    bottom: 0;
    left: 2.5%;
    max-height: 60vh;
    overflow: scroll;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }
}

.row {
  display: flex;
  margin-bottom: 1.25rem;
  justify-items: flex-start;
}
.row:first-of-type {
  margin-top: 0.5rem;
}
.word {
  display: flex;
  flex-wrap: wrap;
}

.delete_word {
  background: transparent;
  border: none;
  color: #f66;
  font-size: 1rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  align-self: flex-start;
}
.delete_word:hover {
  color: #f33;
}
.default_word, .btn_text {
  padding: 0.4rem 0.6rem;
  font-size: 1.15rem;
}

.default_word_container {
  margin-right: 1rem;
  width: 100%;
}

.synonyms_container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}
.synonym {
  padding: 0.4rem 0.5rem;
  margin: 0rem 0.4rem 0.4rem 0;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  background: #ddd;
  transition: 0.1s;
  display: table;
  line-height: 1;
  height: 1.8rem;
}
.synonym:hover {
  background: #efefef;
}
.synonym:after {
  content: " ✕";
  color: #f33;
  margin-left: 0.15rem;
}
.new_synonym {
  height: 1.8rem;
  padding: 0.4rem 0.5rem;
}

#new_word {
  display: block;
  margin: 0.5rem 0 1.5rem;
}

.btn_text_container {
  display: block;
  margin: 2.5rem 0 1.5rem;
}
.btn_text_label {
  color: #ddd;
  font-weight: bold;
  margin: 0.5rem 0 0.25rem;
}
.btn_text {
  margin-left: 0.5rem;
}
.btn_text, .update_btn_text {
  vertical-align: top;
}
#update_btn_text {
  margin-left: 0.5rem;
}

@media (min-width: 600px) {
  .row {
    grid-template-columns: 1fr 3fr;
  }
  .row:first-of-type {
    margin-top: 1rem;
  }
  .word {
    flex-wrap: nowrap;
  }
  .default_word_container {
    width: auto;
  }
  .synonyms_container {
    margin-top: 0;
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
}
</style>