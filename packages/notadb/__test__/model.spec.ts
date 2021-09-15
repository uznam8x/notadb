import { Model } from "../src/index";

describe("model", () => {
  test("Creadt and has properties", () => {
    const post = new Model([{ id: 2 }]);
    const res = post.find(2);

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
    const post = new Model([{ id: 2 }]);
    const aaa = post.update(2, { subject: "update" });
    const res = aaa.find(2);
    expect(res.subject).toEqual("update");
  });
  
});
