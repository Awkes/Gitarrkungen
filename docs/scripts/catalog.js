// Gitarrkungen
// ------------
// Script som används enbart för katalogsidan 

$(document).ready(function () {

  // Selektorer och Eventlisteners
  const $products = $('#products');
  $products.on('click', 'button', addProduct);

  // Läs in och lista produkter
  // 1. Hämta JSON-data (Objekt)
  $.getJSON('products.json', data => {
    let html = '';
    // 2. Loopa igenom objektet med kategorier och lägg till formaterat kategorinamn
    $.each(data, (cat, prods) => {
      html += `<h2>${cat}</h2><hr>`;
      // 2.2 Loopa igenom arrayen med produkt-objekt och lägg till varje produkt
      $.each(prods, (i, prod) => {
        html += `
           <div class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-3 p-3 align-self-center">
                  <img src="${prod.url}" class="card-img border border-secondary" alt="${prod.product}">
                </div>
                <div class="col-md-9">
                  <div class="card-body d-flex flex-column" style="height: 100%;">
                    <h3 class="card-title">${prod.product}</h3>
                    <p class="card-text">
                      ${prod.description}
                    </p>
                    <div class="d-flex align-items-center justify-content-between row no-gutters mt-auto">
                      <p class="card-text font-weight-bold text-xl-left col-md-8 mb-0">${prod.price} kr</p>
                      <button data-id="${prod.id}" class="btn btn-primary col-md-4">Lägg i kundvagn</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
      });
    });
    // 3. Skriv ut produkterna på sidan
    $products.html(html);
  });

}); // ready