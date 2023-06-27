import "reflect-metadata";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import RegisterHttpGateway from "../../shared/Gateway/RegisterHttpGateway";
import {injectable} from "inversify";

@injectable()
export default class RegisterRepository {

    gateway;
    pm = {name: null, email: null};
    groups = [];

    constructor() {
        this.gateway = new RegisterHttpGateway();
        makeObservable(this,{
            pm: observable,
            groups: observable,
            load: action,
            submit: action,
            changeModel: action,
            addGroup: action,
            getLengthOfGroups: computed,
        })
    }

    async load() {
        const dto = await this.gateway.get();
        runInAction(()=>{
            this.pm.name = dto.result.name;
            this.pm.email = dto.result.email;
        })

    }

    get getLengthOfGroups() {
        return this.groups.length;
    }

    async submit(obj) {
        let dto = {name: obj.name, email: obj.email};
        let response = await this.gateway.post(dto);
        if (response.success) {
            //console.log("API data valid set the committed value");
            //this.pm = { name: response.result.name, email: response.result.email };
            this.pm.name = obj.name;//response.result.name;
            this.pm.email = obj.email; //response.result.email;

        } else {
            //console.log("API data invalid then just reload everything");
            await this.load();
        }
    }

    changeModel(name, email) {
        this.pm = {name,email}
    }

    addGroup(timestamp) {
        this.groups.push(timestamp);
    }
}
