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
      'Отмена техосмотра, новый КоАП и уголовка для водителей:\n\n' +
        'что ждет автомобилистов в 2022 году - читайте в статье https://bit.ly/3sOjT28'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
