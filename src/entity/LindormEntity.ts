import { EntityAttributes, EntityOptions, ILindormEntity } from "../typing";
import { EntityBase } from "./EntityBase";

export abstract class LindormEntity<Attributes extends EntityAttributes>
  extends EntityBase
  implements ILindormEntity<Attributes>
{
  protected constructor(options: EntityOptions = {}) {
    super(options);
  }

  public abstract create(): void;

  public abstract getKey(): string;

  public abstract schemaValidation(): Promise<void>;

  public abstract toJSON(): Attributes;
}
