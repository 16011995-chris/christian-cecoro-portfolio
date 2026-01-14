import { client } from './client';
import { createImageUrlBuilder, ImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any): ImageUrlBuilder {
    return builder.image(source);
}
