import { Model } from "../src/index";
// import * as R from "ramda";
describe("Events", () => {
  test("created", () => {
    const posts = new Model();
    posts.on("Created", (e: any) => {
      expect(e.target.length).toEqual(0);
    });
  });

  test("inserted", () => {
    const posts = new Model([{ id: 2 }]);
    posts.on("inserted", (e: any) => {
      expect(e.target.length).toEqual(2);
    });
    posts.insert({ id: 3 });
  });

  test("upcated", () => {
    const posts = new Model([{ id: 2 }]);
    posts.on("updated", (e: any) => {
      expect(e.record.subject).toEqual("test");
    });
    posts.update(2, { subject: "test" });
  });

  test("destroyed", () => {
    const posts = new Model([{ id: 2 }]);
    posts.on("destroyed", (e: any) => {
      expect(e.target.length).toEqual(0);
    });
    posts.destroy(2);
  });

  test("truncated", () => {
    const posts = new Model();
    posts.on("truncated", (e: any) => {
      expect(e.target.length).toEqual(0);
    });
    posts.truncate();
  });

  test("changed", () => {
    const posts = new Model();
    posts.on("changed", (e: any) => {
      expect(e.type).toEqual("inserted");
    });
    posts.insert({ id: 2 });
  });
});
