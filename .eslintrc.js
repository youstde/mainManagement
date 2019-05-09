module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    globals: {
        APP_TYPE: true,
        page: true,
    },
    rules: {
        // 自定义
        'linebreak-style': ['error', 'windows'], // 使用windows换行符
        indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] }], // js 缩进
        'react/jsx-indent': ['error', 4], // jsx缩进
        'react/jsx-indent-props': ['error', 4], // jsx 属性缩进
        semi: ['error', 'never'], // 不用分号
        'no-param-reassign': ['warn', { props: false }], // 方法的props可以直接使用修改
        'react/require-default-props': ['error'], // 不是必填项 要写默认值
        'react/no-unused-prop-types': ['error'], // 使用proptypes
        'no-plusplus': ['warn'], // 禁止使用++ --
        'react/no-array-index-key': ['warn'], // 使用index当key

        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
            },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'linebreak-style': 0,
    },
    settings: {
        polyfills: ['fetch', 'promises', 'url'],
    },
}
