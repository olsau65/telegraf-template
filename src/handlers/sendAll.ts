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
      'Вступил в силу закон об уголовной ответственности для водителей-лихачей:\n\n' +
        'читайте в статье https://bit.ly/3zIqwV9'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
