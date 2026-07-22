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
          button_text: 'Добавить',
          input_label: 'Ссылка RSS',
          ok_message: 'RSS успешно загружен',
          xml_parsing_error: 'Ресурс не содержит валидный RSS',
          network_error: 'Ошибка сети',
          rss_duplicate_error: 'RSS уже существует',
          modal_close_button_text: 'Закрыть',
          modal_submit_button_text: 'Читать полностью',
          feeds_header: 'Фиды',
          posts_header: 'Посты',
          form_header: 'RSS агрегатор',
          form_subheader: 'Начните читать RSS уже сегодня! Это легко, это красиво',
          form_example: 'Пример: https://lorem-rss.hexlet.app/feed',
        },
      },
    },
  })
}
