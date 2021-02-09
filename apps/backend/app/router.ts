import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.web.index);
  router.get('/admin', controller.web.admin);
  router.get('/api/users/current', controller.user.current);
  router.resources('users', '/api/users', controller.user);

  router.post('/api/public/access/login', controller.access.login);
};
