const TEMPLATE_NAME = 'CALAMITY_MODAL'

export const show = (showParam) => {
  return {
    type: `${TEMPLATE_NAME}_OPEN`,
    payload: showParam,
  }
}

export const reset = () => {
  return {
    type: `${TEMPLATE_NAME}_RESET`,
  }
}
