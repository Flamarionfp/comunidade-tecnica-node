import { EmailServiceInterface } from "../../core/abstracts/email/email-service";
import { EventHandlerInterface } from "../../core/abstracts/events";
import { UserCreatedEvent } from "../../domain/events/user-created";

export class SendWelcomeEmailHandler
  implements EventHandlerInterface<UserCreatedEvent>
{
  constructor(private readonly emailService: EmailServiceInterface) {}

  handle = async (event: UserCreatedEvent) => {
    const { email, name } = event.eventData;

    const subject = "Bem-vindo!";
    const body = `Olá ${name}, seja bem-vindo à nossa plataforma! Estamos felizes em tê-lo com a gente.`;

    await this.emailService.sendEmail(email.value, subject, body);
  };
}
