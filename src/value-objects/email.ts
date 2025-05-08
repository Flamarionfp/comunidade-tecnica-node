import { BadRequestException } from "../core/exceptions/bad-request";

export class Email {
  private readonly _value: string;

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new BadRequestException("Email inválido");
    }

    this._value = email.toLowerCase();
  }

  static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    return regex.test(email);
  }

  get value(): string {
    return this._value;
  }
}
