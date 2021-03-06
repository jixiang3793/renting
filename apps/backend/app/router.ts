import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.web.index);
  router.get('/admin', controller.web.admin);
  router.get('/api/users/current', controller.user.current);
  router.post('/api/users/normal', controller.user.normal);
  router.post('/api/public/users/register', controller.user.register);
  router.get('/api/public/users/getcode', controller.user.sendCode);
  router.resources('users', '/api/users', controller.user);

  router.get('/api/spiderjobs/pause', controller.spiderjob.pause);
  router.get('/api/spiderjobs/resume', controller.spiderjob.resume);
  router.resources('spiderjobs', '/api/spiderjobs', controller.spiderjob);

  router.resources('spiderjoblogs', '/api/spiderjoblogs', controller.spiderjoblog);
  router.resources('spiderdataitems', '/api/spiderdataitems', controller.spiderdataitem);
  router.get('/api/public/spiderdataitems', controller.spiderdataitem.listByArea);

  router.post('/api/public/access/login', controller.access.login);
};
