import * as R from "ramda";
import Record from "../Record";

export default class Model {
  private record: Record[];
  len: number;
  constructor(record: Partial<Record>[]) {
    this.record = record.map(
      (v, i: number) =>
        new Record({
          id: i + 1,
          key: Math.random().toString(36).substr(2, 11),
          ...v,
        })
    );
    this.len = record.length;
  }

  insert({ id = this.len + 1, ...rest }: Record): Model {
    const row = new Record({ id, ...rest } as Partial<Record>);
    this.len++;
    this.record.push(row);
    return this;
  }

  update(id: number, params: Partial<Record>): Model {
    const index = R.findIndex((v: Record) => v.id === id)(this.record);
    const item = R.nth(index)(this.record);
    const res = R.update(index, { ...item, ...params })(this.record);
    this.record = res as Record[];
    return this;
  }

  find(id: number): Record {
    return R.find((v: Record) => v.id === id)(this.record) as Record;
  }

  findAll(key: string, value: string | number): Record[] {
    return R.filter((v: Record) => v[key] === value)(this.record);
  }

  findBy(key: string, value: string | number): Record {
    return R.find((v: Record) => v[key] === value)(this.record) as any;
  }

  all(): Record[] {
    return this.record;
  }

  truncate(): Model {
    this.record = [];
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
}
