import {borderOffset} from '../constans/border-offset';

export function isScrollReachedBottomBorder<T extends Element>({
    scrollHeight,
    scrollTop,
    clientHeight,
}: T): boolean {
    return scrollHeight - scrollTop - clientHeight <= borderOffset;
}
