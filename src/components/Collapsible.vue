<template>
  <div class="Collapsible">
    <div id="header">
      <div class="flex">
        <h2>Customize</h2>
        <button
          @click.prevent="handleClick"
          type="button"
          :class="{
            Collapsible__trigger: true,
            'Collapsible__trigger--open': !transitioning && open,
            'Collapsible__trigger--closed': !transitioning && !open,
            'Collapsible__trigger--transitioning': transitioning,
          }"
        >
          <slot name="trigger" v-if="open">
            <span class="Collapsible__triggerLabel">
              <div class="caret" :class="!open ? `closed` : `open`"></div>
            </span>
          </slot>

          <slot name="closedTrigger" v-if="!open">
            <slot name="trigger">
              <span class="Collapsible__triggerLabel">
                <div class="caret" :class="!open ? `closed` : `open`"></div></span>
            </slot>
          </slot>
        </button>
      </div>
      <div id="url_container">
        <label class="label" for="url">Shareable URL: </label>
        <input id="url" name="url" type="text" v-bind:value="url" readonly />
      </div>
    </div>

    <div
      :class="{
        Collapsible__content: true,
        'Collapsible__content--open': !transitioning && open,
        'Collapsible__content--closed': !transitioning && !open,
        'Collapsible__content--transitioning': transitioning,
      }"
      :style="{
        height,
        transitionProperty: 'height',
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
      }"
      @transitionend="handleEnd"
    >
      <div class="Collapsible__contentInner" ref="inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapsible',
  data() {
    return {
      open: this.isOpen,
      height: this.isOpen ? 'auto' : '0px',
      closeOnNextTick: false,
      transitioning: false,
    };
  },
  props: {
    openLabel: {
      type: String,
      default: '∨',
    },
    closedLabel: {
      type: String,
      default: '∧',
    },
    transitionDuration: {
      type: String,
      default: '400ms',
    },
    transitionTimingFunction: {
      type: String,
      default: 'ease',
    },
    transitionDelay: {
      type: String,
      default: '0s',
    },
    isOpen: {
      default: false,
      type: Boolean,
    },
    onCollapse: {
      default: () => {},
      type: Function,
    },
    url: {}
  },
  methods: {
    handleClick() {
      this.onCollapse(!this.isOpen);
      this.open = !this.open;
    },
    handleEnd() {
      if (this.height !== '0px') {
        this.height = 'auto';
      }
      this.transitioning = false;
    },
  },
  watch: {
    open(newVal, oldVal) {
      this.transitioning = true;
      this.height = this.$refs.inner.scrollHeight + 'px';

      if (oldVal === true) {
        this.closeOnNextTick = true;
      }
    },
    isOpen(newVal) {
      this.open = newVal;
    },
  },
  updated() {
    this.$nextTick(() => {
      window.setTimeout(() => {
        if (this.closeOnNextTick) {
          this.height = '0px';
          this.closeOnNextTick = false;
        }
      });
    });
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.Collapsible__content {
  overflow: hidden;
}

.Collapsible__contentInner {
  height: auto;
}

.Collapsible__trigger {
  appearance: none;
  border: 0;
  background: transparent;
  border-radius: 0;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  text-align: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  cursor: pointer;
}

.Collapsible__triggerLabel {
  color: #fff;
  font-weight: bold;
}

  #header {
    background: #222;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    width: 95%;
    margin-left: 2.5%;
    bottom: 2.5%;
    padding: 1.3rem;
  }
  .label {
    color: #ddd;
    font-weight: bold;
    margin: 0.5rem 0 0.25rem;
  }
  h2 {
    color: #eee;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
  #url {
    width: 20rem;
  }
  button {
    color: green;
  }

.caret {
  position: relative;
}

.caret.closed:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-top: 10px solid #703a3a;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.caret.closed:after {
  content: '';
  position: absolute;
  left: 3px;
  top: 0;
  border-top: 7px solid #ffffff;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}

.caret.open:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 10px solid #703a3a;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}

.caret.open:after {
  content: '';
  position: absolute;
  left: 3px;
  top: 0;
  border-bottom: 7px solid #ffffff;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}
</style>