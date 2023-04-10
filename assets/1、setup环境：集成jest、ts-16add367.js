import{d as n,w as s,h as t,r as p}from"./index-1b80c640.js";const a=n({name:"Markdown"}),o=()=>{const e=p("highlight");return s(t("div",{innerHTML:`<h2>1、setup环境：集成jest、ts</h2>
<h3>初始化项目mini-vue</h3>
<pre><code class="language-js">pnpm init
</code></pre>
<h3>确定目录结构</h3>
<pre><code class="language-js">|-- mini-vue
    |-- package.json
    |-- src
        |-- reactivity
            |-- index.ts
            |-- tests
                |-- index.spec.ts
</code></pre>
<h3>安装typescript</h3>
<pre><code class="language-js">pnpm install typescript -D
</code></pre>
<h3>初始化typescript</h3>
<pre><code class="language-js">npx tsc --init
</code></pre>
<p>生成tsconfig.json文件</p>
<h3>引入单元测试jest</h3>
<pre><code class="language-js">pnpm install jest @types/jest -D
</code></pre>
<p>@types/jest是类型声明文件</p>
<h3>开始第一个单元测试</h3>
<p>编写index.spec.ts文件，开始第一个单元测试</p>
<pre><code class="language-js">it(&quot;init&quot;, ()=&gt;{
    expect(true).toBe(true)
})
</code></pre>
<p>tsconfig.json下types为</p>
<pre><code class="language-js"> &quot;types&quot;: [&quot;jest&quot;]
</code></pre>
<p>packages.json更改</p>
<pre><code class="language-js">&quot;scripts&quot;: {
    &quot;test&quot;: &quot;jest&quot;
  },
</code></pre>
<p>执行test命令</p>
<pre><code class="language-js">pnpm test
</code></pre>
<p>顺利通过</p>
<pre><code class="language-js"> PASS  src/reactivity/tests/index.spec.ts
  ✓ init (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.383 s
Ran all test suites.
</code></pre>
<p>测试es模块是否正常</p>
<p>在index.ts先创建个函数并且导出</p>
<pre><code class="language-js">export function add(a,b){
    return a+b
}
</code></pre>
<p>有报错，因为ts不允许any类型存在，tsconfig.json更改配置</p>
<pre><code class="language-js">&quot;noImplicitAny&quot;: false,  
</code></pre>
<p>不讨论具体的类型</p>
<p>倒入index.ts中add函数，并进行单元测试</p>
<pre><code class="language-js">import { add } from '../index'

it(&quot;init&quot;, ()=&gt;{
    expect(add(1,3)).toBe(4)
})
</code></pre>
<p>运行test报错，因为jest不支持es语法，默认commodjs，需要做转换</p>
<pre><code class="language-js">pnpm install -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
</code></pre>
<p>根目录创建babel.config.js</p>
<pre><code class="language-js">module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
</code></pre>
<p>再次运行test，测试通过。最终目录结构</p>
<pre><code class="language-js">|-- mini-vue
    |-- babel.config.js
    |-- package.json
    |-- pnpm-lock.yaml
    |-- tsconfig.json
    |-- src
        |-- reactivity
            |-- index.ts
            |-- tests
                |-- index.spec.ts
</code></pre>
<p>本章结束</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[e,null]])};a.render=o;export{a as default};
