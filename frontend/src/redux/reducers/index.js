// Global
import { combineReducers } from 'redux'
// Reducers
import calamityModal from './calamityModal.reducer'

const reducers = combineReducers({
  calamityModal,
})

const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export default appReducer
