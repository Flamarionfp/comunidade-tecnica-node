import { EventInterface } from "./event";
import { EventHandlerInterface } from "./event-handler";

export interface EventDispatcherInterface {
  register(eventName: string, handler: EventHandlerInterface): void;
  notify<T>(event: EventInterface<T>): void;
}
