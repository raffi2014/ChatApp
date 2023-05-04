import axios from "axios";

const genericErrorResponseMessage = "";

/**
 * @param {*} url
 * @param {{}} config
 * @param {{}} headers
 */
export const postData = async (url: string, config = {}, headers = {}) => {
  console.log(url);
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Accept"] = "application/json";

  try {
    const response = await axios.post(url, config, {
      headers: headers,
    });

    if (response && response.data) {
      if (response.data.errorMessage) {
        response.data.body = {
          status: false,
          message: response.data.errorMessage,
          data: [],
        };
      }
      if (response.data.statusCode === 500 && response.data.body) {
        console.log("actual error -> " + response.data.body.message);
        //response.data.body.message = genericErrorResponseMessage;
      }
      return response.data;
    }
    return response;
  }
  catch (e: any) {
    return e.response && e.response.data;
  }
};

const restFulApi = {
  postData,
};

export default restFulApi;
