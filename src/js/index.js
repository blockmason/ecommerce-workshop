

App = {
  // this will be replaced
  store: [
    {
      "id": "greatwall",
      "companyName": "Blockmason",
      "name": "Black Desk",
      "picture": "https://www.randomlists.com/img/things/desk.webp",
      "description": "A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as a computer.",
      "amount": 32,
      "price": 154
    },
    {
      "id": "petra",
      "companyName": "Blockmason",
      "name": "50 Inch Television",
      "picture": "https://www.randomlists.com/img/things/television.webp",
      "description": "A television (also known as a TV) is a machine with a screen. Televisions receive broadcasting signals and turn them into pictures and sound. The word 'television' comes from the words tele (Greek for far away) and vision (sight). Sometimes a television can look like a box.",
      "amount": 12,
      "price": 400
    },
    {
      "id": "christ",
      "companyName": "Blockmason",
      "name": "Silk Bow Tie",
      "picture": "https://www.randomlists.com/img/things/bow.webp",
      "description": "The bow tie /boʊ/ is a type of necktie. A modern bow tie is tied using a common shoelace knot, which is also called the bow knot for that reason. It consists of a ribbon of fabric tied around the collar of a shirt in a symmetrical manner so that the two opposite ends form loops.",
      "amount": 22,
      "price": 10
    },
    {
      "id": "machupicchu",
      "companyName": "Blockmason",
      "name": "Leather Checkbook",
      "picture": "https://www.randomlists.com/img/things/checkbook.webp",
      "description": "A checkbook is a folder or small book containing preprinted paper instruments issued to checking account holders and used to pay for goods or services. A checkbook contains sequentially numbered checks that account holders can use as a bill of exchange.",
      "amount": 12,
      "price": 18
    },
    {
      "id": "chichenitza",
      "companyName": "Blockmason",
      "name": "Pillow",
      "picture": "https://www.randomlists.com/img/things/pillow.webp",
      "description": "A pillow is a support of the body at rest for comfort, therapy, or decoration. Pillows are used by many species, including humans.",
      "amount": 12,
      "price": 6
    },
    {
      "id": "colosseum",
      "companyName": "Blockmason",
      "name": "Velvet Couch",
      "picture": "https://www.randomlists.com/img/things/sofa.webp",
      "description": "A couch is a sofa — an upholstered piece of furniture that seats more than one person. It's nice to have a couch that's big enough for your whole family to sit on while you watch TV.",
      "amount": 1,
      "price": 290
    },
    {
      "id": "tajmahal",
      "companyName": "Blockmason",
      "name": "Head & Shoulders Shampoo",
      "picture": "https://www.randomlists.com/img/things/shampoo.webp",
      "description": "Clean & Balanced Anti Dandruff Shampoo from Head & Shoulders gives you soft, manageable, great-looking hair. Fights dry scalp and leave hair clean & fresh.",
      "amount": 42,
      "price": 5
    }
  ],
  walletMapping: {
    'Drake': '0x9a10e85924da9fe6a12a1a30d3d07e415f2ac823'.toLowerCase(),
    'Bianca': '0xc1b63e1bb4aedfbce9cf44316e7738f086d33219'.toLowerCase(),
    'Harish': '0x83fe96cdd189e4f3c965f37309e1597a8e76aae2'.toLowerCase()
  },
  init: function () {
    this.printProducts()
  },
  createProduct: function (product) {
    $("#template-object").clone().prependTo("#product-area").attr("id", product.id).removeClass("is-hidden");
    $('#' + product.id).find('.product-name').text(product.name);
    $('#' + product.id).find('.company-name').text(product.companyName);
    $('#' + product.id).find('.product-description').text(product.description);
    $('#' + product.id).find('.product-amount').text(product.amount);
    $('#' + product.id).find('.comment-area').attr('id', product.id + '-comment-area');
    $('#' + product.id).find(".post-comment").attr('id', product.id + '-comment');
    $('#' + product.id).find(".product-image").attr("src", product.picture);
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
    newProductID = newProductName.replace(/\s/g, '');
    newProduct = { name: newProductName, id: newProductID, picture: newProductImage, description: newProductDescription, companyName: newProductCompany, amount: newProductAmount }
    this.createProduct(newProduct);
  },
  storeNewComment: function(commentText) {
    console.log('Recording to the blockchain...');
    console.log('Done.');
  },
  postComment: function(commentID){
    let commentText = $('#' + commentID + '-area').val();
    console.log(commentID);
    this.createComment(commentText);
    this.storeNewComment(commentText);
  },
  createComment: function(comment){
    
  },
  currentUser: function () {
    return $('#login-input').val();
  },
  currentUserWallet: function() {
    return walletMapping[this.currentUser];
  }
}


$(window).on('load', function () { 
  App.init(); 
  $(".post-comment").click(function(){
    App.postComment($('#' + this.id).closest(".column").attr('id'));
  })
});