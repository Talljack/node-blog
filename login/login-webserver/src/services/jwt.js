/**
 *
 */
const jwt = require('jsonwebtoken');
const is = require('@lvchengbin/is');

const contractions = {
    iss: 'issuer',
    sub: 'subject',
    aud: 'audience',
    exp: 'expiresIn',
    nbf: 'notBefore',
    jti: 'jwtid'
};

/**
 * 生成token
 * @param query
 * @returns {Promise<{token: *}>}
 */
exports.generate = async (query) => {
    if (!query.secret) {
        throw new Error('secret must have a value.')
    }
    let payload;
    try {
        payload = JSON.parse(query.payload);
    } catch (e) {
        throw new Error('payload must be a string which can be parsed as a JSON object.')
    }

    /**
     * to get all options in querystring.
     */
    const options = {};
    for (let item in contractions) {
        if (!is.undefined(query[item])) {
            options[contractions[item]] = query[item];
        }
    }

    if (!options[contractions.exp] && !payload.exp) {
        options[contractions.exp] = '1y';
    }
    const token = jwt.sign(payload, query.secret, options);
    return {token};
};

/**
 * 验证token
 * @param query {secret,token}
 * @returns {Promise<*>}
 */
exports.verify = async (query) => {
    if (!query.secret) {
        throw new Error('secret must have a value.')
    }
    if (!query.token) {
        throw new Error('token must have a value.')
    }
    const options = {};
    for (let item in contractions) {
        if (!is.undefined(query[item])) {
            options[contractions[item]] = query[item];
        }
    }

    let decoded;
    try {
        decoded = jwt.verify(query.token, query.secret, options);
    } catch (e) {
        return {valid: 0, error: e.message};
    }
    return {valid: 1, decoded};
};
