import { vi } from "vitest";
import { EmailServiceInterface } from "../../src/core/abstracts/email/email-service";

export class MockEmailService implements EmailServiceInterface {
  sendEmail = vi.fn(async (email: string, subject: string, body: string) => {
    console.log(`Sending email to: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  });
}
