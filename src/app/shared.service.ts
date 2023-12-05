import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private templateListUpdatedSource = new Subject<void>();

  templateListUpdated$ = this.templateListUpdatedSource.asObservable();

  triggerTemplateListUpdate(): void {
    this.templateListUpdatedSource.next();
  }
}