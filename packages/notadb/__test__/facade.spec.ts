import { Facade } from "../src/index";
describe("Facade", () => {
  test("Metadata", () => {
    expect(Facade.meta("like", "like", 2)).toEqual({
      label: "like",
      name: "like",
      value: 2,
    });
  });
  test("Property", () => {
    expect(Facade.prop("like", "like", 2)).toEqual({
      like: {
        label: "like",
        value: 2,
      },
    });
  });
  test("Author", () => {
    expect(Facade.author(1, "like", "http://www.domain.com")).toEqual({
      author: { id: 1, name: "like", avatar: "http://www.domain.com" },
    });
  });

  test("Timestamps", () => {
    expect(Facade.timestamps(new Date("2022-01-01"))).toEqual({
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    });
  });
});
