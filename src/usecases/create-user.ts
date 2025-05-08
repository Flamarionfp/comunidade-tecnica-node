import { EventDispatcherInterface } from "../core/abstracts/events/event-dispatcher";
import { User } from "../domain/entities/user";
import { UserRepository } from "../repositories/base/user";
import { UserCreatedEvent } from "../domain/events/user-created";
import { BadRequestException } from "../core/exceptions/bad-request";
import { Email } from "../value-objects/email";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventDispatcher: EventDispatcherInterface
  ) {}

  execute = async (dto: CreateUserDTO) => {
    const user = User.create({
      email: new Email(dto.email),
      name: dto.name,
      password: dto.password,
    });

    const existingUser = await this.userRepository.findByEmail(
      user.email.value
    );

    if (existingUser) {
      throw new BadRequestException("Já existe um usuário com esse e-mail");
    }

    await this.userRepository.save(user);

    const event = new UserCreatedEvent({
      email: user.email,
      name: user.name,
    });

    this.eventDispatcher.notify(event);
  };
}
