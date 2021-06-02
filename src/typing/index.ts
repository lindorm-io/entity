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

export interface EntityOptions {
  id?: string | null;
  created?: Date | null;
  events?: Array<EntityEvent> | null;
  updated?: Date | null;
  version?: number | null;
}

export interface IEntity<Attributes extends EntityAttributes> extends EntityAttributes {
  create(): void;
  getKey(): string;
  schemaValidation(): Promise<void>;
  toJSON(): Attributes;
}
