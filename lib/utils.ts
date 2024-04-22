import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function toNumber(n: any) {
  return (!isNaN(parseFloat(n)) && !isNaN(n - 0)) ? parseFloat(n) : null;
}
export function toInt(n: any) {
  return (!isNaN(parseInt(n)) && !isNaN(n - 0)) ? parseInt(n) : null;
}
export async function delay(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
export function getLastFriday(date: Date) {
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const daysUntilLastFriday = (dayOfWeek + 2) % 7; // 2 represents Friday
  const lastFriday = new Date(date.getTime() - daysUntilLastFriday * 24 * 60 * 60 * 1000);
  return lastFriday;
}

export function isUrlMatching(url: string, routes: Array<String>) {
  for (const pattern of routes) {
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp('^' + escapedPattern.replace(/:[^\s/]+/g, '([^/]+)') + '$');
    if (regex.test(url))
      return true;
  }
  return false;
}

export function isValidHexaCode(str: string) {
  let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  if (str == null) {
    return false;
  }
  return regex.test(str);
}

export function replaceVariables(inputString: string, replacementObject: any) {
  var regex = /{{(.*?)}}/g;
  var replacedString = inputString.replace(regex, function (match, p1) {
    var variableName = p1.trim();
    if (replacementObject.hasOwnProperty(variableName)) {
      return replacementObject[variableName];
    } else {
      return match;
    }
  });
  return replacedString;
}

export function extractKeys(inputString: string, safe = true) {
  var regex = /{{(.*?)}}/g;
  var keys = [];
  var match;
  while ((match = regex.exec(inputString)) !== null) {
    var key = match[1].trim()
    if (key != "")
      keys.push(key);
  }
  if (!safe) {
    const obj: any = {};
    for (const x of keys) {
      if (obj[x] == null) {
        obj[x] = true;
      } else {
        throw new Error(`${x} is declared twice in the schema!`);
      }
    }
  }
  return keys;
}


export function isValidCuid(cuidString: string) {

  const cuidRegex = /^c[a-z0-9]{24}$/;

  return cuidRegex.test(cuidString);
}
export function objectToQueryString(filter?: any) {
  if (filter == null) return "";
  return Object.keys(filter)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]))
    .join('&');
}

export function extractAxiosError(ex: any): string | null {
  if (ex?.code == 'P2002') {
    return `${ex.meta.target.join('.')} is already taken.`
  }
  if (ex?.code == 'P2025') {
    return ex.meta.cause;
  }
  if ((ex as Error).message == 'NEXT_REDIRECT') {
    throw ex;
  }
  if (ex?.response?.data?.type == "https://mailchimp.com/developer/marketing/docs/errors/") {
    return ex?.response?.data?.title;
  }
  if (ex instanceof AxiosError && ex.response?.data != null) {

    if (ex.response?.data?.errors != null && ex.response?.data?.errors?.length != 0) {
      return ex.response?.data?.errors[0].msg;
    }
    if (ex.response?.data?.msg != null) {
      return ex.response?.data?.msg;
    }
  }
  if (ex instanceof ZodError && ex?.errors != null && ex?.errors.length != 0) {
    const err: any = ex.errors[0];
    return `Expected ${err.expected} in ${err.path.join('.')} but received ${err.received}`
  }
  return ex?.message;
}