export default {
  addCellData({ commit }, data) {
    commit('ADD_CELL_DATA', data);
  },
  addPlayer({ commit }, props) {
    commit('ADD_PLAYER', props)
  },
  resetCells({ commit }) {
    commit('RESET_CELLS');
  },
  setActivePlayer({ commit }, props) {
    commit('SET_ACTIVE_PLAYER', props);
  },
  setCellSymbol({ commit }, symbol) {
    commit('SET_CELL_SYMBOL', symbol);
  }
}