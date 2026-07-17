import i18next from 'i18next'

export const initI18Next = () => {
  return i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          default_error: 'Неизвестная ошибка',
          required_error: 'Не должно быть пустым',
          url_error: 'Ссылка должна быть валидным URL',
          button_text: 'Добавь',
          input_label: 'Ссылка RSS',
          ok_message: 'OK',
        },
      },
    },
  })
}
