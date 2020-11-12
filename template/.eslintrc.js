// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    {{#if_eq lintConfig "standard"}}
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential', 'airbnb-base'],
    {{/if_eq}}
    {{#if_eq lintConfig "none"}}
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    {{/if_eq}}
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    {{#if_eq lintConfig "airbnb"}}
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    {{/if_eq}}
    // add your custom rules here
    rules: {
        {{#if_eq lintConfig "standard"}}
        // allow async-await
        'generator-star-spacing': 'off',
        {{/if_eq}}
        {{#if_eq lintConfig "airbnb"}}
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never'
        }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: ['test/unit/index.js']
        }],
        {{/if_eq}}
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "quotes": ["error", "double", {
            "avoidEscape": true,
            "allowTemplateLiterals": true
        }],
        "no-console": 0,
        "import/no-dynamic-require":0,
        "global-require":0,
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "camelcase": "error",
        "no-undef": 2, //不能有未定义的变量
        "no-duplicate-case": 2, //switch中的case标签不能重复
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "default-case": 2, //switch语句最后必须有default
        "no-eval": 2, //禁止使用eval
        "no-extra-parens": 2, //禁止非必要的括号
        "no-extra-semi": 2, //禁止多余的冒号
        "no-floating-decimal": 2, //禁止省略浮点数中的0 .5 3.
        "no-multiple-empty-lines": [2, {
            "max": 2
         }], //空行最多不能超过2行
        "no-redeclare": 2, //禁止重复声明变量
        "no-trailing-spaces": 2, //一行结束后面不要有空格
        "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
        "no-unneeded-ternary": 1, //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "no-use-before-define": 2, //未定义前不能使用
        "no-var": 2, //禁用var，用let和const代替
        "space-before-function-paren": [2, "never"], //函数定义时括号前面要不要有空格
        "spaced-comment": 2, //注释风格要有空格
    }
}
