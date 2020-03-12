<?php
if($_GET['category'] != '13'){exit();}
$curl = curl_init();
curl_setopt($curl,CURLOPT_URL,'https://maps.googleapis.com/maps/api/directions/json?origin='.urlencode($_GET['shop_address']).'&waypoints='.urlencode(str_replace('Україна',"",$_GET['client_address'])).'&destination='.urlencode($_GET['region_address']).'&avoid=highways&mode=driving&language=uk&key=AIzaSyDzXAzUwHGGt1msT_VUpU5te1GI2_iPLG0&sensor=false');
curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
$out = curl_exec($curl);
echo $out;
?>


