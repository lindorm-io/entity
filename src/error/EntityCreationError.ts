import { ExtendableError } from "@lindorm-io/errors";

export class EntityCreationError extends ExtendableError {
  public constructor(entityName: string) {
    super(`Unable to create Entity ${entityName}`, {
      debug: {
        notes: "The create() event has already been called.",
      },
    });
  }
}
