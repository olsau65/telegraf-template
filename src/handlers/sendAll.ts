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
      'Новые штрафы ГИБДД для водителей вступают в силу в РФ с 1 марта 2022 года\n\n' +
        'Ссылка на статью - https://avtonovostidnya.ru/transport/267768'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
