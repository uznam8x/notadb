import { Metadata, Author, Media, Property } from "../types";
import * as R from "../libs/ramda";

export default class Record {
  id: number = -1;
  key: string = "";
  link: string = "";
  type: string = "post";
  author: Partial<Author> = {};
  subject: string = "";
  description: string = "";
  thumbnail: string = "";
  media: Media[] = [];
  properties: Property = {};
  metadata: Metadata[] = [];
  relations: Record[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  [key: string]: any;

  constructor(row: Partial<Record & { [key: string]: any }>) {
    this.key = Math.random().toString(36).substring(2, 11);
    Object.entries(row).forEach((column) => {
      const [key, value] = column;
      this[key] = value;
    });
    if (!row.createdAt) this.createdAt = new Date();
    if (!row.updatedAt) this.updatedAt = new Date();
  }
  update(row) {
    Object.entries(row).forEach((column) => {
      const [key, value] = column;
      this[key] = value;
    });
    if (!row.updatedAt) this.updatedAt = new Date();
    return this;
  }
  prop(key?: string, value?: any) {
    if (key && !R.isNil(value)) {
      this.properties[key].value = value;
      return this.properties[key].value;
    }
    if (key) {
      return R.has(key)(this.properties)
        ? this.properties[key].value
        : undefined;
    }
    return Object.entries(this.properties).reduce(
      (a, b) => ({ ...a, [b[0]]: b[1].value }),
      {}
    );
  }
  meta(key?: string, value?: any) {
    let res: any = {};

    if (key) {
      res = R.find((v: Metadata) => v.name === key)(this.metadata) as Metadata;
    }

    if (key && !R.isNil(value)) {
      res.value = value;
      return R.prop("value", res);
    }

    if (key) {
      const res = R.find((v: Metadata) => v.name === key)(
        this.metadata
      ) as Metadata;
      return R.prop("value", res);
    }

    return this.metadata.map(({ name, value }) => ({ name, value }));
  }
  enum(entries: Metadata[] | Property) {
    if (typeof entries === "object") {
      if (Array.isArray(entries)) {
        return entries.reduce(
          (a: { [key: string]: any }, b: Metadata) => ({
            ...a,
            [b.name]: b.value,
          }),
          {}
        );
      } else {
        return Object.entries(entries).reduce(
          (a: { [key: string]: any }, b: any) => {
            const [key, data] = b;
            return { ...a, [key]: data.value };
          },
          {}
        );
      }
    }

    return [];
  }
}
