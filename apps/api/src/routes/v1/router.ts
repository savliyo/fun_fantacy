import { Router } from 'express';
import createCustomer from './customer/create-customer.api';
import createMatch from './match/create-match.api';
import getAllMatch from './match/get-all-match.api';
import deleteMatch from './match/id/delete-match.api';
import getMatch from './match/id/get-match.api';
import updateMatch from './match/id/update-match.api';
import createMenu from './menu/create-menu.api';
import createNotif from './notification/create-notif.api';
import getAllNotif from './notification/get-all-notif.api';
import createPaymentApi from './payment/create-payment.api';
import createRole from './role/create-role.api';
import getRoleList from './role/get-all-roles.api';
import deleteRole from './role/id/delete-role.api';
import getRole from './role/id/get-role.api';
import updateRole from './role/id/update-role.api';
import createuser from './user/create-user.api';
import getUserList from './user/get-user-list.api';
import deleteuser from './user/id/delete-user.api';
import getUserApi from './user/id/get-user.api';
import loginuser from './user/login-user.api';

import createOffer from './offer/create-offer.api';
import getOfferList from './offer/get-all-offers.api';
import deleteOffer from './offer/id/delete-offer.api';
import getOffer from './offer/id/get-offer.api';
import updateOffer from './offer/id/update-offer.api';
import verifyPaymentApi from './payment/verify-payment.api';

import createConfig from './config/create-config.api';
import getConfigList from './config/get-all-configs.api';
import deleteConfig from './config/id/delete-config.api';
import getConfig from './config/id/get-config.api';
import updateConfig from './config/id/update-config.api';
import deleteNotif from './notification/id/delete-notif.api';
// IMPORT GENERATED FILES

const routerv1 = Router();

routerv1
  .use('/user', [getUserList, createuser, deleteuser, loginuser, getUserApi])
  .use('/match', [getAllMatch, getMatch, createMatch, deleteMatch, updateMatch])
  .use('/notification', [getAllNotif, createNotif, deleteNotif])
  .use('/customer', [createCustomer])
  .use('/menu', [createMenu])
  .use('/role', [getRoleList, getRole, createRole, deleteRole, updateRole])
  .use('/payment', [createPaymentApi, verifyPaymentApi])
  .use('/offer', [
    getOfferList,
    updateOffer,
    getOffer,
    createOffer,
    deleteOffer,
  ])
  .use('/config', [
    getConfigList,
    getConfig,
    createConfig,
    deleteConfig,
    updateConfig,
  ]);
// APPEND API ROUTES

export default routerv1;
