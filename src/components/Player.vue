<template>
  <div>
    <h1 class="name font-weight-light" :style="style" :class="{ active }">
      {{ name }}
    </h1>
  </div>
</template>

<style scoped>
.active {
  background-color: var(--bg-hover-color);
  color: white !important;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}
</style>

<script>
export default {
  name: "Player",
  props: {
    first: {
      required: false,
      type: Boolean,
      defautl: false,
    },
    color: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    symbol: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      active: this.first,
    };
  },
  computed: {
    style() {
      return {
        color: this.color,
        border: `3px solid ${this.color}`,
        "--bg-hover-color": this.color,
      };
    },
  },
  mounted() {
    this.$store.dispatch("addPlayer", this.$props);
    if (this.active) {
      this.$store.dispatch("setActivePlayer", this.$props);
    }
    this.$root.$on("toggle-active-player", () => {
      this.active = !this.active;
      if (this.active) {
        this.$store.dispatch("setActivePlayer", this.$props);
      }
    });
  },
};
</script>
