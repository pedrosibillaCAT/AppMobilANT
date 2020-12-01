<template>
  <div>
    <v-row>
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              large
              color="primary"
              dark
              fab
              @click="restartGame"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-restart
              </v-icon>
            </v-btn>
          </template>
          <span>Restart</span>
        </v-tooltip>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              large
              color="primary"
              dark
              fab
              @click="restartGame2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-home
              </v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Restart",
  methods: {
    restartGame() {
      this.$store.dispatch("resetCells");
      this.$root.$emit("restart-game");
    },
    restartGame2() {
      location.reload();
    },
  },
};
</script>
