import i18next from 'i18next'

export const addErrorToState = (error, state) => {
  const errorMessage = validateError(error)
  state.isValid = false
  state.errorMessage = errorMessage
}

export const validateError = (error) => {
  if (error.name === 'ValidationError') {
    return error.errors[0]
  }
  if (error.message === 'xml_parsing_error') {
    return i18next.t('xml_parsing_error')
  }
  if (error.message === 'rss_duplicate_error') {
    return i18next.t('rss_duplicate_error')
  }
  return error
}
