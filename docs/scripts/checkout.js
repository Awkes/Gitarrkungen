// Gitarrkungen
// ------------
// Script som används för checkout-sidan.

$(document).ready(function () {

  // Selektorer och Eventlisteners  
  const $cart = $('#cart');
  const $cartSum = $('#cart-sum');
  $cart.on('click', '.add-product', addProduct);
  $cart.on('click', '.sub-product', subProduct);
  $cart.on('click', '.del-product', delProduct);
  $cart.on('click', '.add-product, .sub-product, .del-product', updateCart);
  $('#empty-cart').click(() => {
    if (confirm('Är du säker på att du vill tömma varukorgen?')) {
      cart = [];
      localStorage.removeItem('cart');
      updateCart();
    }
  });

  // Läs in och lista varukorgen
  function updateCart() {
    let html = '';
    let sum = 0;
    // Om vi har något i varukorgen
    if (cart.length) {
      // Loopa igenom varukorgen
      $.each(cart, (i, obj) => {
        // Hämta produkten ur products.json
        $.getJSON('products.json', data => {
          // Loopa igenom kategorier
          $.each(data, (cat, prods) => {
            // Loopa igenom produkter
            $.each(prods, (i, prod) => {
              // Kontrollera om produkten finns i varukorgen och lägg till den, samt uppdatera totalsumma
              if (prod.id === obj.id) {                        
                html += `
                  <tr> 
                    <td class="align-middle"><img src="${prod.url}" alt="${prod.product}" class="border border-secondary" style="width: 50px"></th>
                    <td class="align-middle">${prod.product}</td>
                    <td class="align-middle">
                      <div class="row justify-content-center">
                        <button class="sub-product btn btn-sm btn-primary" data-id="${prod.id}">-</button>
                        <input type="number" min="1" max="10" value="${obj.qty}" disabled class="form-control form-control-sm text-center qty-prod">
                        <button class="add-product btn btn-sm btn-primary" data-id="${prod.id}">+</button>
                      </div>
                    </td>
                    <td class="align-middle text-right">${obj.qty * prod.price}&nbsp;kr</td>
                    <td class="align-middle text-right">
                      <button class="del-product btn btn-sm btn-danger" data-id="${prod.id}">&times;</button>
                    </td>
                  </tr>
                `;
                sum += (obj.qty * prod.price);
              }
            });
          });
          // Om vi har nåt sista produktindex i varukorgen, uppdatera DOM med varukorgens innehåll och totalsumma
          if (i === (cart.length-1)) { 
            $cart.html(html);
            $cartSum.text(sum);
          }
        });
      });
    }
    // Annars skriv ut en tom varukorg
    else {
      $cart.html('<tr><td></td><td class="align-middle text-center" colspan="4">Din varukorg är tom.</td></tr>');
      $cartSum.text('0');
    }
  }
  updateCart();

}); // ready

