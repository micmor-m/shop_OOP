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

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  item = [];

  set cardItems(value) {
    this.item = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.item.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updateItem = [...this.item];
    updateItem.push(product);
    this.cardItems = updateItem;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order now!</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    console.log("Adding product to cart");
    console.log(this.product);
    //here I use a static method to share data between different classes
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
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
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  //to simulate the gathering of the data from a database
  fetchProducts() {
    this.products = [
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
    //This makes sure that the render will be call when all products are present
    this.renderProducts();
  }

  renderProducts() {
    //2 create the element to insert
    //3 add style class to new element
    //4 create the logic to render a single product in the list
    for (const product of this.products) {
      new ProductItem(product, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "products-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    //to make ure all data have been loaded from the database
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop extends Component {
  constructor() {
    super();
  }

  render() {
    //1 create a reference to the area where I want add the data
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

//create a static class to be able to pass data between two instance
class App {
  //declare explicitly static card to highlight it's scope
  static cart;

  static init() {
    const shop = new Shop();
    //IMPORTANT: before to be able to acces card
    //the class shop has to be render because inside it it's created the card
    // shop.render();
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
