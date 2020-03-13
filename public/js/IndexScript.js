$(document).ready(function () {
    createMenu();
})

$('#sales-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [
        '<div class="arrow"></div>',
        '<div class="arrow-2"></div>',
    ],
    mouseDrag: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1100: {
            items: 3
        }
    }
})
$('#mobile-app-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    smartSpeed: 800,
    stagePadding: 5,
    navText: [
        '<div class="app-arrow"></div>',
        '<div class="app-arrow-2"></div>',
    ],
    mouseDrag: false,
    items: 1,
})


function createMenu() {
    $.ajax({
        url: "https://adm.want2eat.com.ua/api/filter-category/",
        method: "GET",
        success: function (data) {
            data.data.filterCategory.forEach(element => {
                $('#menu-container').append($('<div>')
                    .attr('class', 'menu-item')
                    .append($('<a>').attr('href', 'shops/' + element.id)
                        .append($('<div>').attr('class', 'menu-item-img')
                            .append($('<img>')
                                .attr('class','lazyload')
                                .attr('data-src', 'http://adm.want2eat.com.ua/images/' + element.photo_url))
                        )
                        .append($('<p>').append(element.name))
                    )
                )
            });
        }
    });
}
function generateBreadIndexWindow() {
    let jsonBreadcrumb = {
        '@context': "https://schema.org",
        '@type': "BreadcrumbList",
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': '',
            }
        ]
    };
}
