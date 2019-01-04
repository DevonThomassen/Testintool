import Doc from './document';
import Img from './image';

class Sitemap {
  documents: Doc[];
  constructor(documents: Doc[]) {
    this.documents = documents;
  }

  static fromData(data: any) : Sitemap | null {
    if (!data || !data.urlset || !data.urlset.url) {
      return null;
    }

    let urls = data.urlset.url.map((url: any) => {
      let images = url['image:image']
        ? url['image:image'].map((image: { [x: string]: string[]; }) => {
          return new Img(image['image:loc'][0]);
        })
        : [];
      return new Doc(url.loc[0], images);
    });

    return new Sitemap(urls);
  }
}

export default Sitemap;
