import { Markup } from 'telegraf'

export function getMainMenu() {
  return Markup.keyboard([
    ['Обязанности инспектора', 'Ваши права'],
    ['Протокол', 'Нарушения инспектора'],
    ['Обгон', 'Скорость', 'Ремень'],
    ['Грязный знак', 'Алкоголь'],
  ])
    .oneTime(false)
    .resize()
}
