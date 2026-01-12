import { client } from './client';
import imageUrlBuilder, { ImageUrlBuilder } from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlForImage(source: any): ImageUrlBuilder {
    return builder.image(source);
}
