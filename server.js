const express = require('express')
const path = require('path');
const tickets = require('./tickets');

var pg = require('pg');

var conString = process.env.DATABASE_URL || "postgres://postgres:<password>@localhost/ticketdb";

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/ticket/:id?', (req, res) => {
  const id = req.params.id
  if (!id) {
    res.json(tickets)
  } else {
    const ticket = tickets.find(p => p.id == id);
    if (ticket)
      res.json(ticket)
    else
      res.status(404).send('Not Found')
  }
})

app.get('/db', function (request, response) {

  pg.connect(conString, function(err, client, done) {
    client.query('SELECT * FROM ticket', function(err, result) {
      done();
      if (err)
      { console.error(err); response.send("Error " + err); }
      else
      {   console.log('db results ', result.rows); }

    });
  });
})

app.get('/db/tickets', function (request, response) {

    pg.connect(conString, function(err, client, done) {
      client.query('SELECT * FROM ticket', function(err, result) {
        done();
        if (err)
        { console.error(err); response.send("Error " + err); }
        else
        {    response.json(result.rows) }

      });
    });
  })

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log('Express running at localhost: ' + PORT)
})
