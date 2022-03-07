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
      'Инспектор ГИБДД хочет оштрафовать за техосмотр — вот что нужно ответить\n\n' +
        'Ссылка на статью - https://www.zr.ru/content/articles/933637-vas-shtrafuyut-za-ezdu-bez-to/'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
