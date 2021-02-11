import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.web.index);
  router.get('/admin', controller.web.admin);
  router.get('/api/users/current', controller.user.current);
  router.post('/api/users/normal', controller.user.normal);
  router.resources('users', '/api/users', controller.user);
  router.resources('spiderjobs', '/api/spiderjobs', controller.spiderjob);
  router.resources('spiderjoblogs', '/api/spiderjoblogs', controller.spiderjoblog);

  router.post('/api/public/access/login', controller.access.login);
};
