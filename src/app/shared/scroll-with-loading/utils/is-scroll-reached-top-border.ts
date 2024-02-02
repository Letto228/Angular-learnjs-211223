import {borderOffset} from '../constans/border-offset';

export function isScrollReachedTopBorder<T extends Element>({scrollTop}: T): boolean {
    return scrollTop <= borderOffset;
}
