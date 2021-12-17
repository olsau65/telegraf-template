import { findAllUsers } from '@/models'
import { Context } from 'telegraf'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendAll(ctx: Context) {
  const all = await findAllUsers()
  let i = 0
  all.forEach(function (message) {
    i += 1
    ctx.telegram.sendMessage(
      message.id,
      'Вышла новая версия нашего приложения для Android на Google Play "Автоюрист Володя. Помощь с ДПС" - https://bit.ly/32aSJXO\n\n' +
        'Приложение очень простое – дает водителю подсказки в случае остановки сотрудниками ДПС при различных сценариях. Плюс есть ссылки на нормативную базу в подкрепление позиции водителя.\n\n' +
        'В новой версии улучшен дизайн. Добавлена кнопка "SOS" - для быстрого набора горячей линии МВД'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
