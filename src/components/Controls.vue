<template>
  <div id="controls-container">
    <Restart></Restart>
  </div>
</template>

<style scoped>
#controls-container {
  position: relative;
}
</style>

<script>
import Restart from "./controls/Restart";

export default {
  name: "Controls",
  components: { Restart },
};
</script>