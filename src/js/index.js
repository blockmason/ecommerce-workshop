const paymentService = require('./payments-service.js');
const commentsService = require('./comments-service.js');
const purchaseService = require('./purchase-service.js');

App = {
  // this will be replaced
  store: [],
  walletMapping: {
    'Drake': '0xc1b63e1bb4aedfbce9cf44316e7738f086d33219'.toLowerCase(),
    'Bianca': '0x83fe96cdd189e4f3c965f37309e1597a8e76aae2'.toLowerCase(),
    'Harish': '0xfe54015db0b55ac8a3ce66f5187772c47911d8a3'.toLowerCase(),
    'STORE': '0xe1c0f84e2cf7b16a56a58b839d21cdda79f55a44'.toLowerCase()
  },
  init: async function () {
    this.store = await purchaseService.getProducts();
    this.printProducts();
    this.loadComments();
  },
  createProduct: function (product) {
    $("#template-object").clone().prependTo("#product-area").attr("id", product.id).removeClass("is-hidden");
    $('#' + product.id).find('.product-name').text(product.product);
    $('#' + product.id).find('.company-name').text(product.company);
    $('#' + product.id).find('.product-description').text(product.description);
    $('#' + product.id).find('.product-amount').text(parseInt(product.quantity, 16));
    $('#' + product.id).find('.product-price').text(product.price).data('price', product.price).data('productID', product.product);
    $('#' + product.id).find('.comment-area').attr('id', product.id + '-comment-area');
    $('#' + product.id).find('.card-content').attr('id', product.id + '-card-content');
    $('#' + product.id).find(".post-comment").attr('id', product.id + '-comment');
    $('#' + product.id).find(".buy-now").attr('id', product.id + '-buy');
    $('#' + product.id).find(".image").css('background-image', 'url(' + product.url + ')');
    $('#' + product.id).find(".post-comment").click(function () {
      App.postComment($('#' + this.id).closest(".column").attr('id'));
    })
    $('#' + product.id).find(".buy-now").click(function () {
      App.purchase($('#' + this.id).closest('.column').find('.product-price').data('price'), $('#' + this.id).closest('.column').find('.product-price').data('productID'));
    })
  },
  printProducts: function () {
    for (i = 0; i < this.store.length; i++) {
      this.createProduct(this.store[i])
    }
  },
  createNewProduct: function () {
    newProductName = $("#new-product-name").val();
    newProductImage = $("#new-product-image").val();
    newProductCompany = $("#new-product-company").val();
    newProductDescription = $("#new-product-description").val();
    newProductAmount = $("#new-product-amount").val();
    newProductPrice = $("#new-product-price").val();
    newProductID = newProductName.replace(/\s/g, '');
    newProduct = { product: newProductName, id: newProductID, url: newProductImage, description: newProductDescription, company: newProductCompany, quantity: newProductAmount, price: newProductPrice }
    this.createProduct(newProduct);
    purchaseService.addProduct(newProductName, newProductAmount, newProductImage, newProductDescription, newProductPrice, newProductCompany, newProductID);
  },
  storeNewComment: async function (commentText, ID) {
    console.log('Recording to the blockchain...');
    await commentsService.postComment(commentText, ID);
    console.log('Done.');
  },
  postComment: async function (commentID) {
    let commentText = $('#' + commentID + '-comment-area');
    if (commentText.val().trim() == '') return;
    this.createComment(commentText.val().trim(), commentID);
    await this.storeNewComment(commentText.val().trim(), commentID);
    commentsService.readCommentsInMemory();
  },
  createComment: function (comment, commentID) {
    let commentTemplate = $('#' + commentID).find('.comment:first').clone().removeClass('is-hidden');
    commentTemplate.html('<article class="is-warning message"><div class="message-body">' + comment + ' — Verified Customer </div></article>');
    let lastComment = $('#' + commentID).find('.comment:last');
    commentTemplate.insertBefore(lastComment);
  },
  loadComments: async function () {
    await commentsService.getComments();
    let commentArray = commentsService.readCommentsInMemory();
    for (i = 0; i <= commentArray.length; i++) {
      if (commentArray[i] != undefined) {
        this.createComment(commentArray[i].comment, commentArray[i].asset);
      }
    }
  },
  currentUser: function () {
    return $('#login-input').find('.input').val();
  },
  userWallet: function (user) {
    return this.walletMapping[user];
  },
  makePurchase: function (buyer, seller, amount, productID) {
    paymentService.transferFrom(buyer, seller, amount)
    purchaseService.purchaseProduct(productID, buyer);
  },
  purchase: async function (productPrice, productID) {
    user = this.userWallet(this.currentUser());
    if (user == NaN || user == undefined) {
      alert('Not logged in');
      return;
    }
    store = this.userWallet('STORE');
    amountInWallet = await paymentService.balanceOf(user);
    if (amountInWallet < productPrice) {
      alert("You Don't Have Enough Money");
      return;
    }
    alert('Thanks for shopping.');
    this.makePurchase(user, store, productPrice, productID)
    //TODO make front end change
    $('#' + productID.replace(/\s/g, '') + '-buy').text('Purchased');
  },
}


$(window).on('load', function () {
  App.init();
});