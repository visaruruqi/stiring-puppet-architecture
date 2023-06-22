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

        reaction(
            () => [repository.pm.name, repository.pm.email], // Reacts when `repository.pm.name` or `repository.pm.email` changes
            ([name, email]) => { // Called with the new values
                console.log("** Presenter ** pm name or email changed:", name, email);

                this.viewModel.name = name;
                this.viewModel.email = email;
            }
        );

        reaction(() => repository.groups.slice(),
            groups => {
                console.log("** Presenter ** groups changed:", groups);
                this.viewModel.groups = groups;

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
