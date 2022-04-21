declare namespace Express {
  interface Request {
    auth: {
      userId?: string
      error?: Error
    }
    mark: {
      userId?: string
      isPrivate?: boolean
      title?: string
      comment?: string
      imageUrl?: string
      error?: Error
    }
  }
}
