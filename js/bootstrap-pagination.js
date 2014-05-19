/**
 * Project: Bootstrap Pagination Navigator
 * Author: Gareth / toonya studio
 *
 * Dependencies: Bootstrap's Pagination plugin, jQuery
 *
 * A simple plugin to navigator bootstrap mutil-page pagination
 *
 * License: MIT
 */

(function($){

	"use strict";


	$.fn.pagination = function(options) {
		return this.each(function(){
			var data = $(this).data();
			var options = $.extend({}, options, data);
			options.$this = $(this);
			new pagination(options);
		})
	}

	var pagination = function(options){
		this.init(options);
	}

	pagination.prototype = {
		init : function(options){
			var defaults = {
				perPage : 5,
				current : 1,
				url : "#"
			}

			this.options = $.extend({}, defaults, options);
			this.options.page = Math.ceil( this.options.max / this.options.perPage );
			this.options.currentPage = this.get_page_num(this.options.current);
			this.options.$pre = this.options.$this.find('[data-to="pre"]').closest('li');
			this.options.$next = this.options.$this.find('[data-to="next"]').closest('li');

			//console.log(this.options);

			this.render();
			this.bind();
		},

		render : function(){
			var $wrapper = this.options.$this;
			var max = this.options.max;

			var list = this.get_list();
			var list_html = "";

			var url = this.options.url;
			var current = this.options.current;
			//console.log(url);



			if(this.options.currentPage==1)
				this.options.$pre.addClass('hide');
			else
				this.options.$pre.removeClass('hide');

			if(this.options.currentPage==this.options.page)
				this.options.$next.addClass('hide');

			else
				this.options.$next.removeClass('hide');

			if(list) {
				$.each(list, function(i,e){
					if(e==current)
						list_html += "<li class='active'><a href='" + url + e + "'>" + e + "</a></li>";
					else
						list_html += "<li><a href='" + url + e + "'>" + e + "</a></li>";
				})


				this.clear_list();

				this.options.$pre.after($(list_html));
			}
		},

		get_page_num : function( target_item ){
			if( target_item )
				return Math.ceil( target_item / this.options.perPage );

			return this.options.currentPage;
		},

		get_list : function(){
			var max = this.options.perPage * this.options.currentPage,
				min = max - this.options.perPage,
				list = [],
				i = 0;

			max > this.options.max ? max=this.options.max : max = max;

			for ( min; min<max; min++, i++ ) {
				list[i] = min+1;
			}

			return list;
		},

		next : function(){
			if( (this.options.currentPage + 1) <= this.options.page ){
				this.options.currentPage += 1;
				this.render();
			}
			return;
		},

		pre : function(){
			if( (this.options.currentPage - 1) >= 1 ){
				this.options.currentPage -= 1;
				this.render();
			}
			return;
		},

		clear_list : function() {
			this.options.$this.find('li').not(this.options.$pre).not(this.options.$next).remove();
		},

		bind : function() {
			this.options.$pre.on('click', 'a' , $.proxy(this.pre, this));
			this.options.$next.on('click', 'a', $.proxy(this.next, this));
		}
	}

	$('.pagination[data-ride="pagination"]').pagination();

})(jQuery)
