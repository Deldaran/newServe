const faker = require("faker")
const { User, Stuff } = require('../index');

const NUM_USERS = 10;

const generateFakeData = () => ({
  name: faker.name.findName(),
  location: {
    type: 'Point',
    coordinates: [faker.address.longitude(), faker.address.latitude()],
  },
  description: faker.lorem.sentence(),
});

const migrateData = async () => {
  for (let i = 0; i < NUM_USERS; i++) {
    const fakeData = generateFakeData();
    const user = await User.create({ name: fakeData.name, location: fakeData.location });
    await Stuff.create({ description: fakeData.description, user_id: user._id });
  }

  console.log('Migration completed successfully');
  process.exit();
};

migrateData();