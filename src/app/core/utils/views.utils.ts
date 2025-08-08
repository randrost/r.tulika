import { ViewportRuler } from "@angular/cdk/scrolling";
import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class UiUtilsView {

  // Generates chronologically orderable unique string one by one
  public static getVisibility(elm: ElementRef<HTMLElement>, viewPort: ViewportRuler) {
    var viewRect = viewPort.getViewportRect()
    const rect = elm && elm.nativeElement && elm.nativeElement.getBoundingClientRect();
    if (!rect) { return 0; }

    if (rect.left > viewRect.left - 1 && rect.top > viewRect.top - 1 && rect.right < viewRect.right + 1 && rect.bottom < viewRect.bottom + 1) {
      return 1;
    }

    const a = Math.round(rect.height);
    const c = Math.max(0, Math.min(rect.bottom, viewRect.bottom) - Math.max(rect.top, viewRect.top));
    return Math.round(c / a * 10) / 10;
  }
}
