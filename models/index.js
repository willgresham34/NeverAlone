const User = require('./User');
const Post = require('./Post');
const comments = require('./comments');
const Comments = require('./comments');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comments.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });

module.exports = {
    User,
    Post,
    Comments
};