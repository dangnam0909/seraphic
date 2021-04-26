(function ($) {
	$.fn.extend({
		showAnimation: function () {
			const scrollAnimationClass = 'sa';
			const scrollAnimationShowClass = 'show';
			const triggerMarginDefault = 300;

			const dataMargin = scrollAnimationClass + '_margin';
			const dataTrigger = scrollAnimationClass + '_trigger';
			const dataDelay = scrollAnimationClass + '_delay';

			$(this).each(function (i) {
				const elem = $(this);
				if (!elem.hasClass(scrollAnimationShowClass)) {
					let showPos = this.dataset[dataMargin] ? parseInt(this.dataset[dataMargin]) : triggerMarginDefault;
					showPos += this.dataset[dataTrigger] ? document.querySelector(this.dataset[dataTrigger]).getBoundingClientRect().top : this.getBoundingClientRect().top;

					if (window.innerHeight > showPos) {
						const delay = (this.dataset[dataDelay]) ? this.dataset[dataDelay] : 0;
						setTimeout(function () {
							elem.addClass(scrollAnimationShowClass);
						}.bind(null, i), delay);
					}
				}
			});

			return $(this);
		},
		sendForm: function () {
			const form = this.get(0);

			$(form).find('p.btn a').on({
				click: function (e) {
					e.preventDefault();

					const email1 = form.email.value;
					const email2 = form.email_confirmation.value;
					if (email1 !== email2) {
						form.email_confirmation.setCustomValidity('入力値が一致しません。');
					}
					else {
						form.email_confirmation.setCustomValidity('');
					}

					if (form.reportValidity()) {
						form.email_confirmation.disabled = true;
						form.submit();
					}

					return false;
				},
				keypress: function (e) {
					if (e.keyCode === 13 || e.which === 13) {
						$(this).trigger('click');
					}
				}
			});

			return $(this);
		}
	});
})(jQuery);