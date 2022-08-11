---
theme: seriph
layout: cover
title: Hi GitHub
background: https://images.unsplash.com/photo-1630514969818-94aefc42ec47
highlighter: shiki
css: unocss
---

# Hi GitHub

GitHub 漫游 @yuler

---

# GitHub Web Shortcuts

<div py-4 opacity-60>

[GitHub](http://github.com/) web 端提供了一些快捷键

</div>

<v-clicks>

- `?` # 打开[快捷键](https://docs.github.com/cn/get-started/using-github/keyboard-shortcuts)帮助面板
- `Command + K` # 打开[命令面板](https://docs.github.com/cn/get-started/using-github/github-command-palette)
- `.` # 打开 github.dev [基于 Web 的编辑器](https://docs.github.com/cn/codespaces/the-githubdev-web-based-editor)

</v-clicks>

<style>
li {
  @apply py-4
}
</style>

---

# GitHub Web Search

<div py-4 opacity-60>

[GitHub 搜索](https://github.com/search), [文档](https://docs.github.com/cn/search-github)

</div>

<v-clicks>

也可以在浏览器的地址栏 `github.com` 后按 `tab` 按, 直接触发搜索

<div w="400px">

![Chrome search](/chrome-search.png)

</div>

</v-clicks>

<v-clicks>

- stars:>100000
- user:sindresorhus stars:>1000 sort:stars
- is:issue author:@me sort:updated
- user:@me is:<issues|pr> is:<open|merged>

</v-clicks>

---

# GitHub Code Search

<div py-4 opacity-60>

针对代码搜索 GitHub 提供了单独 [代码搜索](https://cs.github.com) 服务, [搜索语法文档](https://cs.github.com/about/syntax)

</div>

<v-clicks>

- `repo:primer/css variables`
- `org:github`
- `language:typescript OR language:javascript`
- `path:README.md`

</v-clicks>

---

# GitHub Web Browse Extension

<div py-4 opacity-60>
我们可以通过安装一些浏览器插件来增强 GitHub 功能
</div>

<v-clicks>

- [octotree](https://www.octotree.io)
- [OctoLinker](https://github.com/OctoLinker/OctoLinker)
- [Refined GitHub](https://github.com/refined-github/refined-github)
- [Sourcegraph](https://about.sourcegraph.com/)

</v-clicks>

<v-click>

## Others

通过 GitHub 或者 Chrome Web Store 来搜索一些插件

- https://github.com/topics/github-extension
- https://chrome.google.com/webstore/search/github?_category=extensions

</v-click>

---

# GitHub `gh` CLI

<div py-4 opacity-60>

GitHub 提供了 `gh` [命令行工具](https://github.com/cli/cli)

</div>

<v-clicks>

- `gh auth login` # 登录 GitHub 账号
- `gh repo` # 管理仓库
- `gh issue` # 管理 issues
- `gh pr` # 管理 pull request
- `gh extension` # gh CLI 扩展

</v-clicks>

<v-click>

## Search extension

- https://github.com/topics/gh-extension

</v-click>

---

# GitHub Fork & Pull Request

<v-clicks>

- [Fork a repo](https://docs.github.com/cn/get-started/quickstart/fork-a-repo)

  - 通过复刻仓库，您可以自由地尝试更改而不会影响原始项目。
  - 最常见的是，复刻用于那些开源的你没有写入权限的项目进行复刻，然后得到源仓库的副本，更具自己想法进行修改后，向上游发起 `Pull Request`

- [Create Pull Request](https://docs.github.com/cn/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

  - 我们可以通过 [jlord/patchwork](http://jlord.us/patchwork) 这个仓库, 走一个 Pull Request 流程, 他会自动合并

  ```bash
  gh repo clone jlord/patchwork
  gh repo fork
  git remote -v
  cat contributing.md
  git checkout -b add-yuler
  vim contributors/add-yuler.txt
  git add -A
  git commit -m 'Add yuler'
  git push origin add-yuler # 我们可以直接点击 `push` 返回信息中的创建 PR 的链接
  gh pr create
  ```

</v-clicks>

---

# GitHub Customizing your Profile

<div py-4 opacity-60>

[创建个人资料自述文件](https://docs.github.com/cn/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)

</div>

- 创建一个和 GitHub username 同名仓库

  示例:

  - [sindresorhus/sindresorhus](https://github.com/sindresorhus/sindresorhus)
  - [antfu/antfu](https://github.com/antfu/antfu)

---

# GitHub Creating a default community health file

<div py-4 opacity-60>

[创建默认社区健康文件](https://docs.github.com/cn/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

</div>

- 我们可以通过创建一个 `.github` 仓库, 来设置一些默认的文件

  示例:

  - [sindresorhus/.github](https://github.com/sindresorhus/.github)
  - [antfu/.github](https://github.com/antfu/.github)

---

# GitHub Gist

<div py-4 opacity-60>

[GitHub Gist](https://gist.github.com/), [`gist`](https://github.com/defunkt/gist) CLI

</div>

```bash
gist --login # 登录
gist -l # 查看所有的 `gists`
gist a.rb # 直接上传文件
gist *.rb # 上传多个文件
gist -p a.rb # 上传私有文件
gist -d "Random rbx bug" a.rb # 上传带一个描述
gist -r GIST_ID # 通过 id 读取 gist
gist -u GIST_ID FILE_NAME # 修改某个 `gist`
```

---
layout: two-cols
---

# GitHub Codespaces

<div py-4 opacity-60>

[Code Spaces](https://github.com/features/codespaces) 一个快速的云开发环境, [GitHub's docs](https://docs.github.com/cn/codespaces/the-githubdev-web-based-editor#codespaces-and-the-web-based-editor)

</div>

- 打开 [github/haikus-for-codespaces](https://github.com/github/haikus-for-codespaces) 仓库
- 我们使用上面的模板创建一个仓库
- 我们在仓库面板上通过 codespaces 打开

<div w="200px">

![Codespace Button](https://docs.github.com/assets/cb-138303/images/help/codespaces/new-codespace-button.png)

</div>

::right::

<v-click>

# Others

- [Gitpod](https://www.gitpod.io/)
- [repl.it](https://repl.it)
- [StackBlitz](https://stackblitz.com/)
- [CodeSandbox](https://codesandbox.io/)

</v-click>

---

# GitHub Copilot

<div py-4 opacity-60>

GitHub 推出了 [Copilot](https://copilot.github.com/)，通过 AI 技术在编辑器中实时提示建议代码

</div>

<v-clicks>

- [安装](https://docs.github.com/cn/copilot/getting-started-with-github-copilot)
- [费用 $10 每月](https://docs.github.com/cn/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot), [Settings/copilot](https://github.com/settings/copilot)

演示示例

```js
const seconds = 3600
const minutes = seconds / 60
...

function currentYear() {}
```

</v-clicks>

---

# Manage GitHub Repo

<div opacity-60>

[管理你的仓库](https://docs.github.com/cn/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository)

</div>

<v-clicks>

- [README](https://docs.github.com/cn/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) 
  - 徽章生成器 [shields](https://shields.io/)
  - [GitHub 工作流徽章](https://docs.github.com/cn/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)
- [LICENSE](https://docs.github.com/cn/rest/licenses)
- [Code of Conduct](https://docs.github.com/cn/site-policy/github-terms/github-community-code-of-conduct)
- [PR & Issue templates](https://docs.github.com/cn/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [Code Owners](https://docs.github.com/cn/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Apps](https://docs.github.com/cn/developers/apps/getting-started-with-apps/about-apps)
  - 我们可以前往 [应用市场](https://github.com/marketplace?type=apps) 搜索 App
  - [查看在 GitHub 已集成App](https://github.com/settings/installations)
- [Release Page](https://docs.github.com/cn/rest/releases)

</v-clicks>

---
layout: two-cols
---

# Github Pages

GitHub 提供了 [Pages](https://docs.github.com/cn/pages) 方便来快速创建一些静态站点，默认支持 [Jekyll](https://jekyllrb.com/)

[JAMStack](https://en.wikipedia.org/wiki/Jamstack) 技术, 指使用 JavaScript、API 和 Markup（由静态站点生成器生成）来建站

  - https://jamstack.org/
  - https://jamstack.wtf/


## Static Site Generator

- [hugo](https://gohugo.io/)
- [docsify](https://docsify.js.org/)
- [gatsby](https://github.com/gatsbyjs/gatsby)
- [vitepress](https://github.com/vuejs/vitepress)、[vuepress](https://github.com/vuejs/vuepress)

::right::

<div ml-2>

<v-click>

# Other Hosts

- [Netlify](https://www.netlify.com/)
- [Surge](https://surge.sh/)
- [heroku](https://www.heroku.com/)
- [Google Firebase](https://firebase.google.com/docs/hosting)
- [Vercel](https://vercel.com/)

</v-click>

</div>

---
layout: two-cols
---

# GitHub Actions

GitHub [Actions](https://docs.github.com/cn/actions) 自动化、自定义和执行软件开发工作流程。

我们可以再 [GitHub Skills](https://skills.github.com/) 找到 [GitHub Action](https://github.com/skills/hello-github-actions) 的联系


- CI 自动化测试
- CD 自动化部署(自动 publish npm package)
- 定时任务

## Other CI/CD with GitHub

- [Circle CI](https://circleci.com/)
- [Travis CI](https://travis-ci.org/)

::right::

# Example

```yaml {maxHeight:'100'}
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        node-version: [14.x, 16.x]

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2.0.1
        with:
          version: 6

      - name: Install dependencies & build
        run: pnpm install
      - run: pnpm run build --if-present

      - name: Run tests
        run: pnpm test
```

---

# GitHub Skyline

<div opacity-60>

GitHub [Skyline](https://skyline.github.com)，生成 GitHub 共享墙的 3D 模型，可以通过 3D 打印机打印出来

</div>

---

# Thanks

Q&A
