'use strict';

String.prototype.formatDate = function (...args) {
	const value = this;

	const merid = {
		ja: ['午前', '午後'],
		en: ['ａｍ', 'ｐｍ']
	};
	const month = {
		ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		en: ['Ｊａｎｕａｒｙ', 'Ｆｅｂｒｕａｒｙ', 'Ｍａｒｃｈ', 'Ａｐｒｉｌ', 'Ｍａｙ', 'Ｊｕｎｅ', 'Ｊｕｌｙ', 'Ａｕｇｕｓｔ', 'Ｓｅｐｔｅｍｂｅｒ', 'Ｏｃｔｏｂｅｒ', 'Ｎｏｖｅｍｂｅｒ', 'Ｄｅｃｅｍｂｅｒ']
	};
	const dow = {
		ja: ['日', '月', '火', '水', '木', '金', '土'],
		en: ['Ｓｕｎｄａｙ', 'Ｍｏｎｄａｙ', 'Ｔｕｅｓｄａｙ', 'Ｗｅｄｎｅｓｄａｙ', 'Ｔｈｕｒｓｄａｙ', 'Ｆｒｉｄａｙ', 'Ｓａｔｕｒｄａｙ']
	};

	const addStr = (value) => params.pos ? value.toString().padEnd(params.digit, params.add) : value.toString().padStart(params.digit, params.add);

	let params = {
		format: 'Y/m/d H:i',
		lang: 'ja',
		pid: 1,
		add: '0',
		digit: '2',
		pos: 0
	};

	if (args.length == 1) {
		if (Array.isArray(args[0])) {
			args = args[0];
		} else if (typeof args[0] === 'object') {
			Object.keys(args[0]).map(key => params[key] = typeof params[key] !== 'undefined' ? args[0][key] : params[key]);
		}
	}

	if (Array.isArray(args) && typeof args[0] === 'string') {
		const keys = Reflect.ownKeys(params);
		for (let i = 0, imax = args.length; i < imax; i++) {
			params[keys[i]] = args[i];
		}
	}

	const period = (() => params.lang === 'en' && params.pid ? '.' : '')();
	params.lang = !/^(?:ja|en)$/.test(params.lang) ? 'ja' : params.lang;

	const d = new Date(value.toString());

	if (Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.getTime())) {
		const _fmt = {
			H: function (date) { return addStr(date.getHours()); },
			G: function (date) { return date.getHours(); },
			h: function (date) { return addStr(date.getHours() % 12); },
			g: function (date) { return date.getHours() % 12; },
			a: function (date) { return merid[params.lang][date.getHours() / 12 | 0]; },
			A: function (date) { return (merid[params.lang][date.getHours() / 12 | 0]).toUpperCase(); },
			i: function (date) { return addStr(date.getMinutes()); },
			I: function (date) { return date.getMinutes(); },
			s: function (date) { return addStr(date.getSeconds()); },
			S: function (date) { return date.getSeconds(); },
			Y: function (date) { return date.getFullYear() + ''; },
			y: function (date) { return date.getFullYear().toString().slice(-2); },
			m: function (date) { return addStr(date.getMonth() + 1); },
			n: function (date) { return date.getMonth() + 1; },
			F: function (date) { const m = month[params.lang][date.getMonth()]; return params.lang === 'ja' ? addStr(m) : m; },
			M: function (date) { return month[params.lang][date.getMonth()].slice(0, 3) + period; },
			d: function (date) { return addStr(date.getDate()); },
			j: function (date) { return date.getDate(); },
			J: function (date) { return date.getDate() + (params.lang === 'en' ? (date.getDate() <= 3 ? ["ｓｔ", "ｎｄ", "ｒｄ"][date.getDate() - 1] : 'ｔｈ') : ''); },
			D: function (date) { return dow[params.lang][date.getDay()].slice(0, 3) + period; },
			l: function (date) { return params.lang === 'ja' ? dow[params.lang][date.getDay()] + '曜日' : dow[params.lang][date.getDay()]; },
		};

		return Object.keys(_fmt).reduce((res, fmt) => new RegExp(fmt).test(res) ? res.replace(fmt, _fmt[fmt](d)) : res, params.format).replace(/[Ａ-Ｚａ-ｚ]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
	} else {
		return value.toString();
	}
};