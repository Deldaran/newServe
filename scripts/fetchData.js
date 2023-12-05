const { User, Stuff } = require('../index');

const fetchData = async () => {
  try {
    const result = await User.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [7.2619532, 43.7101728] },
          distanceField: 'distance',
          spherical: true,
        },
      },
      {
        $lookup: {
          from: 'stuffs',
          localField: '_id',
          foreignField: 'user_id',
          as: 'stuffs',
        },
      },
    ]);
    result.forEach(user => {
        console.log('User:', user);
        console.log('Stuffs:');
        user.stuffs.forEach(stuff => {
          console.log('   -', stuff);
        });
  
        console.log('-----------------------');
      });
    process.exit();
  } catch (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }
};

fetchData();