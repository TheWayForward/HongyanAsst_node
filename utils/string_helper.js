let directory_revision = (directory) => directory.replace(/\\/g, "/");

const default_sign = "这个人很懒，TA什么也没有说";

module.exports = {
    directory_revision,
    default_sign
};