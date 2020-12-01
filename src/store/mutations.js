export default {
  ADD_CELL_DATA(state, payload) {
    state.cells.push(payload);
  },
  ADD_PLAYER(state, payload) {
    state.players.push({ name: payload.name, symbol: payload.symbol });
  },
  RESET_CELLS(state) {
    state.cells = [];
  },
  SET_ACTIVE_PLAYER(state, payload) {
    state.activePlayer.color = payload.color;
    state.activePlayer.name = payload.name;
    state.activePlayer.symbol = payload.symbol;
  },
  SET_CELL_SYMBOL(state, payload) {
    state.cells[payload.index].symbol = payload.symbol;
  }
}