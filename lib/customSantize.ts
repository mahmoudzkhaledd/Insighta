
import DOMPurify from "isomorphic-dompurify";

function sanatizeObject(object: any) {

    for (const k of Object.keys(object)) {
        if (typeof object[k] == 'object') {
             sanatizeObject(object[k]);
        } else if (typeof object[k] == 'string') {
            object[k] = object[k].trim();
            object[k] = DOMPurify.sanitize(object[k],{ USE_PROFILES: { html: false, mathMl: false, svg: false, } });
        }
    }
    return object;
}
export const customSanatize = (object: string | object) => {
    if (typeof object == 'string') {
        object = object.trim();
        return DOMPurify.sanitize(object, { USE_PROFILES: { html: false, mathMl: false, svg: false, } });
    } else if (typeof object == 'object') {
        return sanatizeObject(object)
    }
    return object;
}