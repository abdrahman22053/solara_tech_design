import { Directive, HostListener, input } from '@angular/core';

@Directive({ selector: 'img[appImageFallback]', standalone: true })
export class ImageFallbackDirective {
  fallback = input('https://images.pexels.com/photos/29206488/pexels-photo-29206488.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', { alias: 'appImageFallback' });

  @HostListener('error', ['$event'])
  handleError(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (image.src !== this.fallback()) {
      image.src = this.fallback();
    }
  }
}
