import { EventDispatcherInterface } from "../../core/abstracts/events/event-dispatcher";
import { SendWelcomeEmailHandler } from "../../services/event-handlers/send-welcome-email";

export class UserEventsRegister {
  constructor(
    private readonly dispatcher: EventDispatcherInterface,
    private readonly sendWelcomeEmailHandler: SendWelcomeEmailHandler
  ) {}

  register = () => {
    this.dispatcher.register("UserCreatedEvent", this.sendWelcomeEmailHandler);
  };
}
