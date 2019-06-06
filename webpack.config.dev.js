module.exports = [
    require('./packages/eth-common/webpack.config')(false),
    require('./packages/eth-extended/webpack.config')(false),
    require('./packages/eth-lite/webpack.config')(false)
];
