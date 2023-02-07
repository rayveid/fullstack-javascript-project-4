const genName = (path, ext = '_files') => path
    .replaceAll(/[^a-zA-Z0-9]/ig, '-') + ext;

export default genName;
