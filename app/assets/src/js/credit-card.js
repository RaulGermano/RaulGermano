$('#card-number').on('input.RG change', function() {
	let labels = $('.number .credit-card-digit');

	let defaultDigits = [
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*',
		'*'
	];

	let newDigits = $(this)
		.val()
		.split('');

	if (newDigits[0] == 4) {
		console.log('Visa card');
	} else if (newDigits[0] == 5 && newDigits[1] <= 5) {
		console.log('MasterCard card');
	} else if (
		(newDigits[0] == 6 && newDigits[1] == 5) ||
		(newDigits[0] == 6 &&
			newDigits[1] == 0 &&
			newDigits[2] == 1 &&
			newDigits[3] == 1)
	) {
		console.log('ELO card');
	} else {
		console.log('Nothing was found');
	}

	// if (1 === 1) {
	// 	console.log({
	// 		Visa: '4',
	// 		MasterCard: '51',
	// 		MasterCard: '52',
	// 		MasterCard: '53',
	// 		MasterCard: '54',
	// 		MasterCard: '55',
	// 		ELO: '6011',
	// 		ELO: '65'
	// 	});
	// }

	let allDigits = newDigits.concat(defaultDigits);

	labels.each(function(i, field) {
		for (let j = 0; j < allDigits.length; j++) {
			const element = $(field)[j];
			$(element).html(allDigits[i]);
		}
	});
});

$('#card-owner').on('input.RG change', function() {
	let ownerName = $(this)
		.val()
		.toUpperCase();

	$('.credit-card-box .card-owner div').html(ownerName);

	$('.ccv span')
		.first()
		.html(ownerName);
});

$('#card-expiration-month').change(function() {
	month = $('#card-expiration-month option').index(
		$('#card-expiration-month option:selected')
	);

	month = month < 10 ? '0' + month : month;

	$('.card-expiration-date div span')
		.first()
		.html(month);
});

$('#card-expiration-year').change(function() {
	year = $('#card-expiration-year')
		.val()
		.substr(2, 2);

	$('.card-expiration-date div span')
		.last()
		.html(year);
});

$('#card-ccv')
	.on('focus', function() {
		$('.credit-card-box').addClass('hover');
	})
	.on('blur', function() {
		$('.credit-card-box').removeClass('hover');
	})
	.on('input change', function() {
		let ccv = $(this).val();

		ccv = `${ccv}***`.slice(0, 3);

		$('.ccv span')
			.last()
			.html(ccv);
	});

// $('.credit-card-box').addClass('hover');

// setTimeout(function() {
// 	$('#card-ccv')
// 		.focus()
// 		.delay(1000)
// 		.queue(function() {
// 			$(this)
// 				.blur()
// 				.dequeue();
// 		});
// }, 500);
