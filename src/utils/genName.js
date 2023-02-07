const genName = (path, ext = '') => path
    .replaceAll(/[^a-zA-Z0-9]/ig, '-') + ext;

export default genName;
