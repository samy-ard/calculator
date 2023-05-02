( function($) {
	var updateTheme = function() {
		let value = $('#c-switcher').val();
		let $theme = '';
		
		switch ( value ) {
			case '1' : $theme = 'basic-theme'; break;
			case '2' : $theme = 'light-theme'; break;
			case '3' : $theme = 'dark-theme'; break;
			default : $theme = 'basic-theme'; break;
		}
		
		$('.main').removeClass('basic-theme').removeClass('light-theme').removeClass('dark-theme');
		$('.main').addClass($theme);
	}

	$(document).ready(function() {
		updateTheme();
		
		$('.c-switcher').on('click', function(e) {
			updateTheme();
		});

		$('.btn-reset').on('click', function(e) {
			e.preventDefault();
			$('.c-screen-inner').html(0);
		});
		
		$('.btn-delete').on('click', function(e) {
			e.preventDefault();
			let screen = $('.c-screen-inner');
			let screenVal = screen.html();
			if( screenVal.length > 1 ) {
				screen.html(screenVal.slice(0, screenVal.length-1));
			} else {
				screen.html(0);
			}
		});

		$('.btn-operator').on('click', function(e) {
			e.preventDefault();
			let operation = $(this).val();
			let screenVal = $('.c-screen-inner').html();
			let screen = $('.c-screen-inner');

			if( operation == '.' ) {
				if( screenVal.indexOf('.') === -1 || 
					(screenVal.indexOf('.') !== -1 && screenVal.indexOf('+') !== -1) ||
					(screenVal.indexOf('.') !== -1 && screenVal.indexOf('-') !== -1) ||
					(screenVal.indexOf('.') !== -1 && screenVal.indexOf('/') !== -1) ||
					(screenVal.indexOf('.') !== -1 && screenVal.indexOf('*') !== -1)
					) {
					screen.html(screenVal + operation);
				}
			} else {
				let lastChar = screenVal.slice(screenVal.length-1, screenVal.length);
				if (
						lastChar !== '+' && 
						lastChar !== '-' && 
						lastChar !== '*' && 
						lastChar !== '/' && 
						lastChar !== '.'
					) {
					screen.html(screenVal + operation);
				}
			}
		});

		$('.btn-result').on('click', function(e) {
			let screen = $('.c-screen-inner');
			let screenVal = screen.html();
			let result = eval(screenVal);
			screen.html(result);
			screen.scrollLeft(500);
		});

		$('.btn-key').on('click', function(e) {
			e.preventDefault();
			let btn = this;
			let screen = $('.c-screen-inner');
			let screenVal = screen.html();
			if ( btn.classList.length === 1 ) {
				// if screen value is 0 and key pressed is not 0
				if( $(btn).val() != 0 && screenVal == 0 ) {
					screen.html($(btn).val());
					// if screen value is not 0 and key pressed is not 0
				} else if( $(btn).val() != 0 || screenVal != 0 ) {
					screen.html(screenVal + $(btn).val());
					screen.scrollLeft(500);
				}  
			}
		});	
	});
})(jQuery);