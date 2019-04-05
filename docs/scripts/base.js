// Gitarrkungen
// ------------
// Script som används på samtliga sidor

// Hämta data från localStorage om data finns i cart, annars skapa tom array.
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// $cartQty deklareras globalt, för att vara tillgänglig utanför jQuery-blocket
let $cartQty;

$(document).ready(function () {

  // Uppdaterar $cartQry med en selector
  $cartQty = $('#cart-qty');

  // Uppdatera siffran vid cart
  cartQty();

}); // ready

// Funktion för att lägga till produkter
function addProduct() {
  // Tar attributet data-id från knappen som triggat funktionen och omvandlar värdet till Number
  const id = parseInt($(this).attr('data-id'));
  // Iterera över cart
  for (let i = 0; i <= cart.length; i++) {
    // Om cart innehåller nåt och produkt-id hittas i cart, öka kvantitet, avsluta loop
    if (cart.length && id === cart[i].id) {
      cart[i].qty++;
      break;
    }
    // Om id inte hittas och vi har kommit till slutet av cart eller om cart är tom, lägg till produkten, avsluta loop
    else if (i === cart.length - 1 || cart.length === 0) {
      cart.push({ id: id, qty: 1 });
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
  // Uppdatera kvantitet i varukorg
  cartQty();
  // Uppdatera varukorgen om funktionen är tillgänglig (finns bara i checkout.js)
  if (typeof updateCart == 'function') { updateCart(); }
}

// Funktion för att minska kvantitet på en produkt i varukorgen
function subProduct() {
  // Tar attributet data-id från knappen som triggat funktionen och omvandlar värdet till Number
  const id = parseInt($(this).attr('data-id'));
  // Iterera över cart
  for (let i = 0; i <= cart.length; i++) {
    // Om id matchar id i cart...
    if (id === cart[i].id) {
      // ... och kvantitet > 1: minska kvantitet
      if (cart[i].qty > 1) {
        cart[i].qty--;
      }
      // ... annars: ta bort produkten helt
      else {
        if (confirm('Är du säker på att du vill ta bort produkten helt?')) {
          cart.splice(i, 1);
        }
      }
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
  // Uppdatera varukorgen om funktionen är tillgänglig (finns bara i checkout.js)
  if (typeof updateCart == 'function') { updateCart(); }
}

// Funktion för att bort en produkt helt från varukorgen
function delProduct() {
  // Tar attributet data-id från knappen som triggat funktionen och omvandlar värdet till Number
  const id = parseInt($(this).attr('data-id'));
  // Iterera över cart
  for (let i = 0; i <= cart.length; i++) {
    // Om id matchar id i cart...
    if (id === cart[i].id) {
      if (confirm('Är du säker på att du vill ta bort produkten helt?')) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart)); // Uppdatera localStorage
  // Uppdatera varukorgen om funktionen är tillgänglig (finns bara i checkout.js)
  if (typeof updateCart == 'function') { updateCart(); }
}

// Funktion som itererar över cart och uppdaterar kvantitet i varukorg
function cartQty() {
  let qty = 0;
  $.each(cart, i => qty += cart[i].qty);
  $cartQty.text(qty);
}