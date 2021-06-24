import { getCalamities, filterCalamities } from '../../api/calamities'

const TEMPLATE_NAME = 'CALAMITIES'

export const list = () => {
  return (dispatch) => {
    getCalamities()
      .then((payload) => {
        const { calamities } = payload
        dispatch({
          type: `${TEMPLATE_NAME}_GET`,
          payload: calamities,
        })
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }
}

export const filter = (params) => {
  return (dispatch) => {
    filterCalamities(params)
      .then((payload) => {
        const { calamities } = payload
        dispatch({
          type: `${TEMPLATE_NAME}_GET`,
          payload: calamities,
        })
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }
}
