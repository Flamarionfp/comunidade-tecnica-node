import { Entity } from "../../core/abstracts/entities/entity";
import { Email } from "../../value-objects/email";

interface UserProps {
  email: Email;
  name: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get email(): Email {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.password;
  }

  static create(props: UserProps) {
    return new User(props);
  }
}
