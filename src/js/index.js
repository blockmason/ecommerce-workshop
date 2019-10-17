const paymentService = require('./payments-service.js');
const commentsService = require('./comments-service.js');
const purchaseService = require('./purchase-service.js');

App = {
  store: [],
  commentsInMemory: [],
  walletMapping: {
    'Drake': '0xc1b63e1bb4aedfbce9cf44316e7738f086d33219'.toLowerCase(),
    'Bianca': '0x83fe96cdd189e4f3c965f37309e1597a8e76aae2'.toLowerCase(),
    'Harish': '0xFeE9813A4B268793D4Edc6DF11A760C3c07a2c98'.toLowerCase(),
    'STORE': '0xe1c0f84e2cf7b16a56a58b839d21cdda79f55a44'.toLowerCase()
  },
  currentUser: function () {
    return $('#login-input').find('.input').val();
  },
  userWallet: function (user) {
    return this.walletMapping[user];
  },
  init: async function () {
    this.store = await purchaseService.getProducts();
    this.printProducts();
    this.printComments();
  },
  showProduct: function (product) {
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
      this.showProduct(this.store[i])
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
    this.clearProductModal();
    this.showProduct(newProduct);
    purchaseService.addProduct(newProductName, newProductAmount, newProductImage, newProductDescription, newProductPrice, newProductCompany, newProductID);
  },
  clearProductModal: function () {
    $('.modal').removeClass('is-active');
    $("#new-product-name").val('');
    $("#new-product-image").val('');
    $("#new-product-company").val('');
    $("#new-product-description").val('');
    $("#new-product-amount").val('');
    $("#new-product-price").val('');
  },
  storeNewComment: async function (commentText, ID) {
    const reqBody = {
      "asset": ID,
      "comment": commentText
    };
    this.addCommentsInMemory(reqBody);
    await commentsService.postComment(reqBody);
  },
  postComment: async function (commentID) {
    let commentTextElement = $('#' + commentID + '-comment-area');
    let commentText = commentTextElement.val().trim();
    if (commentText == '') return;
    this.showComment(commentText, commentID);
    commentTextElement.val('');
    await this.storeNewComment(commentText, commentID);
    this.readCommentsInMemory();
  },
  showComment: function (comment, commentID) {
    let commentTemplate = $('#' + commentID).find('.comment:first').clone().removeClass('is-hidden');
    commentTemplate.html('<article class="is-warning message"><div class="message-body">' + comment + ' — Verified Customer </div></article>');
    let lastComment = $('#' + commentID).find('.comment:last');
    commentTemplate.insertBefore(lastComment);
  },
  printComments: async function () {
    comments = await commentsService.getComments()
    comments.data.forEach((data) => {
      this.addCommentsInMemory(data)
    });
    let commentArray = this.readCommentsInMemory();
    for (i = 0; i <= commentArray.length; i++) {
      if (commentArray[i] != undefined) {
        this.showComment(commentArray[i].comment, commentArray[i].asset);
      }
    }
  },
  payForProduct: async function (buyer, seller, amount, productID) {
    await purchaseService.purchaseProduct(productID, buyer);
    await paymentService.transferFrom(buyer, seller, amount);
    $('#' + productID.replace(/\s/g, '') + '-buy').removeClass('is-loading');
    alert('Thanks for shopping');
    console.log('purchase complete');
  },
  purchase: async function (productPrice, productID) {
    user = this.userWallet(this.currentUser());
    if (user == NaN || user == undefined) {
      alert('Not logged in');
      return;
    }
    
    purchasersArray = await this.getWhoBoughtProduct(productID);
    if (purchasersArray.purchasers.includes(user)){
      alert("You already own this");
      return;
    }

    store = this.userWallet('STORE');
    amountInWallet = await paymentService.balanceOf(user);
    if (amountInWallet < productPrice) {
      alert("You Don't Have Enough Money");
      return;
    }
    $('#' + productID.replace(/\s/g, '') + '-buy').addClass('is-loading');
    this.payForProduct(user, store, productPrice, productID)
    $('#' + productID.replace(/\s/g, '') + '-buy').text('Purchased');
  },
  addCommentsInMemory: function (commentData) {
    this.commentsInMemory.push(commentData);
  },
  readCommentsInMemory: function () {
    return this.commentsInMemory;
  },
  getWhoBoughtProduct: async function (productID) {
    const purchasersArray = await purchaseService.getPurchasers(productID);
    console.log(purchasersArray, productID);
    return purchasersArray;
  }
}

$(window).on('load', function () {
  App.init();
});