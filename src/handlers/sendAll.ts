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
      'В ГИБДД рассказали об основаниях для проверки водителя на состояние опьянения и уровне промилле\n\n' +
        'Ссылка на статью - https://www.autonews.ru/news/6203d5089a794706b0276509'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
