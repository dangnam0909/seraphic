(function ($) {
	$.fn.extend({
		isScrollable: function () {
			if ('scrollingElement' in document)
				return document.scrollingElement;
			if (navigator.userAgent.indexOf('WebKit') != -1)
				return document.body;
			return document.documentElement;
		},
		openPage: function (e) {
			if (!e) return $(this);

			const stopEvent = (window.addEventListener ?
				function (evt) {
					evt.preventDefault();
				} :
				function (evt) {
					evt.returnValue = false;
				}
			);

			const cancelEvent = (window.addEventListener ?
				function (evt) {
					evt.stopPropagation();
				} :
				function (evt) {
					evt.cancelBubble = true;
				}
			);

			let elem = e.target || e.srcElement;
			while (elem.tagName.toLowerCase() != 'a')
				elem = elem.parentNode;
			let url = elem.href;
			const wname = elem.target ? elem.target : 'blank';
			const param = elem.rev ? elem.rev : '';

			if (navigator.userAgent.indexOf('MSIE') != -1 && (url.indexOf(location.href.split('/').slice(0, -1).join('/') + '/') != -1 || url.match(/^(\/|\.)/) || !url.match(/^(http|https|ftp|news):\/\/.*/)))
				url = '';
			else
				stopEvent(e);

			cancelEvent(e);

			const w = window.open(url, wname, param);
			if (w) {
				if (url == '') w.location.href = elem.href;
				w.focus();
			}

			return $(this);
		}
	});

	$.createElem = function (tag, params = {}) {
		const elem = document.createElement(tag);

		Object.keys(params).map(key => {
			if (key === 'text') {
				elem.appendChild(document.createTextNode(params[key]));
			}
			else if (key === 'titleText') {
				elem.title = params[key];
				elem.appendChild(document.createTextNode(params[key]));
			}
			else if (key === 'html') {
				elem.innerHTML = params[key];
			}
			else if (/^(?:disabled|selected)$/.test(key)) {
				elem[key] = true;
			}
			else if (/^(?:style|dataset)$/.test(key)) {
				Object.keys(params[key]).map(data => {
					elem[key][data] = params[key][data];
				});
			}
			else {
				elem[key] = params[key];
			}
		});

		return elem;
	};

	$.ajaxSetup({
		cache: false,
		crossDomain: true
	});

	$(function () {
		$(document).on('mouseover focus touchstart', 'a,input,label,button,.swiper-button', function (e) {
			$(this).addClass('on');
		});
		$(document).on('mouseout blur touchend touchmove click', 'a,input,label,button,.swiper-button', function (e) {
			$(this).removeClass('on');
			$('a:focus').blur();
		});

		$('a[target]').on({
			click: function (e) {
				$(this).openPage(e);
				$(this).blur();
				return false;
			},
			keypress: function (e) {
				if (e.keyCode === 13 || e.which ===13) {
					$(this).trigger('click');
				}
			}
		});

		$('a[href^="#"]').each(function () {
			if ($(this).data('unable')) {
				const self = $(this);

				const changeText = function () {
					if (self.hasClass('disable'))
						self.text(self.data('unable'));
					else
						self.text(self.attr('title'));
				};

				$(this).on({ changeClass: changeText });
				changeText();
			}
		});
		$(document).on('click', 'a[href^="#"]', function (e) {
			e.preventDefault();

			const href = $(this).get(0).getAttribute('href', 2);
			let posX = -70; //$('header:first').innerHeight() * -1 + 50;

			if (document.getElementById(href.replace('#', '')) && $(href).is(':visible')) {
				$($(this).isScrollable()).animate({ scrollTop: posX + $(href).offset().top }, 500).promise().done(function () { document.activeElement.blur() });
				if ($('body').hasClass('nav-open')) {
					$('body').removeClass('nav-open noscroll')
				}
			}
			else if (href === '#historyBack') {
				history.back();
			}

			return false;
		});
		$(document).on('keypress', 'a[href^="#"]', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				$(this).trigger('click');
			}
		});
	});
})(jQuery);