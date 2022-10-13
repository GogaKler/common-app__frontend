const PREFIX = '[ PROPS: ICON ]'; // Префикс Ошибок
const accessFields = ['on', 'off']; // Допустимые ключи

const error = (message) => {
    throw new Error(`${PREFIX} ${message}`);
};

/**
 * @param {Object, String} icon Иконка, которая отображается внутри внутреннего круга Switch
 */
export const propsIconValidationSwitch = ({ icon }) => {
    if (!icon) return;

    const typeParam = icon.constructor;

    if (typeParam !== Object && typeParam !== String) {
        error(`Ошибка входного параметра! icon должен быть Object || String.`);
    }

    try {
        if (typeParam === Object) {
            Object.keys(icon).forEach((item) => {
                if (!accessFields.includes(item)) error(`Недопустимый ключ '${item}'. Используйте 'on', 'off'`);
            });
        }

        return true;
    } catch (error) {
        console.error(error);

        return false;
    }
};
