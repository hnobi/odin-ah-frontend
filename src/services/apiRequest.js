import Axios from 'axios';
import { logout } from '../redux/actions/auth/login';
import { objectToQueryParams } from '../utils';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export class ApiRequest {
  /**
   *
   * @param {'facebook'|'twitter'|'google'} social
   * @return {string}
   */
  static socialAuthUrl(social) {
    return `${BASE_API_URL}/auth/${social}`;
  }

  constructor() {
    this.axios = Axios.create({
      baseURL: BASE_API_URL
    });
    const token = localStorage.getItem('jwtToken');
    this.setToken(token);
  }

  getInstance() {
    return this.axios;
  }

  setToken(token) {
    if (token) {
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.Authorization;
    }
  }

  /**
   *
   * @param {{email:string,password:string,username:string}} user
   * @return {Promise<object>} return a Promise of the request
   */
  createUser(user) {
    return this.axios.post('/auth/signup', user);
  }

  /**
   *
   * @param { string } token
   * @return {Promise<any>} 59c3d95d0e458f279d365c14fdcdd1b2305c3696
   */
  verityConfirmationToken(token) {
    return this.axios.get(`/auth/confirmation/${token}`);
  }

  /**
   *
   * @param {{email: string}} data
   * @return {Promise<any>}
   */
  resendVerificationToken(data) {
    return this.axios.post('/auth/confirmation', data);
  }

  fetchArticles(pageToLoad = 1, size = 20) {
    return this.axios.get(`/articles?page=${pageToLoad}&size=${size}`);
  }

  loginUser(data) {
    return this.axios.post('/auth/login', data);
  }

  deleteArticle(slug) {
    return this.axios.delete(`/articles/${slug}`);
  }

  authenticateUser() {
    return this.axios.get('/users');
  }

  startResetPassword(email) {
    return this.axios.post('/users/reset-password/begin', { email });
  }

  completeResetPassword(data) {
    return this.axios.post(`/users/reset-password/complete/${data.token}`, {
      password: data.password
    });
  }

  fetchPopularTags() {
    return this.axios.get('/tags/popular');
  }

  postComment(slug, comment) {
    return this.axios.post(`/articles/${slug}/comments`, comment);
  }

  getComments(slug, id) {
    let url = `/articles/${slug}/comments`;
    // id is used for getting comments (replies) on a given comment id
    if (id) url = `${url}/${id}`;
    return this.axios.get(url);
  }

  createArticle(data) {
    return this.axios.post('/articles', data);
  }

  getArticle(slug) {
    return this.axios.get(`/articles/${slug}`);
  }

  getArticlesByTag(tagName, pageToLoad = 1, size = 20) {
    return this.axios.get(`/articles?tag=${tagName}&page=${pageToLoad}&size=${size}`);
  }

  updateArticle(slug, payload) {
    return this.axios.put(`/articles/${slug}`, payload);
  }

  getProfileData() {
    return this.axios.get('/users');
  }

  setProfileData(data) {
    return this.axios.put('/users', data);
  }

  bookMarkArticle(slug) {
    return this.axios.post(`/bookmark/articles/${slug}`);
  }

  addReaction({ slug, status }) {
    return this.axios.post(`/articles/likes/${slug}/${status}`);
  }

  getBookmarkArticle(pageToLoad = 1, size = 20) {
    return this.axios.get(`/bookmark/articles?page=${pageToLoad}&size=${size}`);
  }

  removeBookmarkArticle(slug) {
    return this.axios.delete(`/bookmark/articles/${slug}`);
  }

  getNotification() {
    return this.axios.get('/profiles/notification');
  }

  updateNotification(notificationId) {
    return this.axios.put(`/profiles/notification/${notificationId}`);
  }

  uploadImage(data) {
    const fetchData = {
      method: 'POST',
      body: data
    };
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, fetchData);
  }

  followUser(userId) {
    return this.axios.post(`/profiles/${userId}/follow`);
  }

  fetchStatistics() {
    return this.axios.get('/users/statistics');
  }

  unfollowUser(userId) {
    return this.axios.delete(`/profiles/${userId}/follow`);
  }

  fetchFollowList(page, limit) {
    return this.axios.get(`/profiles/following?page=${page}&size=${limit}`);
  }

  fetchSingleFollow(authorId) {
    return this.axios.get(`/profiles/following?id=${authorId}`);
  }

  fetchFollowerList(page, limit) {
    return this.axios.get(`/profiles/follower?page=${page}&size=${limit}`);
  }

  /**
   *
   * @param {
   *  {
   *    q: string,
   *    limit: string,
   *    page: string,
   *    author: string,
   *    tag: string
   *  }
   * } query
   * @return {Promise<any>}
   */
  search(query) {
    const url = `search?${objectToQueryParams(query)}`;
    return this.axios.get(url);
  }

  filterTags(query) {
    const url = `tags?${objectToQueryParams(query)}`;
    return this.axios.get(url);
  }

  registerInterceptors(store) {
    this.axios.interceptors.response.use(
      response => response,
      (error) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          if (status === 401 && store) {
            store.dispatch(logout());
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const apiRequest = new ApiRequest();
export default apiRequest;
