import axios from "axios";

export class AuthenticationService {
  static login = (username: string, password: string) => {
      return axios.post('/auth/', {username: username, password: password}).then( (r: any) => {
          if (r.data.token) {
              localStorage.setItem('session', JSON.stringify(r.data));
          }
      });
  };
  static logout = () => {
      localStorage.removeItem('session');
  };
  static register = (username:string, password: string) => {
      return axios.post('/api/user/', {username: username, password: password}).then((r: any) => {

      });
  };

  static getSession = () => {
    try {
        return JSON.parse(localStorage.getItem('session') as string);
    } catch (e) {
        return null;
    }
  };
}

export function authHeader() {
    try {
        const user = JSON.parse(localStorage.getItem('session') as string);
        if (user && user.token) {
            return {Authorization: `JWT ${user.token}`};
        }
    } finally {
        return {};
    }
}