import { Context, Markup } from 'telegraf'
import { localeActions } from './handlers/language'
// Setup @/ aliases for modules
import 'module-alias/register'
// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { bot } from '@/helpers/bot'
import { ignoreOldMessageUpdates } from '@/middlewares/ignoreOldMessageUpdates'
import { sendHelp } from '@/handlers/sendHelp'
import { i18n, attachI18N } from '@/helpers/i18n'
import { setLanguage, sendLanguage } from '@/handlers/language'
import { getMainMenu } from '@/handlers/mainMenu'
import { attachUser } from '@/middlewares/attachUser'
import { protocolScene } from './handlers/protocol'
import { dutiesScene } from './handlers/dutiesOfficer'
import { dirtyScene } from './handlers/dirty'
import { violationsScene } from './handlers/violationsOfficer'
import { beltScene } from './handlers/belt'
import { speedScene } from './handlers/speed'
import { rightsDriverScene } from './handlers/rightsDriver'
import { alcoholScene } from './handlers/alcohol'
import { overtakeScene } from './handlers/overtake'

// Middlewares
bot.use(ignoreOldMessageUpdates)
bot.use(attachUser)
bot.use(i18n.middleware(), attachI18N)

// Commands
bot.start((ctx) =>
  ctx.replyWithHTML(
    'Привет! Я - ассистент Володя. Помогаю правильно общаться с инспектором ДПС.\n\n' +
      'Главное помните - вы невиновны, пока СУД не доказал обратное.\n\n' +
      'Держитесь спокойно и уверенно.\n\n' +
      'Включите запись на телефоне или видеорегистраторе или попросите об этом пассажиров. И вы и инспектор имеете право на аудио- и видеофиксацию.\n\n' +
      'Приоткройте боковое окно - офицер должен подойти и представиться (смотрите в меню <b>"Обязанности инспектора"</b>).',
    getMainMenu()
  )
)
bot.command('help', sendHelp)
bot.command('language', sendLanguage)

bot.hears('Обгон', (ctx) =>
  ctx.replyWithHTML(
    overtakeScene(),
    Markup.inlineKeyboard([
      Markup.button.url(
        'решение ВС РФ',
        'http://www.vsrf.ru/press_center/mass_media/26545/'
      ),
    ])
  )
)

bot.hears('Обязанности инспектора', (ctx) =>
  ctx.replyWithHTML(
    dutiesScene(),
    Markup.inlineKeyboard(
      [
        Markup.button.url(
          'П. 45,52 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/66c419ccc3c1b8205260739743cce08ca7b92cb5/'
        ),
        Markup.button.url(
          'Ст.5 закона О полиции',
          'http://www.consultant.ru/document/cons_doc_LAW_110165/50d6a5fc9ad995f3efca10bca062875531f1d30f/'
        ),
      ],
      { columns: 2 }
    )
  )
)
bot.hears('Ваши права', (ctx) =>
  ctx.replyWithHTML(
    rightsDriverScene(),
    Markup.inlineKeyboard(
      [
        Markup.button.url(
          'Ст.51 Конституции',
          'http://www.consultant.ru/document/cons_doc_LAW_28399/83e04083255cc765ad2af577efd8db4607b207d5/'
        ),
        Markup.button.url(
          'П.51 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/66c419ccc3c1b8205260739743cce08ca7b92cb5/'
        ),
        Markup.button.url(
          'П.84,89,91 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/dbbfac1c0ef0ee0b778c4fd5075b18de5d4d3f27/'
        ),
        Markup.button.url(
          'П.132 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/4afe5bd7c3584f33c86a3799783ea9508560d0ea/'
        ),
        Markup.button.url(
          'Ст.8 Закона о полиции',
          'http://www.consultant.ru/document/cons_doc_LAW_110165/a9c08e29adb629fb145160965279ad2efd397de7/'
        ),
        Markup.button.url(
          'решение ВС РФ',
          'http://www.vsrf.ru/press_center/mass_media/26545/'
        ),
      ],
      { columns: 2 }
    )
  )
)
bot.hears('Алкоголь', (ctx) =>
  ctx.replyWithHTML(
    alcoholScene(),
    Markup.inlineKeyboard([
      Markup.button.url(
        'П. 234 Адм.регламента',
        'http://www.consultant.ru/document/cons_doc_LAW_280037/4afe5bd7c3584f33c86a3799783ea9508560d0ea/'
      ),
    ])
  )
)
bot.hears('Нарушения инспектора', (ctx) =>
  ctx.replyWithHTML(
    violationsScene(),
    Markup.inlineKeyboard(
      [
        Markup.button.url(
          'П. 45,52 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/66c419ccc3c1b8205260739743cce08ca7b92cb5/'
        ),
        Markup.button.url(
          'Ст.5 закона О полиции',
          'http://www.consultant.ru/document/cons_doc_LAW_110165/50d6a5fc9ad995f3efca10bca062875531f1d30f/'
        ),
      ],
      { columns: 2 }
    )
  )
)
bot.hears('Скорость', (ctx) => ctx.replyWithHTML(speedScene()))
bot.hears('Ремень', (ctx) => ctx.replyWithHTML(beltScene()))
bot.hears('Грязный знак', (ctx) => ctx.replyWithHTML(dirtyScene()))
bot.hears('Протокол', (ctx) =>
  ctx.replyWithHTML(
    protocolScene(),
    Markup.inlineKeyboard(
      [
        Markup.button.url(
          'Ст.28.1.1 КоАП',
          'http://www.consultant.ru/document/cons_doc_LAW_34661/777b1cbcecd072d6956dfe3563ec84636919491c/'
        ),
        Markup.button.url(
          'Ст.28.2 КоАП',
          'http://www.consultant.ru/document/cons_doc_LAW_34661/86eb9da50d2bebf0f8320070bcc298ad5a93d41a/'
        ),
        Markup.button.url(
          'П.134,151,168,211 Адм.регламента',
          'http://www.consultant.ru/document/cons_doc_LAW_280037/4afe5bd7c3584f33c86a3799783ea9508560d0ea/'
        ),
      ],
      { columns: 2 }
    )
  )
)
bot.hears('Назад в меню', (ctx) => ctx.reply('Главное меню', getMainMenu()))

// Actions
bot.action(localeActions, setLanguage)

// Errors
bot.catch(console.error)

bot.on('text', (ctx) => {
  ctx.reply('Просто открой меню и выбери нужный пункт')
})

// Start bot
bot.launch().then(() => {
  console.info(`Bot ${bot.botInfo.username} is up and running`)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
