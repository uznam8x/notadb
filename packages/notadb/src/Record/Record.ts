import { Metadata, Author, Media, Property } from "../types";
// import * as R from "ramda";

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

  constructor(row: Partial<Record>) {
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
  prop(key?: string) {
    if (key) {
      return this.properties[key].value;
    }
    return this.properties;
  }
  meta(key?: string) {
    /* if (key) {
      return R.pipe(
        R.find((v: Metadata) => v.name === key),
        R.prop("value")
      )(this.metadata as any);
    } */
    console.log(key);
    return this.metadata;
  }
}
