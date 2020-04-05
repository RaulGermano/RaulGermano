months = param => {
	for (let i = 0; i < 12; i++) {
		let month = i;

		month = `0${++month}`.substr(-2, 2);

		$(param).append(new Option(month, i));
	}
};

years = param => {
	let firstYear = new Date().getFullYear(),
		lastYear = firstYear + 7;

	for (firstYear; firstYear <= lastYear; firstYear++) {
		let newYear = firstYear;

		$(param).append(new Option(newYear, newYear));
	}
};

flagThemeChanger = object => {
	let { remove, add } = object;

	$('.front')
		.removeClass(remove)
		.addClass(add);

	$('.back')
		.removeClass(remove)
		.addClass(add);
};

characterLimiter = (field, quantity) => {
	$(field)
		.unbind('keyup change input paste')
		.bind('keyup change input paste', function(e) {
			let value = $(this).val(),
				valueLength = value.length;

			if (valueLength > quantity) {
				$(this).val(
					$(this)
						.val()
						.substring(0, quantity)
				);
			}
		});
};

justNumbers = (field, message) => {
	$(field).on('keypress', function(event) {
		if (
			event.which != 8 &&
			event.which != 0 &&
			(event.which < 48 || event.which > 57)
		) {
			$(this)
				.parent()
				.find('.just-number-message')
				.html(message)
				.show()
				.fadeOut(1500);
			return false;
		}
	});
};

function mask(field, mask) {
	$(field).mask(mask, {
		reverse: true
	});
}

months('#card-expiration-month');
years('#card-expiration-year');
characterLimiter('#card-owner', 20);
characterLimiter('#card-number', 16);
characterLimiter('#card-ccv', 3);
characterLimiter('#client-cpf', 14);
characterLimiter('#client-phone', 14);
characterLimiter('#client-address-zip-code', 9);
justNumbers('#card-number', 'Aqui não, velhinho');
justNumbers('#card-ccv', 'Aqui não, velhinho');
justNumbers('#client-phone', 'Aqui não, velhinho');
justNumbers('#client-cpf', 'Aqui não, velhinho');
justNumbers('#client-address-zip-code', 'Aqui não, velhinho');
justNumbers('#client-address-number', 'Aqui não, velhinho');
mask('#client-cpf', '000.000.000-00');
mask('#client-address-zip-code', '00000-000');
mask('#client-phone', '(00)00000-0000');

$(
	'#card-owner, #card-number, #card-expiration-month, #card-expiration-year, #card-ccv'
).on('input change', function() {
	let number = $('#card-number').val(),
		name = $('#card-owner').val(),
		month = $('#card-expiration-month').val(),
		year = $('#card-expiration-year').val(),
		ccv = $('#card-ccv').val(),
		flashValidation = $('.validation-credit-card-digits'),
		buttonSend = $('#button-send');

	number = number.split('');
	ccv = ccv.split('');

	if (
		number.length == 16 &&
		name.length > 0 &&
		month > 0 &&
		year > 0 &&
		ccv.length == 3 &&
		$(flashValidation).hasClass('text-success')
	) {
		$(buttonSend).prop('disabled', false);
	} else {
		$(buttonSend).prop('disabled', true);
	}
});

$('#card-number').on('input.RG change', function() {
	let labels = $('.number .credit-card-digit'),
		digitsFeedback = $('.validation-credit-card-digits'),
		masterCardFlag = $('#mastercard-flag'),
		visaFlag = $('#visa-flag'),
		eloFlag = $('#elo-flag');

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

	if ($(this).val().length == 0) {
		$(digitsFeedback)
			.removeClass('text-success text-danger')
			.html('');

		flagThemeChanger({
			remove: 'mastercard-flag elo-flag visa-flag',
			add: 'default-flag'
		});

		$(masterCardFlag).addClass('d-none');
		$(eloFlag).addClass('d-none');
		$(visaFlag).addClass('d-none');
	} else {
		if (newDigits[0] == 4) {
			$(digitsFeedback)
				.removeClass('text-danger')
				.addClass('text-success')
				.html('Aceitamos essa bandeira');

			flagThemeChanger({
				remove: 'mastercard-flag elo-flag default-flag',
				add: 'visa-flag'
			});

			$(masterCardFlag).addClass('d-none');
			$(eloFlag).addClass('d-none');
			$(visaFlag).removeClass('d-none');
		} else if (newDigits[0] == 5 && newDigits[1] <= 5) {
			$(digitsFeedback)
				.removeClass('text-danger')
				.addClass('text-success')
				.html('Aceitamos essa bandeira');

			flagThemeChanger({
				remove: 'visa-flag elo-flag default-flag',
				add: 'mastercard-flag'
			});

			$(visaFlag).addClass('d-none');
			$(eloFlag).addClass('d-none');
			$(masterCardFlag).removeClass('d-none');
		} else if (
			(newDigits[0] == 6 && newDigits[1] == 5) ||
			(newDigits[0] == 6 &&
				newDigits[1] == 0 &&
				newDigits[2] == 1 &&
				newDigits[3] == 1)
		) {
			$(digitsFeedback)
				.removeClass('text-danger')
				.addClass('text-success')
				.html('Aceitamos essa bandeira');

			flagThemeChanger({
				remove: 'visa-flag mastercard-flag default-flag',
				add: 'elo-flag'
			});

			$(visaFlag).addClass('d-none');
			$(masterCardFlag).addClass('d-none');
			$(eloFlag).removeClass('d-none');
		} else {
			$(digitsFeedback)
				.removeClass('text-success')
				.addClass('text-danger')
				.html('Não aceitamos essa bandeira');

			flagThemeChanger({
				remove: 'visa-flag mastercard-flag elo-flag',
				add: 'default-flag'
			});

			$(visaFlag).addClass('d-none');
			$(eloFlag).addClass('d-none');
			$(masterCardFlag).addClass('d-none');
		}
	}

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
