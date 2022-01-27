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
      '5 хитрых вопросов инспектора ГИБДД — для чего их задают и как ответить?\n\n' +
        'Ссылка на статью - https://www.zr.ru/content/articles/932955-5-strannykh-voprosov-inspektora/'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
