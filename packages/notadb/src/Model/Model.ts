import * as R from "../libs/ramda";
import EventEmitter from "events";
import Record from "../Record";

export default class Model extends EventEmitter {
  private record: Record[];
  constructor(record: Partial<Record>[] = []) {
    super();
    this.record = record.map(
      (v, i: number) =>
        new Record({
          id: i + 1,
          ...v,
        })
    );

    setTimeout(() => {
      this.trigger("created", {});
    }, 1);
  }
  trigger(channel: string, args: any) {
    this.emit(channel, { ...args, target: this });
  }

  findIndex(id: number): number {
    return R.findIndex((v: Record) => v.id === id, this.record);
  }

  insert({ id = this.length + 1, ...rest }: Partial<Record>): Model {
    const row = new Record({ id, ...rest } as Partial<Record>);
    const res = R.insert(-1, row, this.record);
    this.record = res as Record[];

    this.trigger("inserted", { record: row });
    this.trigger("changed", { type: "inserted", record: row });
    return this;
  }

  update(id: number, params: Partial<Record>): Model {
    const item = this.find(id);
    const row = { ...item, ...params };
    const res = R.update(this.findIndex(id), row, this.record);
    this.record = res as Record[];

    this.trigger("updated", { record: row });
    this.trigger("changed", { type: "updated", record: row });
    return this;
  }

  destroy(id: number): Model {
    const row = this.find(id);
    const res = R.remove(this.findIndex(id), 1, this.record);
    this.record = res as Record[];

    this.trigger("destroyed", { record: row });
    this.trigger("changed", { type: "destroyed", record: row });
    return this;
  }

  truncate(): Model {
    this.record = [] as Record[];

    this.trigger("truncated", {});
    this.trigger("changed", { type: "truncated" });
    return this;
  }

  find(id: number): Record {
    return R.find((v: Record) => v.id === id)(this.record) as Record;
  }

  findBy(key: string, value: string | number): Record {
    return R.find((v: Record) => v[key] === value)(this.record) as Record;
  }

  findAll(key: string, value: string | number): Record[] {
    return R.filter((v: Record) => v[key] === value)(this.record);
  }

  all(): Record[] {
    return this.record;
  }

  head(): Record {
    return R.head(this.record) as Record;
  }

  last(): Record {
    return R.last(this.record) as Record;
  }

  drop(count: number): Record[] {
    this.record = R.drop(count, this.record);
    return this.record;
  }

  get length(): number {
    return this.record.length;
  }

  orderBy(key: string, direction: "desc" | "asc" = "asc"): Record[] {
    const res = R.sort(
      (a, b) => (direction === "asc" ? a[key] - b[key] : b[key] - a[key]),
      this.record
    ) as Record[];
    this.record = res;
    return this.record;
  }

  paginate(count: number, limit: number = Infinity): Record[] {
    const offset = (count - 1) * limit;
    return R.pipe(
      R.slice(offset, Infinity),
      R.take(limit)
    )(this.record) as Record[];
  }
}
