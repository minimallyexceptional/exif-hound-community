import _ from 'lodash';

export default function flattenObject(obj: any, prefix = ''): Array<[string, any]> {
    const result: Array<[string, any]> = [];

    function recursiveTransform(obj: any, prefix = '') {
        for (const key in obj) {
            const currentKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                recursiveTransform(obj[key], currentKey);
            } else {
                result.push([currentKey.charAt(0).toUpperCase() + currentKey.slice(1), obj[key]]);
            }
        }
    }

    recursiveTransform(obj);
    return result;
}