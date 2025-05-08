import { EventInterface } from "./event";

export interface EventHandlerInterface<
  T extends EventInterface<object> = EventInterface<object>
> {
  handle(event: T): void;
}
