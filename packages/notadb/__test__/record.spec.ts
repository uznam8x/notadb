import { Model } from "../src/index";

describe("Record", () => {
  test("Property", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        properties: { like: { label: "like", value: 11 } },
      },
    ]);

    const res = posts.find(1);
    const like = res.prop("like");
    expect(like).toEqual(11);
  });

  test("All Property", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        properties: {
          like: { label: "like", value: 11 },
          bookmark: { label: "bookmark", value: 12 },
        },
      },
    ]);

    const res = posts.find(1);
    const props = res.prop();
    expect(props).toMatchObject({ like: 11, bookmark: 12 });
  });

  test("Metadata", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        metadata: [{ label: "like", name: "like", value: 12 }],
      },
    ]);

    const res = posts.find(1);
    const like = res.meta("like");
    expect(like).toEqual(12);
  });
  test("All metadata", () => {
    const posts = new Model([
      {
        id: 1,
        subject: "title",
        metadata: [
          { label: "like", name: "like", value: 12 },
          { label: "bookmark", name: "bookmark", value: 13 },
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
});
