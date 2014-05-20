/**
 * Project: Bootstrap Num Input
 * Author: Gareth / toonya studio
 *
 * Dependencies: Bootstrap's Bootstrap Num Input, jQuery
 *
 * A simple plugin to make a number-input component.
 *
 * License: MIT
 */

(function($){

	"use strict";


	$.fn.numInput = function(options) {
		return this.each(function(){
			var data = $(this).data();
			var options = $.extend({}, options, data);
			options.$this = $(this);
			new numInput(options);
		})
	}

	var numInput = function(options){
		this.init(options);
	}

	numInput.prototype = {
		init : function(options){
			this.options = options;
			this.options.pages = this.options.$this.val();

			if(!this.options.pages)
				this.options.pages = 0;

			this.render();
			this.bind();
		},

		render : function() {
			var $minus_html = $('<div class="btn-group">'+
								  '<button type="button" class="btn btn-default">-</button>'+
								  '<button type="button" class="btn btn-default"></button>'+
								  '<button type="button" class="btn btn-default">+</button>'+
								'</div>');
			$minus_html.find('button').eq(1)
			.css({'padding':0, 'width':'60px'}).html(this.options.$this.clone().val(this.options.pages).css({'height': '32px', 'border': 'none', 'text-align': 'center'}));
			this.options.$this.replaceWith($minus_html);

			this.options.$new = $minus_html;
			this.options.$num = this.options.$new.find('input');
		},

		bind : function() {
			this.options.$new.find('button').eq(0).on('click', $.proxy(this.minus,this));
			this.options.$new.find('button').eq(2).on('click', $.proxy(this.plus,this));
			this.options.$num.on('keyup', $.proxy(this.valid,this));
			this.options.$num.on('numInvalid', $.proxy(this.error,this));
		},

		minus : function() {
			var pages = this.options.$num.val();

			if(! this.options.min && this.options.min != 0 && this.options.min != '0')
				pages = pages/1 - 1;
			if(this.options.min || this.options.min == 0 || this.options.min == '0')
				(pages > this.options.min/1) && (pages = pages/1 - 1) ;

			this.options.$num.val(pages).trigger('numInput');
		},

		plus : function() {
			var pages = this.options.$num.val();
			if(! this.options.max)
				pages = pages/1 + 1;
			if(this.options.max)
				(pages < this.options.max) && (pages = pages/1 + 1) ;
			this.options.$num.val(pages).trigger('numInput');
		},

		valid : function() {

			this.options.$num.closest('.btn-group').siblings('.error').text('');
			var value = this.options.$num.val();
			if(isNaN(value)){
				this.options.$num.trigger('numInvalid');
			}
			else this.options.$num.trigger('numInput');
		},

		error : function() {

			if(this.options.error)
				this.options.$num.closest('.btn-group').siblings(this.options.error).text('请输入数字');
			else
				this.options.$num.closest('.btn-group').siblings('.error').text('请输入数字');
		}

	}


	$('input[data-ride="num"]').numInput();

})(jQuery)