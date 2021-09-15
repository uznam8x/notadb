import * as R from "ramda";
import Record from "../Record";

export default class Model {
  private record: Record[];
  private increase: number = 0;
  constructor(record: Partial<Record>[] = []) {
    this.record = record.map(
      (v, i: number) =>
        new Record({
          id: i + 1,
          key: Math.random().toString(36).substr(2, 11),
          ...v,
        })
    );
    this.increase = record.length;
  }

  findIndex(id: number): number {
    return R.findIndex((v: Record) => v.id === id, this.record);
  }

  insert({ id = this.increase + 1, ...rest }: Partial<Record>): Model {
    const row = new Record({ id, ...rest } as Partial<Record>);
    const res = R.insert(-1, row, this.record);
    this.record = res as Record[];
    this.increase++;

    return this;
  }

  update(id: number, params: Partial<Record>): Model {
    const item = this.find(id);
    const res = R.update(
      this.findIndex(id),
      { ...item, ...params },
      this.record
    );
    this.record = res as Record[];
    return this;
  }

  destroy(id: number): Model {
    const res = R.remove(this.findIndex(id), 1, this.record);
    this.record = res as Record[];
    return this;
  }

  find(id: number): Record {
    return R.find((v: Record) => v.id === id)(this.record) as Record;
  }

  findBy(key: string, value: string | number): Record {
    return R.find((v: Record) => v[key] === value)(this.record) as any;
  }

  findAll(key: string, value: string | number): Record[] {
    return R.filter((v: Record) => v[key] === value)(this.record);
  }

  all(): Record[] {
    return this.record;
  }

  truncate(): Model {
    this.record = [] as Record[];
    return this;
  }

  property(name: string, ...args: [any, string]) {
    const [value, label] = args;
    return {
      [name]: { label, value },
    };
  }

  metadata(name: string, ...args: [any, string]) {
    const [value, label] = args;
    return {
      label,
      name,
      value,
    };
  }

  length(): number {
    return this.record.length;
  }
}
