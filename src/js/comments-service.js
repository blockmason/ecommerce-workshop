const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: process.env.COMMENT_CLIENT_ID,
    clientSecret: process.env.COMMENT_CLIENT_SECRET
});


commentsService = {

    postComment: async function (reqBody) {
            return await commentsMicroservice.post('/postComment', reqBody);
    },

    getComments: async function () {
        return await commentsMicroservice.get('/events/Comment');
    },
}

module.exports = commentsService;