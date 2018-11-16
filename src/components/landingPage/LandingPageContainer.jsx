import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openModal } from '../../redux/actions/modal';
import { registerUser } from '../../redux/actions/auth/register';
import { ModalContent } from '../signup/modalComponent';
import { userLoginRequest, logout } from '../../redux/actions/auth/login';
import LoginModal from '../login/LoginModal';

import LandingPageView from './LandingPageView';
import './LandingPage.scss';
import { fetchArticles, fetchArticlePage } from '../../redux/actions/landingPage/articles';
import { fetchPtags } from '../../redux/actions/landingPage/tags';

const propTypes = {
  userIsAuthenticated: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  userLoginRequest: PropTypes.func,
  articles: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchPtags: PropTypes.func.isRequired,
  fetchArticlePage: PropTypes.func.isRequired,
  loadingArticles: PropTypes.bool,
  handleLogout: PropTypes.func
};

const defaultProps = {
  userIsAuthenticated: false
};

export class LandingPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false
    };
  }

  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchPtags();
  }

  handleLoginModal = () => {
    this.setState(state => ({ showLoginModal: !state.showLoginModal }));
  };

  openRegistrationModalComponent = () => {
    const content = {};
    content.Component = ModalContent;
    content.props = { registerUser: this.props.registerUser };
    this.props.openModal(content);
  };

  handleFetchArticlePage = (page) => {
    this.props.fetchArticlePage(page);
  };

  render() {
    const { userIsAuthenticated } = this.props;
    return (
      <React.Fragment>
        <LandingPageView
          handleLogin={this.handleLoginModal}
          handleSignup={this.openRegistrationModalComponent}
          handleLogout={this.props.handleLogout}
          articles={this.props.articles}
          ptags={this.props.tags}
          handleFetchArticlePage={this.handleFetchArticlePage}
          loadingArticles={this.props.loadingArticles}
          userIsAuthenticated={userIsAuthenticated}
        />
        <LoginModal
          show={this.state.showLoginModal}
          close={this.handleLoginModal}
          userLoginRequest={this.props.userLoginRequest}
        />
      </React.Fragment>
    );
  }
}

LandingPageContainer.propTypes = propTypes;
LandingPageContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  articles: state.landingPageArticles.articlesInView,
  tags: state.landingPageTags.tags,
  userIsAuthenticated: state.login.isAuthenticated,
  loadingArticles: state.landingPageArticles.loadingArticles
});

export default connect(
  mapStateToProps,
  {
    openModal,
    registerUser,
    userLoginRequest,
    handleLogout: logout,
    fetchArticles,
    fetchPtags,
    fetchArticlePage
  }
)(LandingPageContainer);