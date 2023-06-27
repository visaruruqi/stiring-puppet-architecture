import { Container } from "inversify";
import RegisterRepository from "../shared/Repository/RegisterRepository";
import RegisterFormPresenter from "@/views/RegisterForm/RegisterFormPresenter";
import RegisterHttpGateway from "@/shared/Gateway/RegisterHttpGateway";
import {TYPES} from "@/ioc/types";

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: "Transient"
});

container.bind(TYPES.RegisterRepository).to(RegisterRepository).inSingletonScope();
container.bind(TYPES.RegisterPresenter).to(RegisterFormPresenter);
container.bind(TYPES.RegisterHttpGateway).to(RegisterHttpGateway);
