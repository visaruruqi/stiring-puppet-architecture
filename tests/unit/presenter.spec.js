import { container} from "@/ioc/ioc";
import {TYPES} from "@/ioc/types";

describe("Presenter Communication",
    () => {

        let presenter, repository;

        beforeEach(() => {
            repository = container.get(TYPES.RegisterRepository);
            presenter = container.get(TYPES.RegisterPresenter);
            //presenter.subscribeToChanges();
        })

        it("receives name and email from repository correctly",
            async () => {

                expect(presenter.viewModel.name).toBe(null);
                expect(presenter.viewModel.email).toBe(null);


                await presenter.load();

                expect(presenter.viewModel.name).toBe("Visar Uruqi")
                expect(presenter.viewModel.email).toBe("visar@hotelkeyapp.com")

                repository.changeModel("Nabeel", "nabeel@hotelkeyapp.com")

                expect(presenter.viewModel.name).toBe("Nabeel");
                expect(presenter.viewModel.email).toBe("nabeel@hotelkeyapp.com")

            })

        it("receives groups data from repository correctly", async () => {


            expect(presenter.viewModel.groups.length).toBe(0);

            repository.addGroup(Date.now());

            expect(presenter.viewModel.groups.length).toBe(1)

        })

        it("calls api and receives back a result", async () => {

            let response = {
                result: {
                    name: "Bruce Lee",
                    email: "bruce@hotelkeyapp.com"
                }
            }

            //simulate backend
            repository.gateway.get = jest.fn().mockImplementation((path) => {
                return Promise.resolve(response)
            })

            /*response.loa({
                name: "Amir",
                email: "amir@hotelkeyapp.com"
            })*/

            await repository.load();

            expect(repository.pm.name).toBe("Bruce Lee");

        })


    })
