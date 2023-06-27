<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="vm.name">

      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="vm.email">
      </div>
      <div>
        {{presenter.getLengthOfGroups}}
      </div>
      <div>
        <button @click="loadData" type="button">Get Data</button>
        <button type="submit">Submit</button>
      </div>

    </form>

    <button @click="changeModelInRepository" type="button">Update Model in Repository</button>
    <button @click="addGroup" type="button">Add Group</button>
  </div>
</template>

<script>
import {reaction} from "mobx";
import {observer} from "mobx-vue";
import {container} from "@/ioc/ioc";
import {TYPES} from "@/ioc/types";

export default observer({
  name: "RegisterForm",
  data() {
    return {
      presenter: container.get(TYPES.RegisterPresenter),
      vm: {
        name: null,
        email: null,
        groups: [],
      },
    }
  },
  mounted() {

    reaction(
        () => [this.presenter.viewModel.name, this.presenter.viewModel.email], // Reacts when `repository.pm.name` or `repository.pm.email` changes
        ([name, email]) => { // Called with the new values
          //console.log("********* pm name or email changed:", name, email);

          this.vm.name = name;
          this.vm.email = email;
        }
    );

    reaction(
        () => [this.presenter.viewModel.groups], // Reacts when `repository.pm.name` or `repository.pm.email` changes
        ([groups]) => { // Called with the new values
          //console.log("********* groups changed:", groups);

          this.vm.groups = groups;
        }
    );

    this.presenter.load()
  },
  methods: {
    loadData() {
      this.presenter.load();
    },
    submitForm() {
      this.presenter.submitRegisterForm({
        name: this.vm.name,
        email: this.vm.email
      })
    },
    changeModelInRepository() {
      this.presenter.changeData("John Doe", "john@hotelkeyapp.com")
    },
    addGroup() {
      this.presenter.addGroup(Date.now())
    }

  },
})
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 40%;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

input[type="text"], input[type="email"] {
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  padding: 10px 20px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


</style>
