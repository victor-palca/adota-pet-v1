export class ResourceNotFoundError extends Error {
  constructor() {
    super('Pet não encontrado.')
  }
}
