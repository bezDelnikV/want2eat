<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти</title>

    <link rel="icon" href="{{ asset('/img/favicon.png')}}" type="image/x-icon">
    <link href="{{ asset('/css/HeaderAndFooter.css')}}" rel="preload" as="style">

    <link href="{{ asset('/css/bootstrap.min.css') }}" rel="stylesheet" media="print" onload="this.media='all'">
    <link href="{{ asset('/css/HeaderAndFooter.css') }}" rel="stylesheet">
    @stack('css')
    <link href="{{ asset('/css/bootstrap-datetimepicker.min.css') }}" rel="stylesheet" media="print"
          onload="this.media='all'">
    <link href="{{ asset('/css/PopUpStyle.css') }}" rel="stylesheet">
</head>
<body>
@include('pop-up.authorize')
@include('pop-up.order')
@include('pop-up.profile')
<div class="header">
    <div class="logo">
        <a href="/"><img src="/img/logo.svg"></a>
    </div>
    <button class="header-btn" onclick="changeStatus()">
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
    </button>
    <ul id="header-menu" class="header-menu disable">
        <li class="header-cart"><a href="javascript://" onclick="openModalOrder()">
                <svg class="full_delivery_svg" width="30" height="27" viewBox="0 0 30 27" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.16766 26.6009C4.23952 26.8553 4.45509 27.0007 4.70659 27.0007H25.3653C25.6168 27.0007 25.8323 26.819 25.9042 26.6009L30.0359 9.88493C30.1078 9.59422 29.9281 9.30351 29.6407 9.23083C29.6048 9.23083 29.5689 9.23083 29.497 9.23083H27.0539L27.018 9.19449L18.4311 0.47309C17.8204 -0.144676 16.8144 -0.144676 16.2036 0.47309L15.988 0.691125C15.3772 1.30889 15.3772 2.32639 15.988 2.94415L22.1677 9.19449H7.90419L14.0838 2.94415C14.6946 2.32639 14.6946 1.30889 14.0838 0.691125L13.8683 0.47309C13.2575 -0.144676 12.2515 -0.144676 11.6407 0.47309L3.05389 9.15815L3.01796 9.19449H0.538922C0.251497 9.19449 0 9.44886 0 9.73958C0 9.77592 0 9.81226 0 9.88493L4.16766 26.6009ZM2.0479 13.4825H3.7006L6.2515 16.0626L3.37725 18.9697L2.0479 13.4825ZM22.9222 16.0989L19.2575 19.7692L15.521 16.0263L18.0359 13.4825H20.3713L22.9222 16.0989ZM21.3772 13.4825H25.4731L23.4251 15.5902L21.3772 13.4825ZM18.7545 20.3143L15.0898 23.9845L11.3892 20.2053L15.018 16.535L18.7545 20.3143ZM15.018 15.5175L13.0419 13.5188H17.0299L15.018 15.5175ZM14.515 16.0263L10.8862 19.6965L7.29341 16.0626L9.84431 13.4825H12.0359L14.515 16.0263ZM6.75449 15.5538L4.70659 13.4825H8.80239L6.75449 15.5538ZM3.88024 20.9684L3.59281 19.8055L6.75449 16.6077L10.3473 20.2416L6.75449 23.8755L3.88024 20.9684ZM4.23952 22.3493L6.2515 24.3843L5.02994 25.6198L4.23952 22.3493ZM5.7485 25.9105L6.75449 24.893L7.76048 25.9105H5.7485ZM8.80239 25.9105L7.25748 24.3479L10.8503 20.714L14.5868 24.4569L13.1856 25.8742L8.80239 25.9105ZM14.2275 25.9105L15.1257 25.002L16.024 25.9105H14.2275ZM17.0299 25.9105L15.6287 24.4933L19.2575 20.823L22.8503 24.4569L21.3772 25.9468L17.0299 25.9105ZM22.4192 25.9105L23.3892 24.9293L24.3593 25.9105H22.4192ZM25.0419 25.6198L23.8922 24.4569L25.7964 22.531L25.0419 25.6198ZM26.1198 21.1501L23.3533 23.9482L19.7605 20.3143L23.4251 16.6077L26.479 19.6965L26.1198 21.1501ZM26.6946 18.8607L23.9281 16.0626L26.479 13.4825H28.024L26.6946 18.8607ZM16.7425 2.18103C16.5269 1.99933 16.5269 1.67228 16.7425 1.45425L16.9581 1.23621C17.1377 1.01818 17.4611 1.01818 17.6766 1.23621L26.2635 9.95761C26.479 10.1393 26.479 10.4664 26.2635 10.6844L26.0479 10.9024C25.8683 11.1205 25.5449 11.1205 25.3293 10.9024L23.8204 9.37619L16.7425 2.18103ZM3.80838 9.92127L12.4311 1.23621C12.6108 1.01818 12.9341 1.01818 13.1497 1.23621L13.3293 1.45425C13.5449 1.63594 13.5449 1.963 13.3293 2.18103L6.21557 9.33985L4.70659 10.8298C4.52695 11.0478 4.20359 11.0478 3.98802 10.8298L3.77245 10.6117C3.59281 10.43 3.62874 10.1393 3.80838 9.92127ZM2.5509 10.2847C2.5509 10.7207 2.73054 11.1205 3.05389 11.4112L3.26946 11.6292C3.88024 12.247 4.88623 12.247 5.49701 11.6292L6.82635 10.2847H23.2096L24.5389 11.6292C25.1497 12.247 26.1557 12.247 26.7665 11.6292L26.982 11.4112C27.2695 11.1205 27.4491 10.7207 27.4491 10.2847H28.7784L28.2754 12.3923H1.76048L1.25748 10.2847H2.5509Z"
                        fill="black"></path>
                </svg>
                <div>Корзина<span id="count-delivery-dish"></span></div>
            </a></li>
        <li class="header-account" id="profile-info">
            <div><a href="javascript://" onclick="openModal('modal-window-authorize')">Авторизація</a></div>
        </li>
        <li>
            <div class="header-mobile-info">
                <div>
                    <p class="header-mobile-info-width">Замовляй смаколики:</p>
                </div>
                <div>
                    <p>(098) 0071 008<br>(099) 0071 008</p>
                </div>
            </div>
        </li>
    </ul>
</div>


@yield('main')

<div class="footer">
    <div>ЗАМОВЛЯЙ СТРАВИ ПО ТЕЛЕФОНУ:</div>
    <div>
        <a href="tel:+380980071008">(098) 0071 008</a><br>
        <a href="tel:+380990071008">(099) 0071 008</a>
    </div>
    <img class="footer-logo lazyload" data-src="/img/footer-logo.svg">
    <div class="main-footer-social">СПОСТЕРІГАЙ ЗА НАМИ ЧЕРЕЗ СОЦМЕРЕЖІ:</div>
    <div class="main-footer-social-links">
        <a href="https://www.instagram.com/hochu_isti"><img class="lazyload" data-src="/img/instagram.svg"></a>
        <a href="https://www.facebook.com/hochu.isti"><img class="lazyload" data-src="/img/fb.svg"></a><br>
    </div>
</div>
<script src="{{ asset('/js/jquery.min.js') }}"></script>
<script src="{{ asset('/js/HeaderAndFooter.js') }}"></script>
<script src="{{ asset('/js/PopUpScript.js') }}"></script>
@stack('js')
<script async src="{{ asset('/js/plugin/jquery.md5.js') }}"></script>
<script async src="{{ asset('/js/bootstrap.min.js') }}"></script>
<script defer src="{{ asset('/js/moment-with-locales.min.js') }}"></script>
<script defer src="{{ asset('/js/bootstrap-datetimepicker.min.js') }}"></script>
<script async src="{{ asset('/js/plugin/lazysizes.min.js') }}"></script>

</body>
</html>
