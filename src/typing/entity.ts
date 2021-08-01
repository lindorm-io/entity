import { Optional } from "./utility";

export interface EntityEvent {
  name: string;
  payload: Record<string, any>;
  date: Date;
}

export interface EntityAttributes {
  id: string;
  created: Date;
  events: Array<EntityEvent>;
  updated: Date;
  version: number;
}

export type EntityOptions = Optional<EntityAttributes, "id" | "created" | "events" | "updated" | "version">;

export interface ILindormEntity<Attributes extends EntityAttributes> extends EntityAttributes {
  create(): void;
  getKey(): string;
  schemaValidation(): Promise<void>;
  toJSON(): Attributes;
}
