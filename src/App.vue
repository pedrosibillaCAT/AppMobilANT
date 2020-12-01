<template>
  <v-app>
    <v-col>
      <v-row class="my-8 py-0 display-1" justify="center">
        <h1 style="color:black">Ta-</h1>
        <h1 style="color:black">Te-</h1>
        <h1 style="color:black">Ti</h1>
      </v-row>
      <v-row justify="center">
        <h3 v-if="notName">Nombre de los jugadores</h3>
      </v-row>
      <v-col class="my-8 py-0" v-if="notName">
        <v-text-field v-model="player1" label="Nombre: Jugador 1"> </v-text-field>
        <v-text-field v-model="player2" label="Nombre: Jugador 2"> </v-text-field>
        <v-btn color="primary" @click="go(notName, player1, player2)"
          >Empezar</v-btn
        >
      </v-col>
      <v-row class="my-0 py-0" justify="center" v-if="notName == false">
        <Player
          :first="true"
          :color="'#1976d2'"
          :name="player1"
          :symbol="'x'"
        ></Player>
        <Player :color="'#009688'" :name="player2" :symbol="'o'"></Player>
      </v-row>
      <v-row class="my-8" justify="center" v-if="notName == false">
        <Controls></Controls>
      </v-row>
      <Board class="mt-8" v-if="notName == false"></Board>
    </v-col>
  </v-app>
</template>

<script>
import Board from "./components/Board";
import Controls from "./components/Controls";
import Player from "./components/Player";
export default {
  name: "App",
  components: {
    Board,
    Controls,
    Player,
  },
  data() {
    return {
      notName: true,
      player1: "",
      player2: "",
    };
  },
  methods: {
    go(notName, player1, player2) {
      this.notName = false;
      if (player1 == "" || null) {
        this.player1 = "Jugador 1";
      }
      if (player2 == "" || null) {
        this.player2 = "Jugador 2";
      }
      return notName;
    },
  },
};
</script>
