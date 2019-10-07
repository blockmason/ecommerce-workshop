// Create a product card based on product information
function createProductCard(product){
    $("#template-object").clone().prependTo("#product-area").attr("id", product.id).removeClass("is-hidden");
    $('#' + product.id).find('.product-name').text(product.name);
    $('#' + product.id).find(".product-image").attr("src", product.picture);
}

// print all product cards in the store
function printProducts(){
    for(i = 0; i < store.length ; i++ ){
        createProductCard(store[i])
    }
}

function showModal(){
  console.log('modal');
}

store = [
    {
      "id": "greatwall",
      "name": "Black Desk",
      "picture": "https://www.randomlists.com/img/things/desk.webp",
      "description": "A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as a computer.",
      "price": 154
    },
    {
      "id": "petra",
      "name": "50 Inch Television",
      "picture": "https://www.randomlists.com/img/things/television.webp",
      "description": "A television (also known as a TV) is a machine with a screen. Televisions receive broadcasting signals and turn them into pictures and sound. The word 'television' comes from the words tele (Greek for far away) and vision (sight). Sometimes a television can look like a box.",
      "price": 400
    },
    {
      "id": "christ",
      "name": "Silk Bow Tie",
      "picture": "https://www.randomlists.com/img/things/bow.webp",
      "description": "The bow tie /boʊ/ is a type of necktie. A modern bow tie is tied using a common shoelace knot, which is also called the bow knot for that reason. It consists of a ribbon of fabric tied around the collar of a shirt in a symmetrical manner so that the two opposite ends form loops.",
      "price": 10
    },
    {
      "id": "machupicchu",
      "name": "Leather Checkbook",
      "picture": "https://www.randomlists.com/img/things/checkbook.webp",
      "description": "A checkbook is a folder or small book containing preprinted paper instruments issued to checking account holders and used to pay for goods or services. A checkbook contains sequentially numbered checks that account holders can use as a bill of exchange.",
      "price": 18
    },
    {
      "id": "chichenitza",
      "name": "Pillow",
      "picture": "https://www.randomlists.com/img/things/pillow.webp",
      "description": "A pillow is a support of the body at rest for comfort, therapy, or decoration. Pillows are used by many species, including humans.",
      "price": 6
    },
    {
      "id": "colosseum",
      "name": "Velvet Couch",
      "picture": "https://www.randomlists.com/img/things/sofa.webp",
      "description": "A couch is a sofa — an upholstered piece of furniture that seats more than one person. It's nice to have a couch that's big enough for your whole family to sit on while you watch TV.",
      "price": 290
    },
    {
      "id": "tajmahal",
      "name": "Head & Shoulders Shampoo",
      "picture": "https://www.randomlists.com/img/things/shampoo.webp",
      "description": "Clean & Balanced Anti Dandruff Shampoo from Head & Shoulders gives you soft, manageable, great-looking hair. Fights dry scalp and leave hair clean & fresh.",
      "price": 5
    }
  ];




$(function() {
    printProducts();
});