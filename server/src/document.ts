import Img from './image';

class Doc {
  url: string;
  images: Img[];
  constructor(url: string, images: Img[]) {
    this.url = url;
    this.images = images;
  }
}

export default Doc;
