import { Pipe, PipeTransform, inject, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false // Impure to update when service changes
})
export class TranslatePipe implements PipeTransform {
    private translationService = inject(TranslationService);

    transform(value: string): string {
        return this.translationService.translate(value);
    }
}
