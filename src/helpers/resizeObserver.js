// TODO: Написать функцию ResizeObserver которая отдает WIDTH, HEIGHT элемента и ...rest параметры

import { useGrid } from 'vue-screen';

export const resizeObserver = new ResizeObserver(() => {});

export const grids = useGrid('tailwind');
