export class Specialisation {
  protected id: number;
  protected name: string;
  constructor(specialisation: { id: number; name: string }) {
    const { id, name } = specialisation;
    this.id = id;
    this.name = name;
  }
  get id_() {
    return this.id;
  }
  get name_() {
    return this.name;
  }
}
