// Gitarrkungen
// ------------
// Script som används för confirmation-sidan.

$(document).ready(function () {
	// Kontrollera att varukorgen inte är tom och att formuläret är ifyllt
	if (localStorage.getItem('cart') && localStorage.getItem('customer')) {
		// Hämtar och skriver ut beställaren
		let customer = JSON.parse(localStorage.getItem('customer'));
		$('#conf-name').text(customer.name);
		$('#conf-address').text(customer.address);
		$('#conf-zipcode').text(customer.zipcode);
		$('#conf-city').text(customer.city);
		$('#conf-email').text(customer.email);
		$('#conf-phone').text(customer.phone);
		// Läs in och lista varukorgen
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
											<td class="align-middle text-center">${obj.qty}</td>
											<td class="align-middle text-right">${obj.qty * prod.price}&nbsp;kr</td>
										</tr>
									`;
								sum += (obj.qty * prod.price);
							}
						});
					});
					// Om vi har nåt sista produktindex i varukorgen, uppdatera DOM med varukorgens innehåll och totalsumma
					if (i === (cart.length - 1)) {
						$('#cart').html(html);
						$('#cart-sum').text(sum);
					}
				});
			});
		}
		// Visa bekräftelse
		$('#confirm').removeClass('d-none');
		// Rensa localStorage
		localStorage.removeItem('cart');
		localStorage.removeItem('customer');
	}
	else {
		// Visa felmeddelande
		$('#conf-error').removeClass('d-none');
	}

}); // ready