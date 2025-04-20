export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Org já cadastrada.');
  }
} 