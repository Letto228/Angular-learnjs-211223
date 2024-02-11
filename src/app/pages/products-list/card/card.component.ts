import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    inject,
} from '@angular/core';
import {PopupHostService} from 'src/app/components/popup-host/popup-host.service';
import {Product} from '../../../shared/products/product.interface';
import {BuyPopupContext} from './buy-popup-context';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input({required: true}) product: Product | undefined;

    @Output() readonly buy = new EventEmitter<Product['_id']>();

    private readonly popupService = inject(PopupHostService);

    @ViewChild('popupTemplate', {static: true})
    popupTemplate: TemplateRef<BuyPopupContext> | null = null;

    onProductBuy(event: Event) {
        event.stopPropagation();

        this.popupService.setTemplate<BuyPopupContext>(this.popupTemplate, {
            $implicit: this.product!,
            name: this.product!.name,
        });

        setTimeout(() => {
            this.popupService.setContext<BuyPopupContext>({$implicit: this.product!, name: 'test'});
        }, 3000);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.buy.emit(this.product!._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }
}
