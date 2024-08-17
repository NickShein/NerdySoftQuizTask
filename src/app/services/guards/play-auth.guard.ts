import { inject } from "@angular/core";
import { PlayAuthService } from "./play-auth.service";
import { CanActivateFn, Router } from "@angular/router";

export function playAuthGuard(): CanActivateFn {
  return () => {
    const playAuthService: PlayAuthService = inject(PlayAuthService);
    const router: Router = inject(Router);
    if (!playAuthService.isStartedQuizz() && router.url == '/') {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
}