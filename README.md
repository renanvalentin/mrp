Machine-readable passport 
--------

![](https://media.giphy.com/media/UIjj0gnQrgGZy/giphy.gif)

https://en.wikipedia.org/wiki/Machine-readable_passport

A machine-readable passport (MRP) is a machine-readable travel document (MRTD) with the data on the identity page encoded in optical character recognition format. Many countries began to issue machine-readable travel documents in the 1980s.

#### Usage

```javascript

import { generate } from 'mrp';

 const passport = {
    name: {
        firstName: 'Donkey',
        surname: 'Kong',
        lastName: 'Country'
    },
    country: 'Brazil',
    number: 'YO213971',
    dateOfBirth: '920322',
    gender: 'M',
    expirationDate: '120722',
    personalNumber: '12345678901234'
};

const [firstRow, secondRow] = mrp.generate(passport);

console.log(firstRow)  // P<BRAKong<Country<<Donkey<<<<<<<<<<<<<<<<<<<
console.log(secondRow) // YO213971<9BRA9203228M12072201234567890123452
```

#### Docker

Make sure to have [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

#### Demo

- Run the demo:

  ```bash
  make demo
  ```
- Navigate to http://localhost:3000/demo/index.htm

#### Tests

- Edit tests in `./test/tests`
- Run the tests:

  ```bash
  make test
  ```