export interface IEntity {
  id: string;
  created: Date;
  updated: Date;
  events?: Array<IEntityEvent>;
  version: number;
  create?: () => void;
}

export interface IEntityBaseOptions {
  id?: string;
  created?: Date;
  updated?: Date;
  events?: Array<IEntityEvent>;
  version?: number;
}

export interface IEntityEvent {
  name: string;
  payload: Record<string, any>;
  date: Date;
}
