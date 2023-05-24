export class Specialisation {
  protected id_: number;
  protected name_: string;
  constructor(specialisation: { id: number; name: string }) {
    const { id, name } = specialisation;
    this.id_ = id;
    this.name_ = name;
  }
  get id() {
    return this.id_;
  }
  get name() {
    return this.name_;
  }
}
