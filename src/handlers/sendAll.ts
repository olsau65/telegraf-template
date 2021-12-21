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
      'В журнале "За рулем" вышла хорошая статья о процедурах осмотра и досмотра автомобиля сотрудниками ДПС.\n\n' +
        'В чем разница этих процедур и рекомендации о том, как вести себя водителю - читайте в статье https://bit.ly/33Cneqo'
    )
    if (i == 29) {
      sleep(1000)
      i = 0
    }
  })
}
