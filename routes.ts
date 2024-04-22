export const publicRoutes: Array<String> = [
    "/",
    "/api/payment",
    "/pricing",
    '/confirm-email',
    '/websites/:id',
];
export const authRoutes: Array<String> = [
    '/login',
    '/register',
];
export const adminAuthRoutes: Array<String> = [
    '/admin/login',
    '/admin/register',
];
export const apiAuthPrefix = '/api';
export const DEFAULT_REDIRECT = '/';
export const notAuthorizedRedirect = "/login";