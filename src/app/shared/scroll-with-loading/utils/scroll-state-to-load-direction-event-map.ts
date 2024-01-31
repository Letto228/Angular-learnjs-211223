import {LoadDirectionEvent, ScrollState} from '../load-direction.type';

export const scrollStateToLoadDirectionEventMap: {
    [key in keyof typeof ScrollState]?: LoadDirectionEvent;
} = {
    [ScrollState.bottom]: LoadDirectionEvent.after,
    [ScrollState.top]: LoadDirectionEvent.before,
};
