const express = require('express');
const body_parser = require('body-parser');

const user_mechanics = require('./routes/user_router');

const application = express();
const port_server = process.env.PORT || 9000;

application.use(body_parser.urlencoded({ extended: false }));
application.use('/api', user_mechanics);

application.listen(port_server, () => {
    console.log(`\n[Listen] Application listening at http://localhost:${port_server}\n`);
});