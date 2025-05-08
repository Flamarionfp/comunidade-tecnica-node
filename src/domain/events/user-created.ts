import { EventInterface } from "../../core/abstracts/events";
import { Email } from "../../value-objects/email";

interface UserCreatedEventDTO {
  email: Email;
  name: string;
}

export class UserCreatedEvent implements EventInterface<UserCreatedEventDTO> {
  date: Date;
  eventData: UserCreatedEventDTO;

  constructor(eventData: UserCreatedEventDTO) {
    this.date = new Date();
    this.eventData = eventData;
  }
}
