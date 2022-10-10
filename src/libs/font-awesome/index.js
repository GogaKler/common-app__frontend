import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBars,
  faHome,
  faTriangleExclamation,
  faUserSecret
} from '@fortawesome/free-solid-svg-icons';

// SOLID
library.add(faUserSecret, faHome, faBars, faTriangleExclamation);

import {
  faLightbulb,
  faMessage,
  faMoon,
  faSun
} from '@fortawesome/free-regular-svg-icons';

// REGULAR
library.add(faLightbulb, faMoon, faSun, faMessage);
