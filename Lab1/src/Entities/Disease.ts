export class Disease {
  protected id: number;
  protected name: string;
  constructor(disease: { id: number; name: string }) {
    const { id, name } = disease;
    this.id = id;
    this.name = name;
  }
  get id_() {
    return this.id;
  }
  get name_() {
    return this.name;
  }
  set name_(name: string) {
    this.name = name;
  }
}
