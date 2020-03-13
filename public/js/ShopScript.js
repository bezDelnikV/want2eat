$(document).ready(function () {
    GenerateContent(location.href.split('/').pop());
})

function GenerateContent(id) {
    $.ajax({
        url: 'https://adm.want2eat.com.ua/api/product-category/from-shop?shop_id=' + id,
        method: "GET",
        success: function (data) {
            $('#main-container')
                .append($('<div>')
                    .attr('class', 'tool-bar')
                    .append($('<a>')
                        .attr('href', '/')
                        .append($('<img>').attr('src', '/img/home.svg')))
                    .append($('<a>')
                        .attr('href', '/shops')
                        .append('Заклади'))
                    .append($('<a>')
                        .attr('href', '/shop/' + data.data.shop[0].id)
                        .append(data.data.shop[0].name)))
                .append($('<div>')
                    .attr('class', 'main-shop')
                    .append($('<div>')
                        .attr('class', 'shop-info')
                        .append($('<div>')
                            .attr('class', 'shop-info-img')
                            .append($('<img>')
                                .attr('class','lazyload')
                                .attr('data-src', 'http://adm.want2eat.com.ua/images/' + data.data.shop[0].photo_url)))
                        .append($('<div>')
                            .attr('class', 'shop-info-name')
                            .append($('<h3>').append(data.data.shop[0].name))
                            .append($('<p>')
                                .attr('class', 'star-container')
                                .append($('<span>').attr('class', 'star-y').attr('style', 'width:' + data.data.shop[0].rating * 23 + 'px;'))
                                .append($('<span>').attr('class', 'star-g')))
                            .append($('<p>')
                                .attr('class', 'kitchen-info')
                                .append(data.data.shop[0].filterKitchens.map(a => a.name).join(' , '))))
                        .append($('<div>')
                            .attr('class', 'shop-info-delivery')
                            .append($('<div>')
                                .append($('<p>').append('Замовлення'))
                                .append($('<img>').attr('src', '/img/dollar.svg'))
                                .append($('<p>').append('Від ' + data.data.shop[0].order_sum_min + ' грн')))
                            .append($('<div>')
                                .append($('<p>').append('Час доставки'))
                                .append($('<img>').attr('src', '/img/clock.svg'))
                                .append($('<p>').append('Від ' + data.data.shop[0].delivery_price_min + ' грн')))
                            .append($('<div>')
                                .append($('<p>').append('Вартість доставки'))
                                .append($('<img>').attr('src', '/img/car.svg'))
                                .append($('<p>').append('Від ' + data.data.shop[0].delivery_time_min + ' грн')))))
                    .append($('<div>')
                        .attr('class', 'shop-bar')
                        .append($('<div>')
                            .attr('class', 'owl-carousel owl-theme')
                            .attr('id', 'shop-menu-owl-carousel')
                        )
                    )
                    .append($('<div>')
                        .attr('class', 'shop-menu-info')
                        .attr('id', 'shop-menu-info-items')
                    )
                )
            $('#shop-menu-owl-carousel').append($('<div>')
                .attr('class', 'item select-owl-carousel-item')
                .append($('<a>').attr('href', '/shop/' + id).append('Меню'))
            )
            data.data.productCategories.forEach(item =>
                $('#shop-menu-owl-carousel').append($('<div>')
                    .attr('class', 'item')
                    .append($('<a>').attr('href', '/shop/' + id + '/product/' + item.id).append(item.name))
                )
            )
            data.data.productCategories.forEach(item =>
                $('#shop-menu-info-items').append($('<div>')
                    .attr('class', 'menu-item')
                    .append($('<a>')
                        .attr('href', '/shop/' + data.data.shop[0].id + '/product/' + item.id)
                        .append($('<div>')
                            .attr('class', 'menu-item-img')
                            .append($('<img>')
                                .attr('class','lazyload')
                                .attr('data-src', 'http://adm.want2eat.com.ua/images/' + item.photo_url))
                            .append($('<p>').append(item.name))
                        )
                    )
                )
            )
            owlCarousel();
        }
    })
}

function owlCarousel() {
    let owl = $('.owl-carousel');
    owl.owlCarousel({
        nav: true,
        margin: 40,
        smartSpeed: 400,
        // stagePadding: 5,
        dots: false,
        responsive: {
            0: {
                slideBy: 1
            },
            600: {
                slideBy: 2

            },
            1100: {
                slideBy: 3
            }
        },
        autoWidth: true,
        navText: [
            '<div class="app-arrow"></div>',
            '<div class="app-arrow-2"></div>',
        ],

    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });
}
function generateBreadShopWindow() {

    let jsonBreadcrumb = {
        '@context': "https://schema.org",
        '@type': "BreadcrumbList",
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': '',
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': window.location.hostname+'/shops',
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': location.href,
            },
        ]
    };
    let script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonBreadcrumb);
    document.getElementsByTagName('body')[0].appendChild(script);
}
