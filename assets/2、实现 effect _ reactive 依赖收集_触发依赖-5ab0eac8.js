import{d as n,w as t,h as r,r as a}from"./index-1b80c640.js";const c=n({name:"Markdown"}),f=()=>{const e=a("highlight");return t(r("div",{innerHTML:`<h3>实现 effect &amp; reactive 依赖收集&amp;触发依赖</h3>
<h6>首先在实现effect以及reactive之前，我们先写个单元测试</h6>
<pre><code class="language-js">import { reactive } from '../reactive'

describe(&quot;reactive&quot;,()=&gt;{
    it(&quot;happy path&quot;,()=&gt;{
        const original = {foo:1}
        const observed = reactive(original)
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1)
    })
})
</code></pre>
<p>用于测试reactive函数，创建一个简单的reactive</p>
<pre><code class="language-js">import { track, trigger } from &quot;./effect&quot;;

export function reactive(raw){
   return new Proxy(raw,{
    get(target,key){
        const res = Reflect.get(target,key);
        //依赖收集
        track(target,key)
        return res;
    },
    set(target,key,value){
        const res = Reflect.set(target,key,value);
        //触发依赖
        trigger(target,key)
        return res
    }
   })
}
</code></pre>
<p>两行注释暂未实现，先不考虑，test运行通过</p>
<h3>以下单元测试是我们的最终目的</h3>
<pre><code class="language-js">import { effect } from &quot;../effect&quot;;
import { reactive } from &quot;../reactive&quot;;

describe(&quot;effect&quot;, () =&gt; {
    it.skip(&quot;happy path&quot;, () =&gt; {
        const user = reactive({
            age: 10
        })
        let testNum;
        effect(()=&gt;{
          testNum = user.age + 1
        })
        expect(testNum).toBe(11)
        user.age++;
        expect(testNum).toBe(12)
    })
})
</code></pre>
<p>effect函数会自动调用里面的fn，reactive返回的proxy的set被触发时会再次调用effect中的fn函数</p>
<h3>简单的创建一个effect</h3>
<pre><code class="language-js">class ReactiveEffect{
    private _fn: Function;
    constructor(fn){
        this._fn = fn
    }
    run(){
        this._fn()
    }
}

export function effect(fn){
   const _effect = new ReactiveEffect(fn);
   _effect.run()
}
</code></pre>
<p>此时，effect.spec.ts中运行报错，无法通过</p>
<pre><code class="language-js">user.age++;
expect(testNum).toBe(12)
</code></pre>
<p>是因为我们还没有进行依赖收集</p>
<pre><code class="language-js">class ReactiveEffect{
    private _fn: Function;
    constructor(fn){
        this._fn = fn
    }
    run(){
        activeEffect = this
        this._fn()
    }
}

// 存储reactive传过来的target的集合
const targetMap = new Map()
export function track(target,key){
    let depsMap = targetMap.get(target)
    // 不存在说明没有存,初始化并创建
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    // deps中存着各种key 对应着各种fn
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set()
        depsMap.set(key,dep)
    }
    dep.add(activeEffect)
}

//去除对应的集合一次执行对应的key中的fn
export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key);

    for(const effect of dep){
        effect.run()
    }
}

// 全局变量，用于确定是否
let activeEffect;
export function effect(fn){
   const _effect = new ReactiveEffect(fn);
   _effect.run()
}
</code></pre>
<p>本章结束，关于此部分还需后续挂载更新时具体深思</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[e,null]])};c.render=f;export{c as default};
