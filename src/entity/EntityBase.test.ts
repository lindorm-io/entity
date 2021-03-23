import MockDate from "mockdate";
import { EntityBase } from "./EntityBase";
import { IEntityBaseOptions } from "../typing";

jest.mock("uuid", () => ({
  v4: () => "e397bc49-849e-4df6-a536-7b9fa3574ace",
}));

MockDate.set("2020-01-01 08:00:00.000");

class Entity extends EntityBase {
  constructor(options: IEntityBaseOptions) {
    super(options);
  }
  create() {
    this.addEvent("created", { created: true });
  }
}

describe("EntityBase.ts", () => {
  let entity: Entity;

  beforeEach(() => {
    const date = new Date("2020-01-01 08:00:00.000");
    entity = new Entity({
      created: date,
      updated: date,
      events: [
        {
          name: "before",
          payload: { payload: true },
          date: date,
        },
      ],
    });
  });

  test("should have all data", () => {
    expect(entity).toMatchSnapshot();
  });

  test("should create", () => {
    entity.create();
    expect(entity).toMatchSnapshot();
  });

  test("should get id", () => {
    expect(entity.id).toMatchSnapshot();
  });

  test("should get created", () => {
    expect(entity.created).toMatchSnapshot();
  });

  test("should get/set updated", () => {
    expect(entity.created).toMatchSnapshot();
    entity.updated = new Date("2021-01-01 00:00:01");
    expect(entity.updated).toMatchSnapshot();
  });

  test("should get events", () => {
    expect(entity.events).toMatchSnapshot();
  });

  test("should get/set version", () => {
    expect(entity.version).toMatchSnapshot();
    entity.version = 99;
    expect(entity.version).toMatchSnapshot();
  });
});
