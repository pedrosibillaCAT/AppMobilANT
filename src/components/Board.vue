<template>
  <div id="board-container" ref="board-container"></div>
</template>

<style scoped>
#board-container {
  margin: auto;
  width: 80vw;
  height: 80vw;
  max-width: 400px;
  max-height: 400px;
}
</style>

<script>
import * as d3 from "d3";

export default {
  name: "Board",
  data() {
    return {
      figurePadding: 80,
      gridColor: "black",
      lineWidth: 4,
    };
  },
  computed: {
    activePlayer() {
      return this.$store.getters.activePlayer;
    },
    cells() {
      return this.$store.getters.cells;
    },
    players() {
      return this.$store.getters.players;
    },
    plays() {
      return this.$store.getters.plays;
    },
  },
  methods: {
    renderEmptyBoard() {
      const parent = d3.select(this.$refs["board-container"]);
      const width = parent.node().getBoundingClientRect().width;
      const height = parent.node().getBoundingClientRect().height;
      parent.html(""); // Delete any existing element
      this.svg = parent
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      const cellWidth = width / 3;
      const cellHeight = height / 3;
      let x = 0;
      let y = 0;
      let index = 0;
      const symbol = null;

      // Create array with upper left corner coordinates for each cell
      const data = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          data.push({ x, y, row, col, index });
          this.$store.dispatch("addCellData", { row, col, index, symbol });
          x += cellWidth;
          index++;
        }
        x = 0;
        y += cellHeight;
      }

      // Draw grid and add click event to each rect
      this.svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .on("click", (d, i, n) => {
          const rect = d3.select(n[i]);
          if (this.cells[d.index].symbol) {
            return; // Disable click but not hover
          }
          rect
            .style("cursor", "default")
            .attr("fill", "white")
            .attr("opacity", 1);
          const symbol = this.activePlayer.symbol;
          this.$store.dispatch("setCellSymbol", {
            index: d.index,
            symbol: symbol,
          });
          if (symbol === "o") {
            this.drawO(rect, this.activePlayer.color);
          } else if (symbol === "x") {
            this.drawX(rect, this.activePlayer.color);
          } else {
            console.error('Symbol must be either "x" or "o"');
          }
          this.checkWinner();
          this.$root.$emit("toggle-active-player");
        })
        .on("mouseover", (d, i, n) => {
          const rect = d3.select(n[i]);
          if (!this.cells[d.index].symbol) {
            rect
              .style("cursor", "pointer")
              .transition()
              .attr("fill", this.activePlayer.color)
              .attr("opacity", 0.5);
          }
        })
        .on("mouseout", (d, i, n) => {
          const rect = d3.select(n[i]);
          rect
            .style("cursor", "default")
            .transition()
            .duration(200)
            .attr("fill", "white")
            .attr("opacity", 1);
        })
        .attr("data-row", (d) => d.row)
        .attr("data-col", (d) => d.col)
        .attr("data-index", (d) => d.index)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("fill", "white")
        .attr("stroke", this.gridColor)
        .attr("stroke-width", this.lineWidth);

      // Draw white rectangle to hide outer borders
      this.svg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", this.lineWidth);
    },
    drawO(rect, color) {
      this.svg
        .append("circle")
        .attr("cx", +rect.attr("x") + +rect.attr("width") / 2)
        .attr("cy", +rect.attr("y") + +rect.attr("height") / 2)
        .attr("r", +rect.attr("width") / 3)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", this.lineWidth)
        .attr("pointer-events", "none");
    },
    drawX(rect, color) {
      this.svg
        .append("line")
        .attr("x1", +rect.attr("x") + this.figurePadding)
        .attr("y1", +rect.attr("y") + this.figurePadding)
        .attr("x2", +rect.attr("x") + +rect.attr("width") - this.figurePadding)
        .attr("y2", +rect.attr("y") + +rect.attr("height") - this.figurePadding)
        .attr("stroke", color)
        .attr("stroke-width", this.lineWidth)
        .attr("pointer-events", "none");
      this.svg
        .append("line")
        .attr("x1", +rect.attr("x") + this.figurePadding)
        .attr("y1", +rect.attr("y") + +rect.attr("height") - this.figurePadding)
        .attr("x2", +rect.attr("x") + +rect.attr("width") - this.figurePadding)
        .attr("y2", +rect.attr("y") + this.figurePadding)
        .attr("stroke", color)
        .attr("stroke-width", this.lineWidth)
        .attr("pointer-events", "none");
    },
    checkTrio(trio, winnerSymbol) {
      const symbols = new Array(...new Set(trio.map((item) => item.symbol)));
      if (symbols.length === 1 && !symbols.includes(undefined)) {
        return symbols[0] ? symbols[0] : winnerSymbol;
      } else {
        return winnerSymbol;
      }
    },
    checkWinner() {
      let winnerSymbol = null;
      // Check rows and columns
      for (let i = 0; i < 3; i++) {
        winnerSymbol = this.checkTrio(
          this.cells.filter((item) => item.row === i),
          winnerSymbol
        );
        winnerSymbol = this.checkTrio(
          this.cells.filter((item) => item.col === i),
          winnerSymbol
        );
      }
      // Check diagonals
      winnerSymbol = this.checkTrio(
        [0, 4, 8].map((i) => this.cells[i]),
        winnerSymbol
      );
      winnerSymbol = this.checkTrio(
        [2, 4, 6].map((i) => this.cells[i]),
        winnerSymbol
      );

      if (winnerSymbol) {
        const winnerName = this.players.find(
          (player) => player.symbol === winnerSymbol
        ).name;
        this.endGame(winnerName);
      } else {
        if (this.plays == 9) {
          this.endGame();
        }
      }
    },
    endGame(winnerName = null) {
      this.svg.attr("pointer-events", "none");
      if (winnerName) {
        alert(`Gano el ${winnerName}`);
      } else {
        alert("Empate");
      }
    },
  },
  mounted() {
    this.renderEmptyBoard();
    this.$root.$on("restart-game", () => {
      this.renderEmptyBoard();
    });
  },
};
</script>
