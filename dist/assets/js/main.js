$(function () {
	const header = $('header:first');

	// header height
	$(window).on({
		scroll: function (e) {
			if ($(window).scrollTop() >= header.innerHeight() / 2) {
				header.addClass('small');
			}
			else {
				header.removeClass('small');
			}
		}
	});

	const go_id = function(){
		if (window.location.hash.length > 1) {
			$("html, body").animate(
				{
					scrollTop: $(window.location.hash).offset().top - 100,
				},
				300
			);
		}
	};

	// max height
	const setVarHeight = function () {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	};
	$(window).on({
		resize: setVarHeight,
	});
	setVarHeight();
	go_id();

	// for add year
	$('.year').each(function () {
		$(this).text(new Date().getFullYear());
	});

	// main top padding
	// $('main').css('marginTop', header.innerHeight());

	// main top padding
	$('#thanks').css('marginTop', header.innerHeight());
	$('#contact').css('marginTop', header.innerHeight());
	$('#privacy').css('marginTop', header.innerHeight());
	// for active link
	header.find('nav > ul > li > a').each(function () {
		const href = $(this).attr('href').replace(/[#?](?:.*)/, '');
		const reg = new RegExp('^' + href);
		if (reg.test(location.pathname)) {
				$(this).addClass('active')
		}
	});

	// for hamburger menu
	if (window.matchMedia('(max-width:767px)').matches) {
		const hamburger = document.createElement('div');
		hamburger.id = 'hamburger';

		for (let i = 0; i < 3; i++) {
			hamburger.appendChild(document.createElement('span'));
		}

		header.append(hamburger);

		const menu_bg = document.createElement('div');
		menu_bg.id = 'menu_bg';
		header.append(menu_bg);

		$(hamburger).on({
			click: function (e) {
				e.preventDefault();
				$('body').toggleClass('nav-open noscroll');
				if ($('body').hasClass('noscroll')) {
					$(window).on('touchmove.noScroll', function (e) { e.preventDefault(); });
				}
				else {
					$(window).off('.noScroll');
				}

				return false;
			},
			keypress: function (e) {
				if (e.keyCode === 13 || e.which === 13) {
					$(this).trigger('click');
				}
			}
		});

		menu_bg.addEventListener('click', function (e) {
			e.preventDefault();
			$('body').removeClass('nav-open noscroll');
			$(window).off('.noScroll');

			return false;
		});
	}

	// for go to top
	$.addGo2Top = function () {
		const footer = document.querySelector('footer');
		footer.classList.remove('fix_bottom');

		if ((window.innerHeight || document.documentElement.clientHeight) < document.body.clientHeight) {
			if (!document.getElementById('gototop')) {
				const move = true;

				const p = document.createElement('p');
				p.id = 'gototop';
				const a = document.createElement('a');
				a.href = '#';
				a.title = 'back to top';
				a.appendChild(document.createTextNode('back to top'));
				p.appendChild(a);
				document.body.appendChild(p);

				const baseBottom = parseInt($(p).css('bottom'));
				const fixPos = function () {
					const fTop = footer.getBoundingClientRect().top;
					if (window.innerHeight > fTop) {
						$(p).css({
							bottom: baseBottom + (window.innerHeight - fTop),
							transition: 'unset'
						});
					}
					else {
						$(p).css({
							bottom: '',
							transition: ''
						});
					}
				};

				$(a).on({
					click: function (e) {
						e.preventDefault();
						$($(this).isScrollable()).animate({ scrollTop: 0 }, 500).promise().done(function () { document.activeElement.blur() });
						return false;
					},
					keypress: function (e) {
						if (e.keyCode === 13 || e.which === 13) {
							$(this).trigger('click');
						}
					}
				});

				$(window).on({
					'scroll touchend': function (e) {
						if ($(window).scrollTop() >= header.innerHeight()) {
							$(p).css({
								visibility: 'visible',
								opacity: 1
							});
							if (move) {
								setTimeout(fixPos, 1);
							}
						}
						else {
							$(p).removeAttr('style');
						}
					}
				});
			}
		}
		else if ((window.innerHeight || document.documentElement.clientHeight) > document.body.clientHeight + header.innerHeight()) {
			footer.classList.add('fix_bottom');
		}
	};
	$.addGo2Top();

	// for links in the page
	$.link2InPage = function () {
		if (location.hash) {
			const hash = location.hash.replace('__', '');
			$(window).on({
				load: function () {
					$('nav a[href="' + hash + '"]', header).trigger('click');
				}
			});
		}
	};

	// fadeIn elements
	$(window).on({
		'load scroll': function (e) {
			$('.sa').showAnimation();
		}
	});

	// for top page
	if (document.getElementById('top')) {

	}
	// for contact page
	else if (document.getElementById('contact')) {
		$('#form').sendForm();
	}
});
