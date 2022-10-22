import { library } from '@fortawesome/fontawesome-svg-core';

// SOLID
import { faBars, faHome, faSpinner, faTriangleExclamation, faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faHome, faBars, faTriangleExclamation, faSpinner);

// REGULAR
import { faLightbulb, faMessage, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

library.add(faLightbulb, faMoon, faSun, faMessage);
