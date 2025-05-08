import { describe, it, expect, vi } from "vitest";

import { InMemoryUserRepository } from "../../src/repositories/in-memory/user";
import { MockEmailService } from "../mocks/email-service";
import { SendWelcomeEmailHandler } from "../../src/services/event-handlers/send-welcome-email";
import { EventDispatcher } from "../../src/core/events/event-dispatcher";
import { UserEventsRegister } from "../../src/config/event-handlers/user-events-register";
import { CreateUserUsecase } from "../../src/usecases/create-user";

describe("CreateUserUsecase", () => {
  it("should create a user and notify via event domain", async () => {
    const emailService = new MockEmailService();

    const sendWelcomeEmailHandler = new SendWelcomeEmailHandler(emailService);

    const eventDispatcher = new EventDispatcher();

    const userEventsRegister = new UserEventsRegister(
      eventDispatcher,
      sendWelcomeEmailHandler
    );

    console.log("Handlers antes do register");

    console.log(eventDispatcher.getEventHandlers());

    userEventsRegister.register();

    console.log("Handlers depois do register");

    console.log(eventDispatcher.getEventHandlers());

    const userRepository = new InMemoryUserRepository();

    const usecase = new CreateUserUsecase(userRepository, eventDispatcher);

    const dto = {
      name: "Flama",
      email: "flama@example.com",
      password: "Aa123456*",
    };

    expect(userRepository.users.length).toBe(0);

    await usecase.execute(dto);

    expect(userRepository.users.length).toBe(1);

    expect(emailService.sendEmail).toHaveBeenCalled();
  });
});
