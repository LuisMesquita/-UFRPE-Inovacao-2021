/**
 * Mount a query string params
 * @param {Object} params
 * @returns {String} query string
 */
export function mountQueryString(params) {
  if (params) {
    let queryString = ''
    Object.keys(params).forEach((p) => {
      if (params[p] || params[p] === 0) {
        queryString += `${!queryString.length ? '?' : '&'}${p}=${params[p]}`
      }
    })
    return queryString
  }
  return ''
}
