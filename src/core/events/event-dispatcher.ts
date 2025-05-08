import {
  EventDispatcherInterface,
  EventHandlerInterface,
  EventInterface,
} from "../abstracts/events";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register = (eventName: string, handler: EventHandlerInterface) => {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  };

  notify = <T>(event: EventInterface<T>) => {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      const parsedEvent = event as EventInterface<object>;

      this.eventHandlers[eventName].forEach((handler) =>
        handler.handle(parsedEvent)
      );
    }
  };
}
