import express from 'express';
import path from 'path';

// import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';

import api from './routes';


const app = express();
const port = process.env.PORT || 3000;
// const devPort= 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect(process.env.MONGO_DB, {useMongoClient: true});

const db = mongoose.connection;
db.once('open', function() { console.log('Connected to mongodb server'); });
db.on('error', console.error);

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', api);
// 이렇게 서버 메인 파일에서 api 라우터를 불러오게 되면,
// http://URL/api/account/signup 이런식으로 api 를 사용 할 수 있게 됩니다.

/* support client-side routing */
app.get('*', (req, res, next) => {
    const regExp = /bundle.js$/;
    if(!regExp.test(req.url)) {
        res.sendFile(path.resolve(__dirname, './../public/index.html'));
    } else {
        next();
    }
});
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './../public/index.html'));
// });

// Express 에러처리
/* handle error, 라우터에서 throw err 가 실행되면 이 코드가 실행됩니다 */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

// app.get('/hello', (req, res)=>{
//     return res.send('Hello CodeLab');
// });

app.listen(port, ()=>{
    console.log('Express is listening on port', port);
});

// if(process.env.NODE_ENV == 'development'){
//     console.log('Server is running on development mode');
//     const config = require('../webpack.dev.config');
//     const compiler = webpack(config);
//     const devServer = new WebpackDevServer(compiler, config.devServer);
//     devServer.listen(
//         devPort, () => {
//             console.log('webpack-dev-server is listening on port', devPort);
//         }
//     );
// }