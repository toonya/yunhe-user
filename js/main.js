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

	// ----------------------------------------
	// ! comment score
	// ----------------------------------------
	$('.add-star').on('click', 'span.glyphicon', function(){
		var star = $(this).index('.glyphicon') + 1;

		$('.add-star .glyphicon:lt('+star+')').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
		$('.add-star .glyphicon:gt('+ (star-1)+')').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
	})

	$('.add-star .glyphicon:lt('+$('.add-star :hidden').val()+')').removeClass('glyphicon-star-empty').addClass('glyphicon glyphicon-star');

	// ----------------------------------------
	// ! avatar file upload
	// ----------------------------------------
	$('.open-file-upload').click(function(e){
		e.preventDefault();

		$($(this).data('target')).trigger('click');
	})

	$('.hidden-file').on('change', ':file', function(){
		if(this.files[0].type.match('image'))
			readURL(this);
		else {
			alert('请检查文件格式，只能上传图片作为头像');
			$(this).replaceWith($('<input name="user[avatar]" id="avatar" type="file" accept="image/*" />'));
		}
	})

	function readURL(input) {

	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('.open-file-upload').find('img').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	// ----------------------------------------
	// ! modify
	// ----------------------------------------
	$('[data-ride="modify"]').click(function(e){
		e.preventDefault();

		$('[data-group="'+ $(this).data('group') +'"]').find('[data-toggle]').toggleClass('hide');
	})

	$("input").keypress(function (evt) {
		//Deterime where our character code is coming from within the event
		var charCode = evt.charCode || evt.keyCode;
		if (charCode  == 13) { //Enter key's keycode
			return false;
		}
	});


})(jQuery)
