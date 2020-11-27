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
  //that allow to assignnew values at each key
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  item = [];

  addProduct(product) {
    this.item.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log("Adding product to cart");
    console.log(this.product);
    //here I use a static method to share data between different classes
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" ></img>
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
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
  ];

  constructor() {}

  render() {
    //2 create the element to insert
    const prodList = document.createElement("ul");
    //3 add style class to new element
    prodList.className = "products-list";

    //4 create the logic to render a single product in the list
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    //1 create a reference to the area where I want add the data
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();

    // const cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const productListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(productListEl);
  }
}

//create a static class to be able to pass data between two instance
class App {
  //declare explicitly static card to highlight it's scope
  static card;

  static init() {
    const shop = new Shop();
    //IMPORTANT: before to be able to acces card
    //the class shop has to be render because inside it it's created the card
    shop.render();
    //shop.card is an instance of Shopping card
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    //I can call the method .addProduct because this.card is an instance of Shopping card
    //and the method .addProduct belong to that class
    //in this way I forward the data product to the instance shoppingCard
    this.cart.addProduct(product);
  }
}

//call the class App inself not an instance
App.init();
