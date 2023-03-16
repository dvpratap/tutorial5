const express = require('express');
const bodyParser  = require('body-parser');
const app = express();

app.use(bodyParser.json());

let list = [
    { id: 1, firsName: 'Ian', email: 'ian@dal.ca' },
    { id: 2, firstName: 'Jassica', email: 'jassica@dal.ca' }
  ];

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const index = list.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      const { firstName, email } = req.body;
      list[index] = {
        ...list[index],
        firstName: firstName || list[index].firstName,
        email: email || list[index].email
      };
      res.status(200).json({ message: 'User updated', success: true});
    } else {
      res.status(404).json({ error: 'Object not found', success: false });
    }
  });

app.post('/add', (req, res) => {
    const { email, firstName } = req.body;
    if(email && firstName){
    const id = list.length + 1;
    const newUser = { id, firstName, email };
    list.push(newUser)
    res.status(201).json({ message: 'User added', success: true});
    }
    else{
            res.status(400).json({ success: false, error: "Invalid Data object, missing email or firstName "});
        }
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = list.find(user => user.id === id);
    if (user) {
      res.status(200).json({ success: true, user});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  // handle other errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
module.exports = app;