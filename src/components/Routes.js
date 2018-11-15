import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Toast from './notification/toast';
import Modal from './modal';
import VerifyEmail from './signup/verifyEmail';
import ReVerifyEmail from './signup/reverifyEmail';
import Home from './home/Home';
import SocialLogin from './login/SocialLogin';
import CreateArticle from './article/createArticle/createArticle';
import UpdateArticle from './article/updateArticle/updateArticle';
import ResetPasswordPage from './passwordReset/ResetPasswordPage';
import ResetPasswordForm from './passwordReset/ResetPasswordForm';

export default function Root() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/auth/confirmation/:token" component={VerifyEmail}/>
        <Route exact path="/auth/social" component={SocialLogin} />
        <Route exact path="/email-verification/resend" component={ReVerifyEmail}/>
        <Route path='/article/new' component={CreateArticle} />
        <Route path='/article/edit/:slug' component={UpdateArticle} />
        <Route exact path ='/reset-password' component = {ResetPasswordPage}/>
        <Route exact path ='/reset-password/complete/:token' component = {ResetPasswordForm}/>
      </Switch>
      <Toast/>
      <Modal/>
    </div>
  );
}
