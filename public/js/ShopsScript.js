var jsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [],
};

$(document).ready(function () {

    let tmpId = location.href.split('/').pop();
    if (tmpId == 'shops') {
        createMenu('https://adm.want2eat.com.ua/api/shop/');
    } else {
        createMenu('https://adm.want2eat.com.ua/api/shop/from-filter-category?filter_category=' + tmpId);
    }

});


/*{
  "@context": "http://schema.org",
  "@type": "Restaurant",
   "image": "https://www.yourwebsite.com/logo.jpg",
   "priceRange" : "£5 - £25",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Street Address",
    "addressLocality": " Town ",
    "addressRegion": "County",
    "postalCode": "00000"

  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4",
    "reviewCount": "250"
  },
  "name": "Name of Restaurant",
  "openingHours": [
    "Mo-Sa 11:00-14:30",
    "Mo-Th 17:00-21:30",
    "Fr-Sa 17:00-22:00"
  ],

  "servesCuisine": [
    "Middle Eastern",
    "Mediterranean"
  ],
  "telephone": "0000-000000",
  "url": "https://www.yourwebsite.com",
  "hasMap": "https://GoogleMapLink"
}*/

function createMenu(filter) {
    $.ajax({
        url: filter,
        method: "GET",
        success: function (data) {
            data.data.shops.forEach(element => {
                $('#shop-item-container')
                    .append($('<a>')
                        .attr('href', '/shop/' + element.id)
                        .attr('class', 'shop-item')
                        .append($('<div>')
                            .attr('class', 'shop-item-img')
                            .append($('<img>')
                                .attr('class', 'lazyload')
                                .attr('data-src', 'http://adm.want2eat.com.ua/images/' + element.photo_url)))
                        .append($('<div>')
                            .attr('class', 'shop-item-info')
                            .append($('<h4>').append(element.name))
                            .append($('<p>')
                                .attr('class', 'star-container')
                                .append($('<span>').attr('class', 'star-y').attr('style', 'width:' + element.rating * 23 + 'px;'))
                                .append($('<span>').attr('class', 'star-g'))
                            )

                            .append($('<p>')
                                .attr('class', 'kitchen-info')
                                .append(element.filterKitchens.map(a => a.name).join(' , ')))
                            .append($('<div>')
                                .attr('class', 'delivery-info')
                                .append($('<div>')
                                    .attr('class', 'order-info')
                                    .append($('<p>').append('Замовлення'))
                                    .append($('<div>')
                                        .append($('<img>').attr('src', '/img/dollar.svg'))
                                        .append($('<p>')
                                            .append('Від ' + element.order_sum_min + ' грн.')
                                        )))

                                .append($('<div>')
                                    .attr('class', 'order-info')
                                    .append($('<p>').append('Час доставки'))
                                    .append($('<div>')
                                        .append($('<img>').attr('src', '/img/car.svg'))
                                        .append($('<p>')
                                            .append('Від ' + element.delivery_time_min + ' хв.')
                                        )))

                                .append($('<div>')
                                    .attr('class', 'order-info')
                                    .append($('<p>').append('Ціна доставки'))
                                    .append($('<div>')
                                        .append($('<img>').attr('src', '/img/clock.svg'))
                                        .append($('<p>')
                                            .append('Від ' + element.delivery_price_min + ' грн.')
                                        )))
                            )
                        )
                    )
            });
            generateJsonLD(data.data.shops.map(el => el.id));
            // console.log(jsonLD);
        }
    });
}

function generateJsonLD(shops_id, index = 0) {
    if (shops_id.length > index) {
        $.ajax({
            url: 'https://adm.want2eat.com.ua/api/shop/?shop_id=' + shops_id[index],
            method: "GET",
            success(data) {
                let shop = data.data.shop_detail;
                index++;
                let jsonLD_item = {
                    "@type": "ListItem",
                    "position": '' + index,
                    "item": {
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "image": 'http://adm.want2eat.com.ua/images/' + shop.photo_url,
                        "url": window.location.hostname + "/shop/" + shop.id,
                        "name": shop.name,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": shop.street,
                            "addressCountry": "UA",
                            "addressLocality": shop.city,
                            "addressRegion": "UA",
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": shop.lat,
                            "longitude": shop.lng,
                        },
                        "servesCuisine": "",
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Monday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 1).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 1).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Tuesday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 2).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 2).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Wednesday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 3).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 3).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Thursday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 4).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 4).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Friday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 5).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 5).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Saturday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 6).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 6).time_end,
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": "Sunday",
                                "opens": shop.shopTimeWorks.find(el => el.day_number == 7).time_start,
                                "closes": shop.shopTimeWorks.find(el => el.day_number == 7).time_end,
                            },
                        ],
                    },
                };
                jsonLD['itemListElement'].push(jsonLD_item);
                generateJsonLD(shops_id, index);
                if (shops_id.length == index) {
                    let script = document.createElement('script');
                    script.type = "application/ld+json";
                    script.innerHTML = JSON.stringify(jsonLD);
                    document.getElementsByTagName('body')[0].appendChild(script);
                }
            }
        });
    }
}

function generateBreadFirstWindow() {
    let jsonBreadcrumb = {
        '@context': "https://schema.org",
        '@type': "BreadcrumbList",
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': window.location.hostname,
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': location.href,
            }
        ]
    };
    let script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonBreadcrumb);
    document.getElementsByTagName('body')[0].appendChild(script);
}
