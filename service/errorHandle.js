const headers = require('./headers');
function errorHandle(res, error) {
    res.writeHead(400, headers);
    res.write(JSON.stringify({
        'status': 'false',
        'message': '欄位欄位未填寫正確或無此 id',
        error
    }));
    res.end();
}
module.exports = errorHandle;
