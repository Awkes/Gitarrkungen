// Gitarrkungen
// ------------
// Script som används för checkout-sidan.

let $cartSum; // Behöver vara tillgänglig utanför jQuery-blocket

$(document).ready(function () {
  // VARUKORG
  // Selektorer och Eventlisteners  
  const $cart = $('#cart');
  $cartSum = $('#cart-sum');
  $cart.on('click', '.add-product', addProduct);
  $cart.on('click', '.sub-product', subProduct);
  $cart.on('click', '.del-product', delProduct);

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
                    <td class="align-middle text-right"><span>${obj.qty * prod.price}</span>&nbsp;kr</td>
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
          if (i === (cart.length - 1)) {
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

  // BESTÄLLNINGSFORMULÄR
  // Selektorer och Eventlisteners

  const $orderForm = $('#order-form');
  const $inputName = $('#input-name');
  const $inputNameError = $('#input-name-error');
  const $inputEmail = $('#input-email');
  const $inputEmailError = $('#input-email-error');
  const $inputAddress = $('#input-address');
  const $inputAddressError = $('#input-address-error');
  const $inputZipcode = $('#input-zipcode');
  const $inputZipcodeError = $('#input-zipcode-error');
  const $inputCity = $('#input-city');
  const $inputCityError = $('#input-city-error');
  const $inputPhone = $('#input-phone');
  const $inputPhoneError = $('#input-phone-error');

  $inputName.on('keyup change', inputName);
  $inputEmail.on('keyup change', inputEmail);
  $inputAddress.on('keyup change', inputAddress);
  $inputZipcode.on('keyup change', inputZipcode);
  $inputCity.on('keyup change', inputCity);
  $inputPhone.on('keyup change', inputPhone);
  $orderForm.on('submit', sendOrder);

  // Flaggor för validering
  let validName = false;
  let validEmail = false;
  let validAddress = false;
  let validZipcode = false;
  let validCity = false;
  let validPhone = false;

  function inputName() {
    // Kontrollerar att namn enbart innehåller A-Ö, a-ö, minst två namn mellan 2-25 bokstäver.
    const re = /^[a-öA-Ö\-]{2,50}(?:\s([a-öA-Ö\s\-]){2,50})+$/;
    if (re.test($inputName.val())) {
      $inputNameError.hide(100);
      $inputName.css('background-color', '');
      validName = true;
    }
    else {
      $inputNameError.show(100);
      $inputName.css('background-color', '#f7dddc');
      validName = false;
    }
  }

  function inputEmail() {
    // Kontrollerar att email är korrekt angiven
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test($inputEmail.val())) {
      $inputEmailError.hide(100);
      $inputEmail.css('background-color', '');
      validEmail = true;
    }
    else {
      $inputEmailError.show(100);
      $inputEmail.css('background-color', '#f7dddc');
      validEmail = false;
    }
  }

  function inputAddress() {
    // Kontrollerar att adressen är korrekt angiven
    const re = /^([a-öA-Ö0-9]+(\s[a-öA-Ö0-9]*){0,1}){5,100}$/;
    if (re.test($inputAddress.val())) {
      $inputAddressError.hide(100);
      $inputAddress.css('background-color', '');
      validAddress = true;
    }
    else {
      $inputAddressError.show(100);
      $inputAddress.css('background-color', '#f7dddc');
      validAddress = false;
    }
  }

  function inputZipcode() {
    // Kontrollerar att postnummer är korrekt angivet (5 siffror)
    const re = /^[0-9]{5,5}$/;
    if (re.test($inputZipcode.val())) {
      $inputZipcodeError.hide(100);
      $inputZipcode.css('background-color', '');
      validZipcode = true;
    }
    else {
      $inputZipcodeError.show(100);
      $inputZipcode.css('background-color', '#f7dddc');
      validZipcode = false;
    }
  }

  function inputCity() {
    // Kontrollerar att adressen är korrekt angiven
    const re = /^([a-öA-Ö]+(\s[a-öA-Ö]*){0,1}){2,50}$/;
    if (re.test($inputCity.val())) {
      $inputCityError.hide(100);
      $inputCity.css('background-color', '');
      validCity = true;
    }
    else {
      $inputCityError.show(100);
      $inputCity.css('background-color', '#f7dddc');
      validCity = false;
    }
  }

  function inputPhone() {
    // Kontrollerar att postnummer är korrekt angivet (5 siffror)
    const re = /^[0-9]{7,12}$/;
    if (re.test($inputPhone.val())) {
      $inputPhoneError.hide(100);
      $inputPhone.css('background-color', '');
      validPhone = true;
    }
    else {
      $inputPhoneError.show(100);
      $inputPhone.css('background-color', '#f7dddc');
      validPhone = false;
    }
  }

  // Kontrollerar att alla fält är validerade och skickar isåfall beställningen och visar bekfräftelsen
  function sendOrder(e) {
    e.preventDefault();
    if (validName && validEmail && validAddress && validZipcode && validCity && validPhone) {
      // Skapar ett objekt innehållande beställarens uppgifter
      const customer = {
        name: $inputName.val(),
        email: $inputEmail.val(),
        address: $inputAddress.val(),
        zipcode: $inputZipcode.val(),
        city: $inputCity.val(),
        phone: $inputPhone.val()
      };
      // Sparar objektet i localStorage
      localStorage.setItem('customer', JSON.stringify(customer));
      location.href = 'confirmation.html';
    }
    else {
      alert('Du måste fylla i samtliga fält och rätta eventuella fel!')
    }
  }

}); // ready

// VARUKORG - FUNKTION SOM BEHÖVER LIGGA UTANFÖR jQuery-BLOCKET

// Funktion för att uppdatera en produkt i DOM (el = element, action = add/rem/del)
function updateItem(el, action) {
  // Hämta alla element som ska uppdateras
  const $row = $(el).parents('tr');
  const $qty = $row.find('input');
  const $price = $row.find('td span');

  let priceChange = 0;

  // Uppdatera antal
  // Lägg till
  if (action === 'add') {
    priceChange += ($price.text() / $qty.val()); // Plusaktor priset ska ändras med
    $qty.val(parseInt($qty.val()) + 1); // Öka på qty med 1
  }
  // Ta bort en
  else if (action === 'sub' && parseInt($qty.val()) > 1) {
    priceChange -= (parseInt($price.text()) / $qty.val()); // Minusfaktor priset ska ändras med
    $qty.val(parseInt($qty.val()) - 1); // Minska qty med 1
  }
  // Ta bort alla
  else if ((action === 'del') || (action === 'sub' && parseInt($qty.val()) <= 1)) {
    priceChange -= parseInt($price.text()); // Minusfaktor priset ska ändras med
    $row.remove();
  }
  // Uppdatera pris
  $price.text(parseInt($price.text()) + priceChange);
  // Uppdatera summa
  $cartSum.text(parseInt($cartSum.text()) + priceChange);
}