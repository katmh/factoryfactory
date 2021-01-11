<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui;
}

input {
  font-size: 1rem;
  padding: 0.3rem 0.5rem;
  color: #fff;
  background: #444;
  border-radius: 0.25rem;
  border: none;
  outline: none;
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
</style>
