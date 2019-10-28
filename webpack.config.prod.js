module.exports = [
    require('./packages/eth-common/webpack.config')(true),
    require('./packages/eth-extended/webpack.config')(true),
    require('./packages/eth-lite/webpack.config')(true),
    require('./packages/eth-memento/webpack.config')(true)
];
