// Gitarrkungen
// ------------
// Script som används på samtliga sidor

// Hämta data från localStorage om data finns i cart, annars skapa tom array.
let cart = JSON.parse(localStorage.getItem('cart')) || [];

$(document).ready(function() {

  // Selektorer
  const $cartQty = $('#cart-qty');

  // Uppdatera siffran vid cart
  cartQty($cartQty); 
  
}); // ready

// Funktion för att lägga till produkter
function addProduct(){
  // Letar efter parent (med attributet data-id), och hämtar värdet från data-id och omvandlar värdet till Number
  const id = parseInt($(this).parents('[data-id]').attr('data-id'));  
  // Iterera över cart
  for (let i=0; i<=cart.length; i++) {
    // Om cart innehåller nåt och produkt-id hittas i cart, öka kvantitet, avsluta loop
    if (cart.length && id === cart[i].id) { 
      cart[i].qty++;
      break;
    }
    // Om id inte hittas och vi har kommit till slutet av cart eller om cart är tom, lägg till produkten, avsluta loop
    else if (i === cart.length-1 || cart.length === 0) { 
      cart.push({id: id, qty : 1});            
      break;
    }
  }
  // Uppdatera localStorage
  localStorage.setItem('cart',JSON.stringify(cart));
  // UPPDATERA KVANTITETCIRKELN!
}

// Funktion för att bort produkt (om parameter anges, tas alla bort, annars plockas en bort från kvantiten)
function delProduct(all) {
  
}

// Funktion som itererar över cart och uppdaterar kvantitet i varukorg
function cartQty(cartQty) {
  let qty = 0;
  $.each(cart, i => qty += cart[i].qty);
  cartQty.text(qty);
}