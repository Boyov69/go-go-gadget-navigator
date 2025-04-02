
import { common } from './it/common';
import { navigation } from './it/navigation';
import { authentication } from './it/authentication';
import { home } from './it/home';
import { trip } from './it/trip';
import { suppliers } from './it/suppliers';
import { driver } from './it/driver';
import { settings } from './it/settings';
import { emergency } from './it/emergency';
import { locations } from './it/locations';
import { vehicles } from './it/vehicles';
import { publicTransport } from './it/publicTransport';

export const it = {
  common,
  nav: navigation,
  auth: authentication,
  home,
  trip,
  suppliers,
  driver,
  settings,
  emergency,
  locations,
  vehicle: vehicles,
  publicTransport
};
