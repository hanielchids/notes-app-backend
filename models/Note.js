const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Note = sequelize.define('Note', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    audioPath: { type: DataTypes.STRING, allowNull: true },
});

Note.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
module.exports = Note;
