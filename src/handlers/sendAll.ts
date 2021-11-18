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
      // 'Скоро новость о новом приложении для Android'
      'Запустили приложение под Android на Google Play "Автоюрист Володя. Помощь с ДПС" https://bit.ly/3qKdyUt\n\n' +
        'Приложение очень простое – дает водителю подсказки в случае остановки сотрудниками ДПС при различных сценариях. Плюс есть ссылки на нормативную базу в подкрепление позиции водителя.'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
