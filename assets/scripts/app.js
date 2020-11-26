//as OOP intead than create an event listener global
//we will work inside an object
const productList = {
  //list of products
  products: [
    {
      title: "A pillow",
      imageUrl:
        "https://www.publicdomainpictures.net/pictures/250000/velka/decorative-bed-pillows.jpg",
      price: "19.99",
      description: "A soft pillow!",
    },
    {
      title: "A carpet",
      imageUrl:
        "https://www.publicdomainpictures.net/pictures/60000/velka/carpet-background.jpg",
      price: "89.99",
      description: "A nice carpet!",
    },
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
