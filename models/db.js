const { Sequelize, Model, DataTypes } = require('sequelize');
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

// city model
class City extends Model {}
City.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'city',
  }
);

// hotel model
class Hotel extends Model {}
Hotel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'hotel',
  }
);

// booking model
class Booking extends Model {}
Booking.init({}, { sequelize, modelName: 'booking' });

// relatiosnships
City.hasMany(Hotel);
Hotel.belongsTo(City);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

module.exports = {
  sequelize,
  User,
  City,
  Hotel,
  Booking,
};
