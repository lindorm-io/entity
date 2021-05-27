import MockDate from "mockdate";
import { EntityBase } from "./EntityBase";
import { IEntityBaseOptions } from "../typing";

jest.mock("uuid", () => ({
  v4: () => "e397bc49-849e-4df6-a536-7b9fa3574ace",
}));

MockDate.set("2020-01-01T08:00:00.000Z");

class Entity extends EntityBase<any> {
  constructor(options: IEntityBaseOptions) {
    super(options);
  }

  create() {
    this.addEvent("created", { created: true });
  }

  getKey() {
    return this.id;
  }

  async schemaValidation() {
    return undefined;
  }

  toJSON() {
    return {
      id: this.id,
      created: this.created,
      events: this.events,
      updated: this.updated,
      version: this.version,
    };
  }
}

describe("EntityBase.ts", () => {
  let entity: Entity;

  beforeEach(() => {
    entity = new Entity({
      created: new Date("2020-01-01T07:00:00.000Z"),
      updated: new Date("2020-01-01T09:00:00.000Z"),
      events: [
        {
          name: "before",
          payload: { payload: true },
          date: new Date("2020-01-01T08:00:00.000Z"),
        },
      ],
    });
  });

  test("should get id", () => {
    expect(entity.id).toBe("e397bc49-849e-4df6-a536-7b9fa3574ace");
  });

  test("should get created", () => {
    expect(entity.created).toStrictEqual(new Date("2020-01-01T07:00:00.000Z"));
  });

  test("should get/set updated", () => {
    expect(entity.updated).toStrictEqual(new Date("2020-01-01T09:00:00.000Z"));
    entity.updated = new Date("2021-01-01T00:00:01.000Z");
    expect(entity.updated).toStrictEqual(new Date("2021-01-01T00:00:01.000Z"));
  });

  test("should get events", () => {
    expect(entity.events).toMatchSnapshot();
  });

  test("should get/set version", () => {
    expect(entity.version).toBe(0);
    entity.version = 99;
    expect(entity.version).toBe(99);
  });

  test("should create", () => {
    entity.create();
    expect(entity.events).toMatchSnapshot();
  });

  test("should return key", () => {
    expect(entity.getKey()).toBe("e397bc49-849e-4df6-a536-7b9fa3574ace");
  });

  test("should validate schema", async () => {
    await expect(entity.schemaValidation()).resolves.toBeUndefined();
  });

  test("should return to json", () => {
    expect(entity.toJSON()).toMatchSnapshot();
  });
});
