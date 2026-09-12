import { Router } from 'express';
import createCustomer from './customer/create-customer.api';

const routerv2 = Router();

routerv2
.use('/customer', [createCustomer])

export default routerv2;
