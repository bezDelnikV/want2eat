var prodListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [],
};

function owlCarousel(position) {
    let owl = $('.owl-carousel');
    owl.owlCarousel({
        nav: true,
        margin: 40,
        smartSpeed: 400,
        dots: false,
        startPosition: position,
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

$(document).ready(function () {
    let arrSplit = location.href.split('/');
    let proudctId = location.href.split('/')[4];
    let categoryId = location.href.split('/')[6];
    arrSplit.length == 8 ? openModalDish(arrSplit[7], true) : true;
    GenerateContent(proudctId, categoryId);
    owlCarousel();
    $('#modal-dish-weight').change(function () {
        let option = $($(this).find('option:selected'));
        $('#modal-dish-price').empty();
        $('#modal-dish-price').append(option.attr('data-price'));
    });
});

function GenerateContent(id, categoryId) {
    $.ajax({
        url: 'http://adm.want2eat.com.ua/api/product-category/from-shop?shop_id=' + id,
        method: "GET",
        success: function (data) {
            $('#main-container').append($('<div>')
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
                                .attr('class', 'lazyload')
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
                        .attr('class', 'product-container')
                        .attr('id', 'product-menu-container')
                    ))
            $('#shop-menu-owl-carousel').append($('<div>')
                .attr('class', 'item')
                .append($('<a>').attr('href', '/shop/' + id).append('Меню'))
            );
            let selectClass;
            let selectedItem = 0;
            data.data.productCategories.forEach(function (item, index) {
                    if (item['id'] == categoryId) {
                        selectClass = 'item select-owl-carousel-item';
                        selectedItem = index + 1;
                    } else {
                        selectClass = 'item'
                    }
                    $('#shop-menu-owl-carousel').append($('<div>')
                        .attr('class', selectClass)
                        .append($('<a>').attr('href', '/shop/' + id + '/product/' + item.id).append(item.name))
                    )
                }
            );
            owlCarousel(selectedItem);
            GenerateProduct(id, categoryId);
        }
    })
}

function GenerateProduct(id, prodId) {
    $.ajax({
        url: 'http://adm.want2eat.com.ua/api/product/from-product-category?shop_id=' + id + '&product_category_id=' + prodId + '&skip=0&take=50',
        method: "GET",
        success: function (data) {
            data.data.products.forEach(item => {
                $('#product-menu-container').append($('<div>')
                    .attr('class', 'item-product')
                    .attr('onclick', 'openModalDish(' + item.id + ')')
                    .append($('<div>')
                        .attr('class', 'item-product-img')
                        .append($('<img>')
                            .attr('class', 'lazyload')
                            .attr('data-src', item.photo_url ? 'http://adm.want2eat.com.ua/images/' + item.photo_url : '/img/thumb-small.png'))
                        .append($('<button>').append('Хочу')))
                    .append($('<div>')
                        .attr('class', 'item-product-info')
                        .attr('id', 'item-product-info-' + item.id)
                        .append($('<h4>').append(item.name))
                        .append($('<p>')
                            .attr('class', 'dish-info')
                            .append(item.info))
                    )
                );
                if (item.productProperties.length > 1) {
                    $('#item-product-info-' + item.id).append($('<p>')
                        .attr('class', 'product-info-price')
                        .append('Від: ')
                        .append($('<span>').append(" " + Math.min(...item.productProperties.map(el => parseInt(el.price))) + "грн"))
                    )
                        .append($('<p>')
                            .attr('class', 'product-info-price')
                            .append('До: ')
                            .append($('<span>').append(" " + Math.max(...item.productProperties.map(el => parseInt(el.price))) + "грн"))
                        )

                } else {
                    $('#item-product-info-' + item.id).append($('<p>')
                        .attr('class', 'product-info-solo-price')
                        .append('Ціна: ')
                        .append($('<span>').append(" " + item.productProperties[0].price + "грн"))
                    )
                }
            });
            generateProductsJsonLd(data.data.products.map(el => el.id));
        }
    })
}

function generateProductsJsonLd(prod_id, index = 0) {
    if (prod_id.length > index) {
        $.ajax({
            url: 'http://adm.want2eat.com.ua/api/product/?product_id=' + prod_id[index],
            method: "GET",
            success: function (data) {
                index++;
                let prod_item = data.data.product;
                let prod = {
                    "@type": "ListItem",
                    "position": '' + index,
                    "item": {
                        '@context': 'https://schema.org',
                        '@type': 'Product',
                        'name': prod_item['name'],
                        'image': [
                            prod_item['photo_url'] == '' ? window.location.hostname + '/img/thumb-small.png' : 'http://adm.want2eat.com.ua/images/' + prod_item['photo_url'],
                        ],
                        'description': prod_item['info'],
                        "offers": {
                            "@type": "Offer",
                            "url": location.href + '/' + prod_item['id'],
                            "priceCurrency": "UAH",
                            "price": prod_item['productProperties'][0]['price'],
                            // "itemCondition": "https://schema.org/UsedCondition",
                            // "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "Organization",
                                "name": "Want2Eat"
                            }
                        }
                    }
                };

                prodListLD['itemListElement'].push(prod);
                generateProductsJsonLd(prod_id, index);
                if (prod_id.length == index) {
                    let script = document.createElement('script');
                    script.type = "application/ld+json";
                    script.innerHTML = JSON.stringify(prodListLD);
                    document.getElementsByTagName('body')[0].appendChild(script);
                }
            }
        });

    }
}

function generateBreadProductWindow() {
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
                'item': window.location.hostname + '/shops',
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': window.location.hostname + '/shop/' + location.href.split('/')[4],
            },
            {
                '@type': 'ListItem',
                'position': 4,
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
