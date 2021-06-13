import { EntityAttributes, EntityEvent, EntityOptions } from "../typing";
import { v4 as uuid } from "uuid";

export abstract class EntityBase {
  public readonly id: string;
  public readonly created: Date;
  public readonly events: Array<EntityEvent>;
  protected _updated: Date;
  protected _version: number;

  protected constructor(options: EntityOptions = {}) {
    this.id = options.id || uuid();
    this.created = options.created || new Date();
    this.events = options.events || [];

    this._updated = options.updated || new Date();
    this._version = options.version || 0;
  }

  public get updated(): Date {
    return this._updated;
  }
  public set updated(updated: Date) {
    this._updated = updated;
  }

  public get version(): number {
    return this._version;
  }
  public set version(version: number) {
    this._version = version;
  }

  protected defaultJSON(): EntityAttributes {
    return {
      id: this.id,
      created: this.created,
      events: this.events,
      updated: this.updated,
      version: this.version,
    };
  }

  protected addEvent(name: string, payload: Record<string, any>): void {
    this.events.push({
      name,
      payload,
      date: new Date(),
    });
  }
}
