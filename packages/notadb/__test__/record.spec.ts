import { Record, Model, Metadata, Property, Facade } from "../src/index";

describe("Record", () => {
  test("Get Property", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        properties: Object.assign.apply(Object, [
          Facade.prop("like", "like", 1),
          Facade.prop("bookmark", "bookmark", 0),
        ]),
      },
    ]);

    const res = posts.find(1);
    expect(res.prop("like")).toEqual(1);
    expect(res.prop("bookmark")).toEqual(0);
    expect(res.prop("a")).toEqual(undefined);
  });

  test("Set Property", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        properties: Facade.prop("like", "like", 1),
      },
    ]);

    const res = posts.find(1);
    const like = res.prop("like", 11);
    expect(like).toEqual(11);
  });

  test("All Property", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        properties: Object.assign(
          Facade.prop("like", "like", 11),
          Facade.prop("bookmark", "bookmark", 12)
        ),
      },
    ]);

    const res = posts.find(1);
    const props = res.prop();
    expect(props).toMatchObject({ like: 11, bookmark: 12 });
  });

  test("Get Metadata", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        metadata: [
          Facade.meta("like", "like", 12),
          Facade.meta("bookmark", "bookmark", 0),
        ],
      },
    ]);

    const res = posts.find(1);
    expect(res.meta("like")).toEqual(12);
    expect(res.meta("bookmark")).toEqual(0);
    expect(res.prop("a")).toEqual(undefined);
  });

  test("Set Metadata", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        metadata: [Facade.meta("like", "like", 1)],
      },
    ]);

    const res = posts.find(1);
    const like = res.meta("like", 12);
    expect(like).toEqual(12);
  });

  test("All metadata", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        metadata: [
          Facade.meta("like", "like", 12),
          Facade.meta("bookmark", "bookmark", 13),
        ],
      },
    ]);

    const res = posts.find(1);
    const metas = res.meta();
    expect(metas).toEqual([
      { name: "like", value: 12 },
      { name: "bookmark", value: 13 },
    ]);
  });

  test("Enumeration", () => {
    const record = new Record({
      id: 1,
      subject: "title",
      array: [
        { label: "temp", name: "a", value: 1 },
        { label: "temp", name: "b", value: 2 },
      ],
      object: {
        a: { label: "temp", value: 1 },
        b: { label: "temp", value: 2 },
      },
    }) as Record & { array: Metadata[]; object: Property };

    const metas = record.enum(record.array);
    const props = record.enum(record.object);

    expect(metas).toEqual({ a: 1, b: 2 });
    expect(props).toEqual({ a: 1, b: 2 });
  });
});
