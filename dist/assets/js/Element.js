'use strict';

Element.prototype.setAttributes = function (params = {}) {
	const throwError = (error = 'Unknown error') => console.error(error);

	if (Object.prototype.toString.call(params) === '[object Object]') {
		Object.keys(params).forEach(key => {
			if (key === 'append') {
				if (Array.isArray(params[key])) {
					const fragment = document.createDocumentFragment();
					params[key].forEach(elem => {
						if (elem.nodeType === 1) {
							fragment.appendChild(elem);
						}
						else {
							throwError(`${key}.${elem} must be Dom object`);
						}
					});
					this.appendChild(fragment);
				}
				else if (params[key].nodeType === 1) {
					this.appendChild(params[key]);
				}
				else {
					throwError(`${key} must be Array or Dom object`);
				}
			}
			else if (key === 'class') {
				if (Array.isArray(params[key])) {
					params[key].forEach(className => {
						if (typeof className === 'string') {
							this.classList.add(className);
						}
						else {
							throwError(`Array values of ${key} must be String`);
						}
					});
				}
				else if (typeof params[key] === 'string') {
					this.classList.add(params[key]);
				}
				else {
					throwError(`${key} must be Array or String`);
				}
			}
			else if (key === 'text') {
				if (typeof params[key] === 'string' || Number.isFinite(params[key])) {
					this.appendChild(document.createTextNode(params[key]));
				}
				else {
					throwError(`${key} must be String or Number`);
				}
			}
			else if (key === 'titleText') {
				if (typeof params[key] === 'string' || Number.isFinite(params[key])) {
					this.title = params[key];
					this.appendChild(document.createTextNode(params[key]));
				}
				else {
					throwError(`${key} must be String or Number`);
				}
			}
			else if (key === 'html') {
				if (typeof params[key] === 'string' || Number.isFinite(params[key])) {
					this.innerHTML = params[key];
				}
				else {
					throwError(`${key} must be String or Number`);
				}
			}
			else if (/^(?:style|dataset)$/.test(key)) {
				if (Object.prototype.toString.call(params[key]) === '[object Object]') {
					Object.keys(params[key]).forEach(data => {
						if (typeof params[key][data] === 'string' || Number.isFinite(params[key][data])) {
							this[key][data] = params[key][data];
						}
						else {
							throwError(`${key}.${data} must be String or Number`);
						}
					});
				}
				else {
					throwError(`${key} must be Object`);
				}
			}
			else {
				this[key] = params[key];
			}
		});
	}
	else {
		throwError('argument must be Object');
	}

	return this;
}