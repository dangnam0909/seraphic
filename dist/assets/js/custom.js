if ($('#home').length) {
  var swiper_top = new Swiper('#home .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    lazy: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
    },
    breakpoints: {
      // when window width is >= 320px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

    }
  });
}

if ($('#product').length) {
  var swiper_product = new Swiper('#product .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    lazy: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
    },
    breakpoints: {
      // when window width is >= 320px
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1380: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1921: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    }
  });
}