const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: process.env.COMMENT_CLIENT_ID,
    clientSecret: process.env.COMMENT_CLIENT_SECRET
});

commentsService = {
    postComment: function (reqBody) {
        return commentsMicroservice.post('/postComment', reqBody);
    },

    getComments: function () {
        return commentsMicroservice.get('/events/Comment');
    },
}

module.exports = commentsService;