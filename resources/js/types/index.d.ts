export interface CustomTargetEvent<T extends HTMLElement> extends Event {
    target: T;
    clientY: number;
    clientX: number;
}
