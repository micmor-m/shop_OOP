//create class
//first letter of each word in the name have to be capital
//assignment of a key dne with = not :
//at the end of each row ; not ,
class Product {
  title = "DEFAULT";
  imageUrl;
  price;
  description;

  //special metod execute everytime a new object is created
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

//as OOP intead than create an event listener global
//we will work inside an object
const productList = {
  //list of products
  products: [
    //call the Class Product
    new Product(
      "A pillow",
      "https://www.publicdomainpictures.net/pictures/250000/velka/decorative-bed-pillows.jpg",
      "A soft pillow!",
      "19.99"
    ),
    new Product(
      "A carpet",
      "https://www.publicdomainpictures.net/pictures/60000/velka/carpet-background.jpg",
      "A nice carpet!",
      "89.99"
    ),
  ],

  //render METHOD written in short-hand notation (instead than render: function () {...})
  render() {
    //1 create a referent to the area where I want add the data
    const renderHook = document.getElementById("app");
    //2 create the element to insert
    const prodList = document.createElement("ul");
    //3 add style class to new element
    prodList.className = "products-list";

    //4 create the logic to render a single product in the list
    for (const product of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
      <div>
        <img src="${product.imageUrl}" alt="${product.title}" ></img>
        <div class="product-item__content">
          <h2>${product.title}</h2>
          <h3>\$${product.price}</h3>
          <p>${product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
