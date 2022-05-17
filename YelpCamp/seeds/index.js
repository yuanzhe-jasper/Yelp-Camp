const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
//连接数据库
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {

    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5f5c330c2cd79d538f2c66d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, consequatur. Sit quisquam quae, aliquid ullam vel, eligendi qui saepe dolor magnam vero ratione nostrum eos temporibus nisi architecto? Iste, esse!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dtgncfhv1/image/upload/v1640306815/YelpCamp/cxyeustljzkg6mnleqs6.jpg',
                  filename: 'YelpCamp/cxyeustljzkg6mnleqs6',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})