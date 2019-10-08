const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: "F8iCaGWKf2ZxafTf1MhZLuSu_SsgvDw8WEkwtf1JYw0",
    clientSecret: "vsY5P7eDO4ljFXtx8rK8ljLFxfZ1KK1SDdns2ZceHBujmKizqNdLCwVXLj+HKtx"
});


module.exports = {
    commentsInMemory: [],

    postComment: async function (commentText, ID) {
            const reqBody = {
                "asset": ID,
                "comment": commentText
            };
            $('#' + ID + '-comment-area').val('');
            this.storeComments(reqBody);
            await commentsMicroservice.post('/postComment', reqBody);
    },

    getComments: async function () {
        const comments = await commentsMicroservice.get('/events/Comment');
        comments.data.forEach((data) => {
            this.storeComments(data)
        });
    },

    storeComments: function(commentData) {
        this.commentsInMemory.push(commentData);
    },

    readCommentsInMemory: function() {
        console.log(this.commentsInMemory);
        return this.commentsInMemory;
    }
}