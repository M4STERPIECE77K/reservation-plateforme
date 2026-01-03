import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="min-w-[300px] max-w-md p-4 rounded-xl shadow-lg border flex items-center gap-3 animate-slide-in-right pointer-events-auto transition-all duration-300"
          [ngClass]="{
            'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400': toast.type === 'success',
            'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400': toast.type === 'error',
            'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400': toast.type === 'info',
            'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400': toast.type === 'warning'
          }"
        >
          <span class="material-symbols-outlined shrink-0 text-[1.5rem]">
            @if (toast.type === 'success') { check_circle }
            @else if (toast.type === 'error') { error }
            @else if (toast.type === 'warning') { warning }
            @else { info }
          </span>
          <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
          <button 
            (click)="toastService.remove(toast.id)"
            class="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors shrink-0"
          >
            <span class="material-symbols-outlined text-[1.25rem]">close</span>
          </button>
        </div>
      }
    </div>
  `,
    styles: [`
    .animate-slide-in-right {
      animation: slideInRight 0.3s ease-out;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
    toastService = inject(ToastService);
}
