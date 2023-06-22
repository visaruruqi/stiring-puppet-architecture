import {action, makeObservable, observable} from "mobx";
import {gateway} from "../Gateway/RegisterHttpGateway"


class RegisterRepository {

    pm = {name: null, email: null};
    groups = [];

    constructor() {
        makeObservable(this, {
            pm: observable,
            groups: observable,
            load: action,
            changeModel: action,
            addGroup: action
        })
    }

    async load() {
        const dto = await gateway.get();
        this.pm.name = dto.result.name;
        this.pm.email = dto.result.email;
    }

    async submit(obj) {
        let dto = {name: obj.name, email: obj.email};
        let response = await gateway.post(dto);
        if (response.success) {
            console.log("API data valid set the committed value");
            //this.pm = { name: response.result.name, email: response.result.email };
            this.pm.name = obj.name;//response.result.name;
            this.pm.email = obj.email; //response.result.email;

        } else {
            console.log("API data invalid then just reload everything");
            await this.load();
        }
    }

    changeModel(name, email) {
        this.pm.name = name;
        this.pm.email = email;
    }

    addGroup(timestamp) {
        this.groups.push(timestamp);
    }
}

export const repository = new RegisterRepository();
