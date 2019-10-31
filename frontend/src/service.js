class Service {
  constructor() {
      this.state = {
          'Authorization': ''
      }
  }

  validateRequest(data) {
      return new Promise((resolve, reject) => {
          resolve(data)
      });
  }

  setToken = (token) => {
      this.state.Authorization = token;
  }

  get = (url) => {
      
  }

  post = (url, data) => {
      
  }

  put = (url, data) => {
      
  }

  delete = (url) => {
      
  }

}

export default Service;