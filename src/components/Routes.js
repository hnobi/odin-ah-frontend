import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Toast from './notification/toast';
import Modal from './modal';
import VerifyEmail from './signup/verifyEmail';
import ReVerifyEmail from './signup/reverifyEmail';
import Home from './home/Home';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/auth/confirmation/:token" component={VerifyEmail}/>
        <Route exact path="/email-verification/resend" component={ReVerifyEmail}/>
      </Switch>
      <Toast/>
      <Modal/>
    </div>
  );
}
