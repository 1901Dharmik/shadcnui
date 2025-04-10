import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// const newPerson = (num) => {
//   return {
//     id: num,
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     age: faker.number.int(40),
//     visits: faker.number.int(1000),
//     progress: faker.number.int(100),
//     status: faker.helpers.shuffle([
//       'relationship',
//       'complicated',
//       'single',
//     ])[0],
//   }
// }
const newPerson = () => {
  return {
    firstName: faker.person.firstName(),

    lastName: faker.person.lastName(),

    age: faker.number.int(40),

    visits: faker.number.int(1000),

    progress: faker.number.int(100),

    status: faker.helpers.shuffle(["relationship", "complicated", "single"])[0],
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((index) => {
      return {
        ...newPerson(index),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
