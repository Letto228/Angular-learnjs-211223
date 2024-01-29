import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-pagination-control',
    templateUrl: './pagination-control.component.html',
    styleUrls: ['./pagination-control.component.css'],
})
export class PaginationControlComponent {
    @Input() pageIndexes: number[] = [];
    @Input() activeIndex: number | null = null;

    @Output() selectIndex = new EventEmitter<number>();
    @Output() back = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();

    onSelectIndex(index: number): void {
        this.selectIndex.emit(index);
    }

    onBack(): void {
        this.back.emit();
    }

    onNext(): void {
        this.next.emit();
    }

    isActiveIndex(index: number): boolean {
        return this.activeIndex === null ? false : this.activeIndex === index;
    }

    get isNextDisabled() {
        return this.pageIndexes.length - 1 === this.activeIndex;
    }

    get isBackDisabled() {
        return this.activeIndex === 0;
    }
}
