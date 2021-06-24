// Global
import { combineReducers } from 'redux'
// Reducers
import calamityModal from './calamityModal.reducer'
import calamities from './calamities.reducer'

const reducers = combineReducers({
  calamityModal,
  calamities,
})

const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export default appReducer
