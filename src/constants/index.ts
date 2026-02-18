export const TYPE_NAMES = ['тонкое', 'традиционное'] as const

export const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'] as const

export const SORT_LIST = [
  { name: 'по цене', sortProperty: 'price' as const },
  { name: 'по рейтингу', sortProperty: 'rating' as const },
] as const

