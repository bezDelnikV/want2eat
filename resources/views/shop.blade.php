@extends('layouts.HeaderAndFooter')

@push('css')
    <link href="{{ asset('/css/owl.carousel.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/ShopStyle.css') }}" rel="stylesheet">

@endpush
@section('main')
    <div id="main-container">
    </div>
@endsection
@push('js')
    <script src="{{ asset('/js/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('/js/jquery.mousewheel.min.js') }}"></script>
    <script src="{{ asset('/js/ShopScript.js') }}"></script>
@endpush
