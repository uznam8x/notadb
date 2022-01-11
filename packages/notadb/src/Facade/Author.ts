import { curryN } from "../libs/ramda";

export default curryN(3, (id: number, name: string, avatar: string) => {
  return { author: { id, name, avatar } };
});
