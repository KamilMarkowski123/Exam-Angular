import { inject } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { Router } from '@angular/router';

export const PlayerDataGuardService = () => {
  const playerDataservice = inject(PlayerDataService);
  const router = inject(Router);
  const isSubmitted = localStorage.getItem('isSubmitted');
  if (playerDataservice.playerSubmited() || isSubmitted === 'true') {
    return true;
  } else {
    return router.parseUrl('/StartPage');
  }
};
