export default {
  activePlayer: state => {
    return state.activePlayer;
  },
  cells: state => {
    return state.cells;
  },
  players: state => {
    return state.players;
  },
  plays: state => {
    return state.cells.filter(item => item.symbol).length;
  }
}