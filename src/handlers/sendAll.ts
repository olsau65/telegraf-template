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
      'Определены условия, при которых страховщик может наказать клиента регрессом по ОСАГО за отсутствие диагностической карты\n\n' +
        'Ссылка на статью - https://74.ru/text/auto/2022/02/22/70458962/'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
