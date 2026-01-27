import {test, expect, request, APIRequestContext} from '@playwright/test';

import { APIUtils } from './APIUtils/APIUtils';

const payload = {userEmail : "QAEENGG@gmail.com", userPassword : "Qaeengg@123"};

const Order_Payload_NikeShoes = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

const Order_Payload_ZaraCoat = {orders: [{country: "United Kingdom", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let ApiContext : APIRequestContext;

let ap : APIUtils;

test.beforeAll("PRE REQUISITE", async function(){
    ApiContext = await request.newContext({ignoreHTTPSErrors : true});
    ap = new APIUtils(ApiContext,payload);
});

test("Create Order - Nike Shoes", async function(){
    const token = await ap.getToken();
    await ap.createOrder(Order_Payload_NikeShoes);
});

test("Create Order - Zara Coat", async function(){
    const token = await ap.getToken();
    await ap.createOrder(Order_Payload_ZaraCoat);
});