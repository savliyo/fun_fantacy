import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export const authGuard: CanActivateFn = () => {
  const ls = inject(LocalStorageService);
  const router = inject(Router);
  const valid = !!ls.get('token')
  if(valid) {
    return true
  }
  router.navigate(['/auth'])
  return false
};
