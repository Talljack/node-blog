import bcrypt from 'bcryptjs';

export function encodePassword(pwd) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pwd, salt);
    return {
        salt,
        hash
    };
}

export function decodePassword(pwd, hash) {
    return bcrypt.compareSync(pwd, hash);
}