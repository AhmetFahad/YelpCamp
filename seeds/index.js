const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campGround");

mongoose.connect("mongodb://localhost:27017/campGroundDB");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      price: price,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam animi cum quod vel, recusandae itaque esse neque repudiandae minima dolorem aspernatur consequuntur blanditiis officia accusamus tenetur corrupti culpa sint consequatur.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
