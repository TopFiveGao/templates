# 1. Git 提交规范

## 1. 安装依赖

```sh
pnpm install @commitlint/cli @commitlint/config-conventional commitizen cz-customizable cz-git -D
```

```sh
pnpm install husky lint-staged -D
```

## 2. 配置 commitlint

```json
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

```javascript
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    // @see https://commitlint.js.org/#/reference-rules

    // 提交类型枚举，git提交type必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore' // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ],
    'subject-case': [0] // subject大小写不做校验
  },

  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '是否提交或修改commit ?'
    },
    // prettier-ignore
    types: [
            {value: "feat", name: "特性:     ✨  新增功能", emoji: ":sparkles:"},
            {value: "fix", name: "修复:     🐛  修复缺陷", emoji: ":bug:"},
            {value: "docs", name: "文档:     📝  文档变更", emoji: ":memo:"},
            {value: "style", name: "格式:     🌈  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:"},
            {value: "refactor", name: "重构:     🔄  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:"},
            {value: "perf", name: "性能:     🚀  性能优化", emoji: ":zap:"},
            {value: "test", name: "测试:     🧪  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:"},
            {
                value: "build",
                name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）",
                emoji: ":package:"
            },
            {value: "ci", name: "集成:     ⚙️  修改 CI 配置、脚本", emoji: ":ferris_wheel:"},
            {value: "revert", name: "回退:     ↩️  回滚 commit", emoji: ":rewind:"},
            {
                value: "chore",
                name: "其他:     🛠️  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
                emoji: ":hammer:"
            },
        ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
```

## 3. 配置 lint-staged

```json
{
  "scripts": {
    "lint:lint-staged": "lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx,cjs,mjs,vue}": "eslint --fix",
    "*.{ts,tsx,js,jsx,cjs,mjs,vue,css,scss,less,md}": "prettier --write"
  }
}
```

## 4. 配置 husky

```sh
pnpx husky init
# 要先 git init 再执行该命令，该命令会生成 prepare 钩子，每次安装项目依赖后都会执行 husky 的准备操作
```

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm run lint:lint-staged
# 以上一般为 pre-commit
```

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
pnpx commitlint --edit $1
# pnpx --no-install commitlint --edit $1 # 非安装方式执行，会因网络问题失败
# 以上一般为 commit-msg
```

## 5. 配置 preinstall

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

## 6. 配置 commit

```json
{
  "scripts": {
    "commit": "git add . && git-cz"
  }
}
```

# 2. Eslint 规范

## 1. 安装依赖

```sh
pnpm create vue vue-project
# 创建项目时，选择安装 eslint 和 prettier
```

## 2. 配置 eslint

```js
// .eslintrc.js
module.exports = {
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'vue/valid-template-root': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'no-undef': 'error'
  }
}
```

# 3. Element-plus 自动导入

## 1. 安装依赖

```sh
pnpm install element-plus
pnpm install -D unplugin-vue-components unplugin-auto-import unplugin-icons
```

## 2. 配置组件自动导入

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 如果配置了 eslintrc , 一定要去 .eslintrc.cjs 文件中配置好生成的 src/.eslintrc-auto-import.json 文件路径以解决编译器报错提示
export default {
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: 'src/.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ]
}

// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    './src/.eslintrc-auto-import.json'
  ]
}
```

## 3. 配置 icons 自动导入

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: 'src/.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ]
}
```

# 4. 动态加载 vite.config.ts

```ts
// vite.config.ts
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    // plugins: [],
    // resolve: {},
  }
})
```

```js
// .eslintrc.cjs
// vite.config.ts 配置中 process 可能会报红 , 在 eslint 中配置 node: true 可解决
module.exports = {
  env: {
    browser: true,
    node: true
  }
}
```

# 5. 封装 axios

```ts
// 结合 .env 文件 和 vite.config.ts 中的 server 配置， 配置好 axios 实例的代理请求地址

// 1. src/utils/request.ts
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_PREFIX,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 2. vite.config.ts
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      host: '0.0.0.0',
      open: true,
      port: 5173,
      proxy: {
        [env.VITE_APP_PROXY_PREFIX]: {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_PROXY_PREFIX), '')
        }
      }
    }
  }
})

// 3. 上面配置好后， 就可以去业务中使用了， 但为了代码质量一般还会封装一层业务 api
// 3. src/api/login/index.ts         （ 对 api 业务请求进行具体的处理，向外只导出业务 api，实现一层请求的封装 ）
//    src/api/login/types/login.ts   （ 对于 api 请求的传入参数或返回参数进行类型定义，可得到更好的代码维护 ）
//    src/types/api.d.ts             （ 对于 api 请求的返回参数的类型进行泛型定义，以处理复杂的返回参数类型 ）
//    src/api/consts.ts               ( 配置式管理所有 api 请求路径 )
```
