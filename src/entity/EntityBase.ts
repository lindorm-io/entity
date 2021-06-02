import { v4 as uuid } from "uuid";
import { IEntity, EntityAttributes, EntityOptions, EntityEvent } from "../typing";

export abstract class EntityBase<Attributes extends EntityAttributes> implements IEntity<Attributes> {
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

  public abstract create(): void;

  public abstract getKey(): string;

  public abstract schemaValidation(): Promise<void>;

  public abstract toJSON(): Attributes;

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
