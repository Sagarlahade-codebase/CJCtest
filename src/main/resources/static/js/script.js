const API_URL = "http://localhost:8080/products"; 

async function fetchProducts(cmpr) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderProducts(data,cmpr);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products, cmpr) {
	
	products.sort
		( (p1,p2) => {
		
		    if(p1.price>p2.price){
		        return -1;
		    }
		
		    if(p1.price<p2.price){
		        return +1;
		    }
		
		    return 0;
		});	
	
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; 

  products.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <button onclick="updateProduct(${product.id})">Update</button>
        <button onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

async function addProduct() {
  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");

  const productData = {
    name: nameInput.value,
    price: parseFloat(priceInput.value),
  };

  if (!productData.name || !productData.price) {
    alert("Please provide a valid name and price.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      fetchProducts();
      nameInput.value = "";
      priceInput.value = "";
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();
    } else {
      alert("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

async function updateProduct(productId) {
  const newName = prompt("Enter new product name:");
  const newPrice = prompt("Enter new product price:");

  if (!newName || !newPrice) {
    alert("Please enter valid details.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        price: parseFloat(newPrice),
      }),
    });

    if (response.ok) {
      fetchProducts();
    } else {
      alert("Failed to update product");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
}


document.addEventListener("DOMContentLoaded", fetchProducts);


function filterProduct( ){
	fetchProducts();
	const button = document.getElementById("sortAsn");
	const idb = button.getAttribute('id');
	if(idb=='sortAsn'){
		
			fetchProducts((p1,p2) => {
		
		    if(p1.price>p2.price){
		        return -1;
		    }
		
		    if(p1.price<p2.price){
		        return +1;
		    }
		
		    return 0;
		});

	}
	
	
	
	
}


