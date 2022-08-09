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

- `?` # 打开[快捷键](https://docs.github.com/en/get-started/using-github/keyboard-shortcuts)帮助面板
- `Command + K` # 打开[命令面板](https://docs.github.com/en/get-started/using-github/github-command-palette)
- `.` # 打开 github.dev [基于 Web 的编辑器](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)

</v-clicks>

<style>
li {
  @apply py-4
}
</style>

---

# GitHub Web Search

<div py-4 opacity-60>

[GitHub 搜索](https://github.com/search), [文档](https://docs.github.com/en/search-github)

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

[GitHub 代码搜索](https://cs.github.com), [搜索语法文档](https://cs.github.com/about/syntax)

</div>

<!-- TODO: -->

<v-clicks>

- TODO:

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

- [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

  - 通过复刻仓库，您可以自由地尝试更改而不会影响原始项目。
  - 最常见的是，复刻用于那些开源的你没有写入权限的项目进行复刻，然后得到源仓库的副本，更具自己想法进行修改后，向上游发起 `Pull Request`

- [Create Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

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

[创建个人资料自述文件](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)

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

- 创建一个和 `.github` 同名仓库

  示例:

  - [sindresorhus/.github](https://github.com/sindresorhus/.github)
  - [antfu/.github](https://github.com/antfu/.github)

<!-- TODO: 简要阐述 -->

---

# GitHub Gist

<div py-4 opacity-60>

[GitHub Gist](https://gist.github.com/), [`gist`](https://github.com/defunkt/gist) CLI

</div>

```bash
gist --login # 登录
gist
```

<!-- TODO: 更详细一些 -->

---

# GitHub Codespaces

- <https://github.com/features/codespaces>

<!-- TODO: 添加具体演示 -->

<v-click>

## Related

- [Codespaces and the web-based editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#codespaces-and-the-web-based-editor)

</v-click>

<v-click>

## Other Web Editor

- [CodeSandbox](https://codesandbox.io/)
- [StackBlitz](https://stackblitz.com/)

</v-click>
<!-- TODO: Other Links -->

---

# GitHub Copilot

> https://copilot.github.com/

<v-clicks>

- [安装](https://docs.github.com/en/copilot/getting-started-with-github-copilot)
- [费用 $10 每月](https://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot), [Settings/copilot](https://github.com/settings/copilot)

<!-- TODO: 演示示例 -->

</v-clicks>

---

# Manage GitHub Repo

> [自定义你的仓库](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository)

<v-clicks>

- README
- LICENSE
- Code of Conduct
- PR & Issue templates
- Code Owners
- GitHub Apps
- Release Page

</v-clicks>

---

# Github Pages

<v-clicks>

- GitHub Pages
- Vercel
- Netlify

</v-clicks>

<!-- TODO: 演示示例 -->

---

# GitHub Actions

<v-clicks>

- CI 自动化测试
- CD 自动化部署
- Auto Release NPM Package

</v-clicks>

---

# GitHub Skyline

> https://skyline.github.com/

---

# Thanks

Q&A
