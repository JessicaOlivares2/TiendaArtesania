document.addEventListener("DOMContentLoaded", function () {
  // Datos de productos
  const allProducts = [
    { id: "1", name: "Bolsa Artesanal",parrafo:"Bolsa Artesanal hecho a mano con cuero y diseño de flores", price: "$25.99", image: "./public/bolso.png", category: "Accesorios" },
    { id: "2", name: "Collar Étnico",parrafo:"Diseño único y colorido para añadir un toque bohemio a tu look.", price: "$19.99", image: "./public/collar.png", category: "Joyería" },
    { id: "3", name: "Pulsera Trenzada",parrafo:"Elegante y cómoda, ideal para un estilo relajado." ,price: "$12.99", image: "./public/pulsera.png", category: "Joyería" },
    { id: "4", name: "Aretes Bohemios",parrafo:"Complemento ligero y llamativo para resaltar tu estilo.", price: "$15.99", image: "./public/aretes.png", category: "Joyería" },
    { id: "5", name: "Cojín Bordado",parrafo:"Toque artesanal para tu hogar, suave y decorativo.", price: "$29.99", image: "./public/cojin.png", category: "Hogar" },
    { id: "6", name: "Tapiz Decorativo",parrafo:"Crea un ambiente acogedor y lleno de personalidad en tu espacio.", price: "$39.99", image: "./public/tapiz.png", category: "Hogar" },
  ];

  // Elementos del DOM
  const categoryButton = document.getElementById("categoryButton");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = document.getElementById("currentCategory");
  const productsGrid = document.getElementById("productsGrid");
  const noProducts = document.getElementById("noProducts");
  const cartCount = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-icon");

  // Estado actual
  let activeCategory = null;
  let cart = [];

  // Función para mostrar/ocultar el menú desplegable
  function toggleDropdown(event) {
    event.stopPropagation();
    categoryDropdown.classList.toggle("show");
    categoryButton.classList.toggle("active");
  }

  // Función para filtrar productos por categoría
  function filterProducts(category) {
    activeCategory = category === "Todas" ? null : category;
    const filteredProducts = category === "Todas" 
      ? allProducts 
      : allProducts.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
    selectedCategory.textContent = category === "Todas" ? "Todos los productos" : `Productos en ${category}`;
  }

  // Función para generar las tarjetas de producto
  function generateProductCard(product) {
    return `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}'">
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p>${product.parrafo}</p>
          <p class="product-price">${product.price}</p>
          <button class="add-to-cart-btn" data-product-id="${product.id}">Agregar al carrito</button>
        </div>
      </div>
    `;
  }

  // Función para mostrar los productos
  function displayProducts(products) {
    productsGrid.innerHTML = "";
    if (products.length === 0) {
      noProducts.classList.remove("hidden");
    } else {
      noProducts.classList.add("hidden");
      products.forEach(product => {
        productsGrid.innerHTML += generateProductCard(product);
      });
    }

    // Añadir listeners a los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const productToAdd = allProducts.find(product => product.id === productId);
        if (productToAdd) {
          addToCart(productToAdd);
        }
      });
    });
  }

  // Función para manejar el evento de "Agregar al carrito"
  function addToCart(product) {
    cart.push(product);
    updateCartCount();
  }

  // Función para actualizar el contador del carrito
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  // Inicializar la página
  displayProducts(allProducts);

  // Event listeners
  categoryButton.addEventListener("click", toggleDropdown);

  categoryDropdown.addEventListener("click", (event) => {
    if (event.target.classList.contains("category-option")) {
      const category = event.target.dataset.category;
      filterProducts(category);
      toggleDropdown(event);
    }
  });

  // Cart modal
  cartIcon.addEventListener("click", () => {
    renderCartModal();
    document.getElementById("cartModal").classList.toggle("hidden");
  });

  function renderCartModal() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>El carrito está vacío.</p>';
      cartTotal.textContent = '';
      checkoutButton.style.display = 'none';
      return;
    }

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `<strong>${item.name}</strong> - ${item.price}`;
      cartItems.appendChild(itemDiv);
      total += parseFloat(item.price.replace('$', '').replace(',', '.'));
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutButton.style.display = 'block';
  }

  // Botón comprar
  const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.addEventListener('click', () => {
    alert('¡Gracias por tu compra! (Simulado)');
    cart.length = 0;
    updateCartCount();
    document.getElementById('cartModal').classList.add('hidden');
  });
});
