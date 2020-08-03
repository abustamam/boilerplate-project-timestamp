const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isValidDate = (d) => d instanceof Date && !isNaN(d);

app.get('/api/timestamp/:date_string?', (req, res) => {
  const {
    params: { date_string },
  } = req;
  const date = date_string ? new Date(date_string) : new Date();
  if (!isValidDate(date)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
