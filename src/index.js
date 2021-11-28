const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { config, checkConfig } = require('./config');

const app = express();

checkConfig();

app.use(fileUpload({ createParentPath: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
app.use('/player', require('./routers/player'));
app.use('/data', require('./routers/getData'));
app.use('/search', require('./routers/search'));
app.use('/setdb', require('./routers/setData'));
app.use('/addUser', require('./routers/addUser'));

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server start on port ${config.PORT}`);
});
