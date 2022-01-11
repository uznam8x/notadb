import { curryN } from "../libs/ramda";
import { Metadata } from "../types";

export default curryN(
  3,
  (label: string, name: string, value: any): Metadata => {
    return { label, name, value };
  }
);
