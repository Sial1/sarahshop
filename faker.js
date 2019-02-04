const faker = require("faker");
const axios = require("axios");

for (let i = 0; i < 100; i++) {
  var random = faker.commerce.department();

  axios.post("https://sarahshop.herokuapp.com/department/create", {
    title: random
  });
}
