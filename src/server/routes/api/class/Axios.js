const axios = require(`axios`);

class Axios {
    /**
     * @param {string} url
     * @return {object | string}
     */
    get (url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch((error) => resolve(error.message));
        });
    }
};
module.exports = { Axios };
