import { Model } from "../src/index";

describe("Model", () => {
  test("Insert", () => {
    const posts = new Model();
    posts.insert({ id: 2 });
    expect(posts.length()).toEqual(1);
  });
  test("Creadt and has properties", () => {
    const posts = new Model([{ id: 2 }]);
    const res = posts.find(2);

    expect(Object.keys(res).sort()).toEqual(
      [
        "id",
        "link",
        "type",
        "author",
        "subject",
        "description",
        "thumbnail",
        "media",
        "properties",
        "metadata",
        "relations",
        "createdAt",
        "updatedAt",
        "key",
      ].sort()
    );
  });

  test("Update", () => {
    const posts = new Model([{ id: 2 }]);
    posts.update(2, { subject: "update" });

    const res = posts.find(2);
    expect(res).toMatchObject({ id: 2, subject: "update" });
  });

  test("Destroy", () => {
    const posts = new Model([{ id: 2 }]);
    const res = posts.destroy(2);

    expect(res.length()).toEqual(0);
  });

  test("Find by", () => {
    const posts = new Model([
      { id: 2, subject: "a" },
      { id: 3, subject: "b" },
      { id: 4, subject: "b" },
    ]);

    const res = posts.findBy("subject", "b");
    expect(res).toMatchObject({ id: 3, subject: "b" });
  });

  test("Find all", () => {
    const posts = new Model([
      { id: 2, subject: "a" },
      { id: 3, subject: "b" },
      { id: 4, subject: "b" },
    ]);

    const res = posts.findAll("subject", "b");
    expect(res.length).toEqual(2);
  });

  test("Truncate", () => {
    const posts = new Model([
      { id: 2, subject: "a" },
      { id: 3, subject: "b" },
      { id: 4, subject: "c" },
    ]);

    posts.truncate();
    expect(posts.length()).toEqual(0);
  });
});
