import { curryN } from "../libs/ramda";
import { Property } from "../types";

export default curryN(3, (label: string, key: string, value: any): Property => {
  return {
    [key]: { label, value },
  };
});
