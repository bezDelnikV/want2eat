@extends('layouts.HeaderAndFooter')

@push('css')
    <link href="{{ asset('/css/ShopsStyle.css') }}" rel="stylesheet">

@endpush
@section('main')
    <div class="tool-bar">
        <a href="/">
            <img src="/img/home.svg">
        </a>
        <a href="/shops">Заклади</a>
    </div>
<div class="main-shop">
    <div class="main-shop-container" id="shop-item-container">
    </div>
</div>



@endsection
@push('js')
    <script src="{{ asset('/js/ShopsScript.js') }}"></script>
@endpush
