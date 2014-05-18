(function($){

	"use strict";

	// ----------------------------------------
	// ! form validate
	// ----------------------------------------
	$('form [data-required] :input')
	.each(function(i,e){
		$(this).not('[required]').on('beginValid', function(){
			$(this).attr('required','required');
		});
		$(this).on('stopValid', function(){
			$(this).removeAttr('required');
		});
	})
	.closest('form')
	.on('reset',function(){
		$(this).find('[data-required] :input').trigger('stopValid');
	})
	.one('submit',function(e){

		$(this).find('[data-required] :input').trigger('beginValid');

		if( $(':invalid').size() > 0 ) {
			e.preventDefault();
		}

		else {
			$(this).trigger('submit');
		}
	});


	// ----------------------------------------
	// ! search faq
	// ----------------------------------------
	$('.faq-search')
	.on('reset', function(e){
		e.preventDefault();
		$(this).find('input').trigger('init');
	})
	.find('input')
	.on('refresh', function(){

		var keywords = $(this).val(),
		    $items   = $('.faq-content .collapse'),
		    keywords_to_reg = new RegExp(keywords,'i');

		if( keywords == "" ) {
			$items.each(function(i,e){
				$(this).collapse('hide');
			})
			return;
		}

		// loop items and match them with the keywords
		$items.each(function(i,e){

			if($(this).text().match(keywords_to_reg)) {
				$(this).collapse('show');
			}
			else {
				$(this).collapse('hide')
			}
		})
	})
	.on('init', function(){
		$(this).val("");
		$(this).trigger('refresh');
	})
	.on('keyup', function(){
		$(this).trigger('refresh');
	})


	// ----------------------------------------
	// ! faq list style.
	// ----------------------------------------
	$('.collapse').on('show.bs.collapse', function(){
		$(this).closest('.panel').addClass('active');
	}).on('hide.bs.collapse', function(){
		$(this).closest('.panel').removeClass('active');
	})
})(jQuery)
