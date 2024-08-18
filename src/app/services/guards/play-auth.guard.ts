import { inject } from '@angular/core';
import { PlayAuthService } from './play-auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export function playAuthGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const playAuthService: PlayAuthService = inject(PlayAuthService);
    const router: Router = inject(Router);
    console.log(playAuthService.isActiveQuizz());

    if (!playAuthService.isActiveQuizz()) {
      return router.createUrlTree(['/']);
    }
    return true;
  };
}
