const TEMPLATE_NAME = 'CALAMITIES'

const initialState = () => ({
  data: [],
  filter: {
    cities: [],
    data: [],
    term: '',
  },
})

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case `${TEMPLATE_NAME}_GET`: {
      const data = action.payload

      const cities = []
      for (const calamity of action.payload) {
        const city = calamity?.city
        const hasCity = cities.includes(city)
        if (city && !hasCity) {
          cities.push(city)
        }
      }

      return {
        ...state,
        data,
        filter: {
          ...state.filter,
          cities,
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
