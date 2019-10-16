const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: "F8iCaGWKf2ZxafTf1MhZLuSu_SsgvDw8WEkwtf1JYw0",
    clientSecret: "vsY5P7eDO4ljFXtx8rK8ljLFxfZ1KK1SDdns2ZceHBujmKizqNdLCwVXLj+HKtx"
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