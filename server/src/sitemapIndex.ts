class SitemapIndex {
  
  urls: string[];
  
  constructor(urls: string[]) {
    this.urls = urls
  }

  static fromData(data: any): SitemapIndex | null {
    if (!data || !data.sitemapindex || !data.sitemapindex.sitemap) {
      return null;
    }

    let urls = data.sitemapindex.sitemap.map((sitemap: any) => {
      return sitemap.loc[0];
    });

    return new SitemapIndex(urls);
  }
}

export default SitemapIndex;
