@extends('layouts.HeaderAndFooter')

@push('css')
    <link href="{{ asset('/css/owl.carousel.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/IndexStyle.css') }}" rel="stylesheet">

@endpush
@section('main')
<div class="main-bg">
    <h1>Щоб ви хотіли <br> поїсти?</h1>
    <img class="main-image lazyload" data-src="/img/food-bg.jpg">
    <a href="#main-menu" class="scroll-image"><img class="lazyload" data-src="/img/menu-icon.svg"></a>
</div>
<div class="main-menu" id="main-menu">
    <div class="menu-container" id="menu-container">
        <div class="menu-item">
            <a href="shops">
                <div class="menu-item-img">
                    <img class="lazyload" data-src="/img/all.png">
                </div>
                <p>Всі заклади</p>
            </a>
        </div>
    </div>
</div>


<div class="main-sales">
    <h2>Акції</h2>

</div>
<div class="sales-container">

    <div id="sales-carousel" class="owl-carousel owl-theme">
        <div class="item">
            <img class="lazyload" data-src='/img/sale4.png'>
        </div>
        <div class="item">
            <img class="lazyload" data-src='/img/sale3.png'>
        </div>
        <div class="item">
            <img class="lazyload" data-src='/img/sale6.png'>
        </div>
    </div>
</div>
<div class="mobile-app">
    <div class="mobile-app-text">Використовуйте <br>
        <span>додаток “хочу їсти”</span>
        <br>
        для
        замовлення<br>
        улюблених
        страв
    </div>
    <div class="mobile-app-carousel-container">
        <div id="mobile-app-carousel" class="owl-carousel owl-theme">
            <div class="item">
                <img class="lazyload" data-src='/img/app-slide1.png'>
            </div>
            <div class="item">
                <img class="lazyload" data-src='/img/app-slide2.png'>
            </div>
            <div class="item">
                <img class="lazyload" data-src='/img/app-slide3.png'>
            </div>
            <div class="item">
                <img class="lazyload" data-src='/img/app-slide4.png'>
            </div>
        </div>
    </div>
    <div class="mobile-app-links">
        <div class="mobile-app-first-link">
            <a
                href="https://play.google.com/store/apps/details?id=jdroidcoder.ua.wanteatclient&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img class="lazyload" src="/img/gplay.png">
            </a>
        </div>
        <div class="mobile-app-second-link">
            <a
                href="https://itunes.apple.com/us/app/%D1%85%D0%BE%D1%87%D1%83-%D1%97%D1%81%D1%82%D0%B8/id1280911037?l=uk&ls=1&mt=8">
                <img class="lazyload" src="/img/appstore.png">
            </a>
        </div>
    </div>
</div>
<div class="main-info">
    <h3>Хочу Їсти до ваших послуг!</h3>
    <p>Шукаєте легкий у користуванні сервіс доставки їжі? Щоб замовлення з кращих ресторанів міста потрапляло до вас
        гарячим та смачним? Тоді Хочу Їсти радий вітати вас! У будь-який час від ранку до ночі ви можете
        скористатися доставкою найвишуканіших страв. Створюйте романтичну атмосферу, тіште друзів на крутій вечірці
        або ж насолоджуйтеся частуванням наодинці з улюбленим фільмом.</p>
    <h3>Перевірено, смачніше не буває!</h3>
    <p>Як щодо смакування телятини у вишнево-гранатовому соусі, медальйони зі свинини в беконі смажені на грилі,
        курячі брошети в гірчично-медовому маринаді і кунжуті? Ммм, наші завсідники можуть підтвердити, що це не
        просто гарні назви, але і надзвичайно смачні страви! Що бажаєте сьогодні? Соковиті бургери різної прожарки
        разом із золотистою картоплею фрі чи вас спокушають суші? Цінителів японської кухні давно чекає «Окінава»,
        особливий аромат «Унагі Філадельфія» та інші. А якщо серце лежить до національних страв, замовляйте
        ароматний наваристий борщ, смачний домашній розсольник або дивовижну картопельку з м'ясом від ресторанів з
        українським колоритом. Ну і як без італійських шедеврів? Піца з хрусткими бортиками, сповнена ніжного сиру
        “Моцарелла”, що так і тане у роті. Замовляйте скоріш, адже наповнення піци залежить лише від ваших
        уподобань.</p>
    <h3>Хочу Їсти дарує посмішку навіть у тяжкий робочий день!</h3>
    <p>Бажаєте смачно пообідати? Хочу Їсти пропонує замовити доставку страв від кращих кухарів міста прямо до офісу.
        Лише уявіть: тепла, смачна їжа від кур'єра до вашого столу. Тепер не потрібно рахувати час, що залишився на
        обідню перерву. Безліч різних частувань на будь-який смак та настрій. Жодних бутербродів у судочках, лише
        відмінні страви на ваш вибір.</p>
    <h3>Зручно! Швидко! Смачно!</h3>
    <p>Ми знаємо як мінімум три причини, <strong>чому слід замовляти доставку їжі Хочу Їсти.</strong></p>
    <ul>
        <li><strong>По-перше</strong>, це зручно: 2-3 хвилини і замовлення оформлене. Більше не потрібно гортати
            сторінки сайту,
            дзвонити, розмовляти з недоброзичливими пані, щоб отримати бажане
        </li>
        <li><strong>По-друге</strong>, це вигідно, так як не потрібно витрачатися на таксі.</li>
        <li><strong>По-третє</strong>, це смачно! Страви доставляються ще теплими до призначеного часу. Ви швидко
            замовляєте те, що
            хочеться скуштувати саме сьогодні.
        </li>
    </ul>
    <h3>Кілька приємних бонусів до вашої страви!</h3>
    <p>До речі, Хочу Їсти має декілька маленьких переваг. В залежності від ресторану ви можете отримати замовлення
        безкоштовно, що дає суттєву економію! А також представлені в каталозі заклади реалізують їжу та напої без
        націнки. Зручна, оперативна і вигідна доставка їжі в Рівне до ваших послуг!</p>
    <h3>Бажаємо вам смачного!</h3>

</div>

@endsection
@push('js')
<script src="{{ asset('/js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('/js/IndexScript.js') }}"></script>
@endpush
