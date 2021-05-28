export interface IEntityEvent {
  name: string;
  payload: Record<string, any>;
  date: Date;
}

export interface IEntityAttributes {
  id: string;
  created: Date;
  events: Array<IEntityEvent>;
  updated: Date;
  version: number;
}

export interface IEntityOptions {
  id?: string;
  created?: Date;
  events?: Array<IEntityEvent>;
  updated?: Date;
  version?: number;
}

export interface IEntity extends IEntityAttributes {
  create(): void;
  getKey(): string;
  schemaValidation(): Promise<void>;
  toJSON(): void;
}
