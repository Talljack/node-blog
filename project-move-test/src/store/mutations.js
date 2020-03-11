import * as types from './mutation-types'

const mutations = {
  [types.SET_TASKLIST] (state, list) {
    state.taskList = list
  },
  [types.SET_SELECTLIST] (state, list) {
    state.selectList = list
  }
}
export default mutations
