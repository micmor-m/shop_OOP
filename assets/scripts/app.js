

//as OOP intead than create an event listener global
//we will work inside an object
const productList = {
  
  //list of products
  products: [
    {
      title: "A pillow",
      imageUrl:
        "https://www.publicdomainpictures.net/pictures/250000/t2/decorative-bed-pillows.jpg",
      price: "19.99",
      description: "A soft pillow!",
    },
    {
      title: "A carpet",
      imageUrl:
        "https://www.publicdomainpictures.net/pictures/120000/t2/achtergrond-1434298630JcU.jpg",
      price: "89.99",
      description: "A nice carpet!",
    },
  ],

  //render METHOD written in short-hand notation (instead than render: function () {...})
  render()
}