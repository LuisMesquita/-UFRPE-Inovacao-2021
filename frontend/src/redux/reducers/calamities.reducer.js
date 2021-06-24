const TEMPLATE_NAME = 'CALAMITIES'

const initialState = () => ({
  data: [],
  filter: {
    data: [],
    term: '',
  },
})

// const filterData = (data) => data

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case `${TEMPLATE_NAME}_GET`: {
      const data = action.payload
      return {
        ...state,
        data,
        filter: {
          ...state.filter,
          data,
        },
      }
    }
    case `${TEMPLATE_NAME}_RESET`: {
      return initialState()
    }
    default:
      return state
  }
}

export default reducer
