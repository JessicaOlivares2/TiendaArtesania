document.addEventListener("DOMContentLoaded", function () {
  // Datos de productos
  const allProducts = [
    {
      id: "1",
      name: "Bolsa Artesanal",
      price: "$25.99",
      image: "./public/bolso.png",
      category: "Accesorios",
    },
    {
      id: "2",
      name: "Collar Étnico",
      price: "$19.99",
      image: "./public/collar.png",
      category: "Joyería",
    },
    {
      id: "3",
      name: "Pulsera Trenzada",
      price: "$12.99",
      image: "./public/pulsera.png",
      category: "Joyería",
    },
    {
      id: "4",
      name: "Aretes Bohemios",
      price: "$15.99",
      image: "./public/aretes.png",
      category: "Joyería",
    },
    {
      id: "5",
      name: "Cojín Bordado",
      price: "$29.99",
      image: "./public/cojin.png",
      category: "Hogar",
    },
    {
      id: "6",
      name: "Tapiz Decorativo",
      price: "$39.99",
      image: "./public/tapiz.png",
      category: "Hogar",
    },
  ];

  // Elementos del DOM
  const categoryButton = document.getElementById("categoryButton");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const selectedCategory = document.getElementById("selectedCategory");
  const currentCategory = document.getElementById("currentCategory");
  const categoryInfo = document.getElementById("categoryInfo");
  const productsGrid = document.getElementById("productsGrid");
  const noProducts = document.getElementById("noProducts");
  const showAllButton = document.getElementById("showAllButton");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  // Estado actual
  let activeCategory = null;

  // Función para mostrar/ocultar el menú desplegable
  function toggleDropdown(event) {
    event.stopPropagation(); // Evitar que el clic se propague
    categoryDropdown.classList.toggle("show");
    categoryButton.classList.toggle("active");
  }

  // Función para filtrar productos por categoría
  function filterProducts(category) {
    // Actualizar estado
    activeCategory = category === "Todas" ? null : category;

    // Actualizar UI del selector
    selectedCategory.textContent = activeCategory || "CATEGORÍAS";

    // Actualizar información de categoría
    if (activeCategory) {
      currentCategory.textContent = activeCategory;
      categoryInfo.classList.remove("hidden");
    } else {
      categoryInfo.classList.add("hidden");
    }

    // Filtrar productos
    const filteredProducts = activeCategory
      ? allProducts.filter((product) => product.category === activeCategory)
      : allProducts;

    // Mostrar mensaje si no hay productos
    if (filteredProducts.length === 0) {
      productsGrid.classList.add("hidden");
      noProducts.classList.remove("hidden");
    } else {
      productsGrid.classList.remove("hidden");
      noProducts.classList.add("hidden");

      // Renderizar productos
      renderProducts(filteredProducts);
    }

    // Actualizar clase activa en las opciones
    const options = document.querySelectorAll(".category-option");
    options.forEach((option) => {
      const optionCategory = option.getAttribute("data-category");
      if (
        (optionCategory === "Todas" && !activeCategory) ||
        optionCategory === activeCategory
      ) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });

    // Cerrar el dropdown
    categoryDropdown.classList.remove("show");
    categoryButton.classList.remove("active");
  }

  // Función para renderizar productos
  function renderProducts(products) {
    productsGrid.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <a href="producto-detalle.html?id=${product.id}" class="product-link">Ver Detalles</a>
                </div>
            `;

      productsGrid.appendChild(productCard);
    });
  }

  // Inicializar la página
  function init() {
    // Renderizar todos los productos inicialmente
    renderProducts(allProducts);

    // Event Listeners
    if (categoryButton) {
      categoryButton.addEventListener("click", toggleDropdown);
    }

    // Event Listener para opciones de categoría
    const categoryOptions = document.querySelectorAll(".category-option");
    categoryOptions.forEach((option) => {
      option.addEventListener("click", function (event) {
        event.stopPropagation(); // Evitar que el clic se propague
        const category = this.getAttribute("data-category");
        filterProducts(category);
      });
    });

    // Event Listener para el botón "Ver todos los productos"
    if (showAllButton) {
      showAllButton.addEventListener("click", function () {
        filterProducts("Todas");
      });
    }

    // Event Listener para cerrar el dropdown al hacer clic en el documento
    document.addEventListener("click", function (event) {
      if (
        categoryDropdown.classList.contains("show") &&
        !categoryDropdown.contains(event.target) &&
        !categoryButton.contains(event.target)
      ) {
        categoryDropdown.classList.remove("show");
        categoryButton.classList.remove("active");
      }
    });

    // Toggle menú móvil
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        mobileNav.classList.toggle("show");

        // Cambiar icono del menú
        const isOpen = mobileNav.classList.contains("show");
        menuToggle.innerHTML = isOpen
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    }
  }

  // Iniciar la aplicación
  init();

  // Añadir console.log para depuración
  console.log("Script cargado correctamente");
  console.log("Elementos encontrados:", {
    categoryButton,
    categoryDropdown,
    categoryOptions: document.querySelectorAll(".category-option"),
    showAllButton,
  });
});
