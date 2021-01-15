<template>
  <div>
    <div class="share-dialog">
      <header>
        <h3 class="dialog-title" @click="makeURL">Share “{{ phrase }}”</h3>
        <button class="close-button"><svg><use href="#close"></use></svg></button>
      </header>
      
      <input type="text" id="url_input" class="pen-url" v-model="url" readonly />
      <button class="copy-link btn" @click="copy">Copy</button>
    </div>
    <svg class="hidden">
      <defs>
        <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
        
        <symbol id="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></symbol>
      </defs>
    </svg>
    <details>
      <summary>
        <h2>Customize</h2>
        <div id="url_container">
          <button class="share-button btn" type="button" title="Share this page">
            <svg><use href="#share-icon"></use></svg>
            <span>Share</span>
          </button>

          <!-- <button id="url_btn" class="btn" v-on:click="makeURL">Get Shareable URL</button> -->
        </div>
      </summary>
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
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: ["words", "buttonText"],
  computed: {
    url() {
      return window.location.href;
    },
    phrase() {
      return this.words.map(word => word.default).join(" ");
    }
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
    },
    makeURL() {
      this.$emit("makeURL");
    },
    copy() {
      const field = document.getElementById("url_input");
      field.select();
      field.setSelectionRange(0, 999999);
      document.execCommand("copy");
    }
  },

  mounted() {
    const shareButton = document.querySelector('.share-button');
    const shareDialog = document.querySelector('.share-dialog');
    const closeButton = document.querySelector('.close-button');

    shareButton.addEventListener('click', () => {
      if (navigator.share) { 
      navigator.share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        }).then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
        } else {
            shareDialog.classList.add('is-open');
        }
    });

    closeButton.addEventListener('click', () => {
      shareDialog.classList.remove('is-open');
    });
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

summary {
  background: #222;
  color: #eee;
  padding: 1rem 0;
  cursor: pointer;
}

h2 {
  margin: 0;
  font-size: 1.15rem;
  display: inline-block;
  vertical-align: middle;
}

#url_label {
  color: #ddd;
  font-weight: bold;
  font-size: 1.15rem;
  margin: 1rem 0 0.5rem;
  display: inline-block;
}

#url_input {
  width: 100%;
  margin-right: 0.5rem;
}

#url_btn {
  font-size: 1rem;
  padding: 0.2rem 0.4rem;
}

#url_input, #url_btn {
  font-size: 1rem;
  height: 2rem;
}

#url_and_btn {
  display: flex;
  margin-bottom: 1rem;
}

@media (min-width: 600px) {
  h2 {
    margin: 0 0 0 0.25rem;
  }
  #url_container {
    float: right;
  }
  #url_label {
    margin: 0;
  }
  #url_input {
    width: 15rem;
    margin: 0 0.5rem 0 0.25rem;
    height: 2rem;
  }
  #url_btn {
    height: 1.7rem;
  }
  #url_and_btn {
    display: inline-block;
    margin: 0;
  }
}

@media (min-width: 700px) {
  #url_input {
    width: 20rem;
  }
}

.hidden {
  display: none;
}

svg {
  width: 15px;
  height: 15px;
  margin-right: 7px;
}

button:hover, .button:hover {
  border-color: #cdd;
}

.share-dialog {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.share-dialog {
  display: none;
  width: 95%;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0,0,0,.15);
  z-index: -1;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.share-dialog.is-open {
  display: block;
  z-index: 2;
}

header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.close-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.close-button svg {
  margin-right: 0;
}
</style>