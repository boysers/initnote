export interface IMark {
  userId: string
  isPrivate: boolean
  created: Date
  lastUpdate: Date
  title?: string
  comment?: string
  url?: string
  imageUrl?: string
}
