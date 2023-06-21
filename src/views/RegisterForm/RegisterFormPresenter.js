import {repository} from "@/shared/Repository/RegisterRepository";
import {action, makeObservable, observable, reaction} from "mobx";

class RegisterFormPresenter {

    viewModel = {
        name: null,
        email: null,
        groups: []
    };

    constructor() {
        makeObservable(this,
            {
                viewModel: observable,
                load: action,
                changeData: action,
                addGroup: action,
                submitRegisterForm: action
            });

        reaction(() => repository.pm, pm => {
            console.log("Rock pm changed:", pm);
            this.viewModel = {
                ...this.viewModel,
                ...{
                    name: pm.name,
                    email: pm.email
                },
            }
        })

        reaction(() => repository.groups, groups => {
            console.log("Rock groups changed:", groups);

            this.viewModel = {...this.viewModel, ...{groups}};
        })

    }

    async load() {
        await repository.load();
    }

    changeData(name, email) {
        repository.changeModel(name, email)
    }

    addGroup(timestamp) {
        repository.addGroup(timestamp);
    }

    async submitRegisterForm(newData) {
        await repository.submit(newData);
    }
}

export default RegisterFormPresenter;
