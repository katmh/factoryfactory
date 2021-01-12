<template>
  <summary>
    <h2>Customize</h2>
    <div id="url_container">
      <label id="url_label" for="url">Shareable URL: </label>
      <div id="url_and_btn">
        <input id="url_input" name="url" type="text" v-bind:value="url" readonly />
        <button id="url_btn" @click="copy">Copy</button>
      </div>
    </div>
  </summary>
</template>

<script>
export default {
  name: 'EditorHeader',
  props: ["url"],
  methods: {
    copy() {
      const field = document.getElementById("url");
      field.select();
      field.setSelectionRange(0, 999999);
      document.execCommand("copy");
    }
  },
};
</script>

<style scoped>
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
  height: 1.5rem;
  font-size: 0.95rem;
  margin-right: 0.5rem;
}

#url_btn {
  height: 1.5rem;
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
</style>