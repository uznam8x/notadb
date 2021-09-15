import { Record } from "notadb";
import { Dispatch, SetStateAction, useState } from "react";

export default function useRecord(
  row: Partial<Record> = {}
): [Record, Dispatch<SetStateAction<Partial<Record>> | Partial<Record>>] {
  const [content, setContent] = useState<Record>(new Record(row));

  const update = (next: any) => {
    let row = {};
    if (typeof next === "function") {
      row = next() as Partial<Record>;
    } else {
      row = next;
    }

    setContent((state) => state.update(row));
  };
  return [content, update];
}
