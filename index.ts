import server from './src/app';
import db from "./src/db";

const PORT = process.env.PORT || 3001;

db.sequelize.sync({ alter: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
        });
    })
    .catch((e: any) => console.log('ERROR :( ' + e));


