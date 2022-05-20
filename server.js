let express = require('express');
let app = express();

let port = process.env.PORT || 4565;

app.use(express.static('./'));
app.use('/', express.static('./'));


app.listen(port, () => {
    console.log('Server connected at: ' + port)
})