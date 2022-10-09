import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBars,
  faHome,
  faMessage,
  faTriangleExclamation,
  faUserSecret
} from '@fortawesome/free-solid-svg-icons';

// SOLID
library.add(faUserSecret, faHome, faBars, faMessage, faTriangleExclamation);

import {
  faLightbulb,
  faMoon,
  faSun
} from '@fortawesome/free-regular-svg-icons';

// REGULAR
library.add(faLightbulb, faMoon, faSun);
