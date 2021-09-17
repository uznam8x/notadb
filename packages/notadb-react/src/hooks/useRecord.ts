import { Record } from "notadb";
import { Dispatch, SetStateAction, useState } from "react";

export default function useRecord(
  row: Partial<Record> = {}
): [Record, Dispatch<SetStateAction<Record> | Partial<Record>>] {
  const [content, setContent] = useState<Record>(new Record(row));

  const update = (next: any) => {
    let row = typeof next === "function" ? (next(content) as Partial<Record>) : next;
    setContent((state) => state.update(row));
  };
  return [content, update];
}
