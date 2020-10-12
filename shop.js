let shoppingCart = [];
let cartTotal = 0;
let cartIsEmpty = true;
let cartNumbers = 0;
		
		let shopItems = [
			{
				"name" : "Shirt",
				"price" : 300,
				"image" : "shirt.svg"
			},
			{
				"name" : "Suit",
				"price" : 1300,
				"image" : "suit.svg"
			},
			{
				"name" : "Pants",
				"price" : 400,
				"image" : "pants.svg"
			},
			{
				"name" : "Jacket",
				"price" : 700,
				"image" : "jacket.svg"
			}
		];

		function DisplayProducts(){
			let products = "";
			for (let i = 0; i < shopItems.length; i++){
				products += `<div id=${i} name='${shopItems[i].name}' value='${shopItems[i].price}' class= 'productItem'>
								<img class='productImage' src='images/${shopItems[i].image}' />
								<h2>${shopItems[i].name}</h2>
								<p>R${shopItems[i].price}</p>
								<button onclick='AddToCart(this.parentNode)' class='addToCartButton'>add to cart</button>
							 </div>`
			}
			document.getElementById("Products").innerHTML = products;
		}

		DisplayProducts();

		function AddToCart(item){

			console.log("Adding to cart")
			let added = false;
			let cartEntries = shoppingCart.entries();
			for (n of cartEntries){
				//if object in cart array has an object with the name equal to the name of the item passed into this function:
				if (n[1].name === item.getAttribute('name')){
					//get the position of the existing item in the array
					let position = n[0]
					let newQuantity = n[1].quantity + 1;
					let newTotal = newQuantity * n[1].price;
					//change that item's quantity attribute
					shoppingCart[position] = {"name" : n[1].name, "price" : n[1].price, "quantity": newQuantity, "total" : newTotal};
					added = true;
				}
			}
			if (added === false){
				let newItem = {"name" : item.getAttribute('name'), "price" : item.getAttribute('value'), "quantity" : 1, "total" : item.getAttribute('value')};
				shoppingCart.push(newItem);
			}

			UpdateCart();

			
		};

		function UpdateCart(){
			UpdateCost();
			UpdateCartNumbers();
			document.getElementById("ShoppingCart").innerHTML = "";

			if (shoppingCart.length > 0){
				cartIsEmpty = false;
				document.getElementById("CartNotification").innerHTML = `${cartNumbers}`;
				document.getElementById("CartNotification").style.display = "block";
				document.getElementById("circle").style.display = "block";
			}
			else{
				cartIsEmpty = true;
				document.getElementById("CartNotification").style.display = "none";
				document.getElementById("circle").style.display = "none";
			}

			document.getElementById("ShoppingCart").innerHTML += `<h1>Your Cart</h1><ul>`;
			for (let i = 0; i < shoppingCart.length; i++){
				document.getElementById("ShoppingCart").innerHTML += `<li position='${i}'>
																			<h3>${shoppingCart[i].quantity}</h3>
																			<h3>${shoppingCart[i].name}</h3>
																			<h3>R${shoppingCart[i].total}</h3> 
																			<div class='CartButtons'>
																				<img class='cartIcon' onclick='IncreaseQuantity(this.parentNode.parentNode)' src='images/plus.svg' /> 
																				<img class='cartIcon' onclick='DecreaseQuantity(this.parentNode.parentNode)' src='images/minus.svg' /> 
																				<img class='cartIcon' onclick='RemoveFromCart(this.parentNode.parentNode)' src='images/cancel.svg' />
																			</div>
																	  </li>`;
			}
			document.getElementById("ShoppingCart").innerHTML += `</ul>`;
			document.getElementById("ShoppingCart").innerHTML += `<h2>Total: R ${cartTotal}</h2>`;

		}

		function UpdateCost(){
			//clear current total then recalculate when updating
			cartTotal = 0;
			let cartEntries = shoppingCart.entries();
			for (n of cartEntries){
				cartTotal = Number(cartTotal) + Number(n[1].total);
			}
		}


		function UpdateCartNumbers(){
			//clear current total then recalculate when updating
			cartNumbers = 0;
			let cartEntries = shoppingCart.entries();
			for (n of cartEntries){
				cartNumbers = Number(cartNumbers) + Number(n[1].quantity);
			}
		}


		function RemoveFromCart(item){
			let itemPosition = item.getAttribute('position');
			shoppingCart.splice(itemPosition, 1);
			UpdateCart();
		}

		function IncreaseQuantity(item){
			let itemPosition = item.getAttribute('position');
			let itemPrice = shoppingCart[itemPosition].price;
			let newQuantity = shoppingCart[itemPosition].quantity + 1;
			let newTotal = itemPrice * newQuantity;

			//increase quantity of items
			shoppingCart[itemPosition].quantity = newQuantity;
			//increase total owed for items
			shoppingCart[itemPosition].total = newTotal;

			UpdateCart();
		}

		function DecreaseQuantity(item){
			let itemPosition = item.getAttribute('position');
			//if quantity is more than 1
			if (shoppingCart[itemPosition].quantity > 1){
			let itemPrice = shoppingCart[itemPosition].price;
			let newQuantity = shoppingCart[itemPosition].quantity - 1;
			let newTotal = itemPrice * newQuantity;
			//increase quantity of items
			shoppingCart[itemPosition].quantity = newQuantity;
			//increase total owed for items
			shoppingCart[itemPosition].total = newTotal;
			}
			else{
				shoppingCart.splice(itemPosition, 1);
			}
			UpdateCart();
			
		}


		function ToggleCart(){
			let cart = document.getElementById("ShoppingCart");
			if (cart.style.display === "block"){
				cart.style.display = "none";
			}
			else{
				cart.style.display = "block";
			}
		}