export interface EmailServiceInterface {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
