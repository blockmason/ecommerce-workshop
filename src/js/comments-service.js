const { link } = require('@blockmason/link-sdk');

const commentsMicroservice = link({
    clientId: process.env.COM_LNK_CLIENT_ID,
    clientSecret: process.env.COM_LNK_CLIENT_SECRET
});


module.exports = {
    commentsInMemory: [],
    
    addCommentsInMemory: function(comments) {
        this.commentsInMemory.push(comments);
    },

    postComment: async function(event) {
        let textArea = $(event.target).closest("div.message-area").find("textarea");
        let stampId = $(event.target).parents(".panel-stamp").find(".btn-own").data('id');
    
        if (textArea.val() !== '') {
            message = textArea.val();
            const reqBody = {
                "asset": stampId,
                "comment": message
            };
            this.addCommentsInMemory(reqBody);
            textArea.val('');
            this.printComments();
            await commentsMicroservice.post('/postComment', reqBody);
        }
        await this.getComments();
    },

    getComments: async function() {
        const comments = await commentsMicroservice.get('/events/Comment');
        this.commentsInMemory = [];
        comments.data.forEach((data) => {
            this.addCommentsInMemory(data);
        });
    },

    printComments: function() {
        let comments = this.commentsInMemory;
        this.removeComments()

         comments.forEach((commentObject) => {

             const commentsRow = document.getElementById(commentObject.asset);

             if (commentsRow != null) {
                elChild = document.createElement('div');
                elChild.innerHTML = "<div class='alert alert-warning'> '" + commentObject.comment + "' - SomeUser 1" + "</div>";
                commentsRow.prepend(elChild);
            }
        });
    },

    removeComments: function(){
        $('.comments-row').children("div").remove();
    }
}