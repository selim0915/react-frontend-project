const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

// TODO :: nev가 db 일때만 몽고디비 실행하게 로직 변경 필요
// const URL= process.env.MONGOOSE_URL;
const PORT= process.env.PORT | 3001;
const ROOT = path.resolve(__dirname, 'dist');

const app = express();

// const productRoutes = require('./routes');
// const mongoose = require('mongoose');

// mongoose.connect(URL).then(()=>{
//     console.log('db connected');
// }).catch((err)=>{
//     console.log(err);
// })

const webpackConfig = require('./webpack.config.js');
const compiler  = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));

app.use(express.static(ROOT));
app.use(express.json());

// TODO :: routes가 전체 모듈로 가져올수 있게 로직 변경 필요
// app.use('/api/products', productRoutes);

// TODO :: 공통 에러 처리 파일로 로직 변경 필요
// express 에러처리
// app.use((error, req, res, next) => {
//     res.status(500).json({ message: error.message })
// })

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;