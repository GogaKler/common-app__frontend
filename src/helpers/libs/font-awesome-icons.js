import { library } from '@fortawesome/fontawesome-svg-core';

// SOLID
import {
    faArrowLeft,
    faArrowRightFromBracket,
    faBars,
    faChevronDown,
    faCircleExclamation,
    faEllipsis,
    faExclamation,
    faHome,
    faSpinner,
    faTriangleExclamation,
    faUserSecret
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faUserSecret,
    faHome,
    faBars,
    faTriangleExclamation,
    faSpinner,
    faCircleExclamation,
    faExclamation,
    faEllipsis,
    faChevronDown,
    faArrowRightFromBracket,
    faArrowLeft
);

// REGULAR
import {
    faLightbulb,
    faMessage,
    faMoon,
    faSquare,
    faSun,
    faUser
} from '@fortawesome/free-regular-svg-icons';

library.add(faLightbulb, faMoon, faSun, faMessage, faSquare, faUser);
