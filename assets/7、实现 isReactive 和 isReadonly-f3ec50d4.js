import{d as n,w as t,h as r,r as a}from"./index-1b80c640.js";const o=n({name:"Markdown"}),i=()=>{const e=a("highlight");return t(r("div",{innerHTML:`<h3>实现 isReactive 和 isReadonly</h3>
<h3>单元测试</h3>
<pre><code class="language-js">import { reactive, isReactive } from '../reactive'

describe(&quot;reactive&quot;,()=&gt;{
    it(&quot;happy path&quot;,()=&gt;{
        const original = {foo:1}
        const observed = reactive(original)
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
        expect(isReactive(observed)).toBe(true)
    })
})
</code></pre>
<p>实际上就是判断baseHandlers.ts中createGetter key的参数isReadonly值，通过指定值判断key</p>
<pre><code class="language-js">const createGetter = (isReadonly = false) =&gt; {
    return function get(target,key){
        const res = Reflect.get(target,key);
        if(key === 'is_reactive'){
            return !isReadonly 
        }
        //依赖收集
        if(!isReadonly){
            track(target,key)
        }
        return res;
    }
}
</code></pre>
<h3>利用枚举，优化代码</h3>
<pre><code class="language-js">export const enum ReactiveFlags {
    IS_REACTIVE = &quot;_v_isReactive&quot;
}
</code></pre>
<p>替换相关的值即可</p>
<h3>实现isReactive</h3>
<pre><code class="language-js">export function isReactive(raw){
    return !!raw[ReactiveFlags.IS_REACTIVE]
}
</code></pre>
<p>!!主要是处理非proxy的情况</p>
<p>isReadonly不多说了，相同的原理</p>
<p>本章结束</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[e,null]])};o.render=i;export{o as default};
