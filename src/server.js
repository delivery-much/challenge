const express = require('express');

const app = express();

app.use(express.json());
app.use(errors());

app.listen(3030);
