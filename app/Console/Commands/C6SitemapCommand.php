<?php

namespace App\Console\Commands;


use Carbon\Carbon;
use \Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

class C6SitemapCommand extends Command
{
    static $currentDate = null;
    static $subdomain = '';
    protected $signature = 'test';

    public function handle()
    {
        $count = 0;
        $sitemap_count = 1;
        self::$currentDate = Carbon::now()->format('Y-m-d');
        $site_url = 'http://www.testbezdelnik.pp.ua';
        $xml_document = self::xmlDocumentStart();
        $this->info($site_url);
        self::urlXmlElement($xml_document, $site_url, 1);
        $this->info($site_url . '/shops');
        self::urlXmlElement($xml_document, $site_url . '/shops', 0.8);
        $count = 2;
        $shops = DB::table('shop')->select('id')->where('status_id', null)->where('is_hidden', '0')->get('id');
        foreach ($shops->pluck('id') as $shop_id) {
//            $this->info($site_url . '/shop/' . $shop_id);
            if ($count >= 39000) {
                $count = 0;
                $xml_document = self::xmlDocumentNew($xml_document, $sitemap_count);
                $sitemap_count++;
            }
            $count++;
            self::urlXmlElement($xml_document, $site_url . '/shop/' . $shop_id);
        }

        foreach ($shops->pluck('id') as $shop_id) {
            $products_category = DB::table('product_category')->where('is_empty', '=', '0')->where('is_hidden', '=', '0')->where('shop_id', $shop_id)->get();
            foreach ($products_category->pluck('id') as $category_id) {
//                $this->info($site_url . '/shop/' . $shop_id . '/product/' . $category_id);
                self::urlXmlElement($xml_document, $site_url . '/shop/' . $shop_id . '/product/' . $category_id);
                $count++;
                $products = DB::table('product')->where('product_category_id', '=', $category_id)->where('is_hidden', '=', '0')->get();
                foreach ($products->pluck('id') as $product_id) {
//                    $this->info($site_url . '/shop/' . $shop_id . '/product/' . $category_id . '/' . $product_id);
                    if ($count >= 39000) {
                        $count = 0;
                        $xml_document = self::xmlDocumentNew($xml_document, $sitemap_count);
                        $sitemap_count++;
                    }
                    $count++;
                    self::urlXmlElement($xml_document, $site_url . '/shop/' . $shop_id . '/product/' . $category_id . '/' . $product_id);
                }
            }
        }

        self::urlXmlElement($xml_document, $site_url . '/cart', 0.3);
        self::xmlDocumentSave($sitemap_count);
        $this->info($sitemap_count, 'sitemap');

        self::xmlDocumentEnd($xml_document, $sitemap_count);
        return;
    }

    static function urlXmlElement(\XMLWriter &$xml, $url, $priority = 0.6, $date = null)
    {
        $xml->startElement('url');
        $xml->writeElement('loc', $url);
        $xml->writeElement('lastmod', !empty($date) ? $date : self::$currentDate);
        $xml->writeElement('changefreq', 'weekly');
        $xml->writeElement('priority', $priority);
        $xml->endElement();
    }

    static function xmlDocumentStart()
    {
        $xml = new \XMLWriter();
        $xml->openMemory();
        $xml->startDocument('1.0', 'UTF-8');
        $xml->startElement('urlset');
        $xml->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        return $xml;
    }

    static function xmlDocumentEnd(\XMLWriter $xml, $counPart = '', $pathSitemap = 'sitemap')
    {
        $xml->endElement();
        $xml->endDocument();
        $content = $xml->outputMemory();
        $xml = null;
        $file = '/public/' . self::$subdomain . $pathSitemap . '/sitemap' . $counPart . '.xml';
        file_put_contents(base_path() . $file, $content);
        $content = null;
    }

    static function xmlDocumentNew(\XMLWriter $xml, $countPart = '')
    {
        self::xmlDocumentEnd($xml, $countPart);
        return self::xmlDocumentStart();
    }

    static function xmlDocumentSave($count_part, $pathSitemap = 'sitemap')
    {
        $xml = new \XMLWriter();
        $xml->openMemory();
        $xml->startDocument('1.0', 'UTF-8');
        $xml->startElement('sitemapindex');
        $xml->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

        for ($i = 1; $i <= $count_part; $i++) {
            $xml->startElement('sitemap');
            $xml->writeElement('loc', '/public/' . self::$subdomain . $pathSitemap . '/sitemap' . $count_part . '.xml');
            $xml->writeElement('lastmod', self::$currentDate);
            $xml->endElement();
        }

        $xml->endElement();
        $xml->endDocument();

        $content = $xml->outputMemory();
        $xml = null;

        $file = '/public/' . self::$subdomain . $pathSitemap . '/sitemap.xml';
        file_put_contents(base_path() . $file, $content);

        $content = null;
    }
}
