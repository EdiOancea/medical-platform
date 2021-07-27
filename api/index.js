require('dotenv').config();
import bottle from './src/bottle';

const port = process.env.PORT || 8000;
bottle.container.app.listen(port, () => console.log(`The app is running port ${port}.`));
