import "reflect-metadata";
import {action, computed, makeObservable, observable, reaction} from "mobx";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import {inject, injectable, postConstruct} from "inversify";
import {TYPES} from "@/ioc/types";

@injectable()
export default class RegisterFormPresenter {

    viewModel = {
        name: null,
        email: null,
        groups: []
    };

    @inject(TYPES.RegisterRepository) repository;

    constructor() {
        makeObservable(this,
            {
                viewModel: observable,
                load: action,
                changeData: action,
                addGroup: action,
                submitRegisterForm: action,
                getLengthOfGroups: computed
            });
    }

    @postConstruct()
    init() {
        // Your initialization code that depends on RegisterRepository can be placed here
        console.log('Post-construction code');
        reaction(
            () => [this.repository.pm.name, this.repository.pm.email], // Reacts when `repository.pm.name` or `repository.pm.email` changes
            ([name, email]) => { // Called with the new values
                //console.log("** Presenter ** pm name or email changed:", name, email);

                this.viewModel.name = name;
                this.viewModel.email = email;
            }
        );

        reaction(() => this.repository.groups.slice(),
            groups => {
                //console.log("** Presenter ** groups changed:", groups);
                this.viewModel.groups = groups;

            })
    }

    get getLengthOfGroups(){
        return this.viewModel.groups.length;
    }

    async load() {
        await this.repository.load();
    }

    changeData(name, email) {
        this.repository.changeModel(name, email)
    }

    addGroup(timestamp) {
        this.repository.addGroup(timestamp);
    }

    async submitRegisterForm(newData) {
        await this.repository.submit(newData);
    }
}
