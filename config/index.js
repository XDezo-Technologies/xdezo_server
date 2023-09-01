const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

var corOptions={
    origin:'http://localhost:8081'
};

// app.use(cors(corOptions));

const offerRoutes=require('../routes/offer_routes/offer_route.js');
const eventRoutes=require('../routes/events_routes/events_routes.js');
const courseDetailsRoutes=require('../routes/courses_routes/courese_details_routes/courese_details_routes.js');
const newsRoutes=require('../routes/news_routes/news_routes.js');
const userRoutes=require('../routes/user_routes/user_routes.js');
const reviewRoutes=require('../routes/review_routes/review_routes.js');
const courseCategoryRoutes=require('../routes/courses_routes/course_category_routes/course_category_routes.js');
const searchRoutes=require('../routes/search_routes/search_routes.js');
const bannerRoutes=require('../routes/slider_routes/slider_route.js');
const messageRoutes=require('../routes/chats_routes/group_chat_controller/group_chat_routes.js');
const quizRoutes=require('../routes/quiz_route/quiz_route.js');






app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use('/images', express.static('assets/images'));

app.use('/',offerRoutes);
app.use('/',eventRoutes);
app.use('/',courseDetailsRoutes);
app.use('/',newsRoutes);
app.use('/',userRoutes);
app.use('/',reviewRoutes);
app.use('/',courseCategoryRoutes);
app.use('/',searchRoutes);
app.use('/',bannerRoutes);
app.use('/',messageRoutes);
app.use('/',quizRoutes);




// app.use('/',courseCategoryRoutes);
// app.use('/',courseRatingRoutes);







module.exports=app;