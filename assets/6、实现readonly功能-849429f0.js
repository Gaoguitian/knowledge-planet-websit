import{d as n,w as t,h as r,r as a}from"./index-1b80c640.js";const o=n({name:"Markdown"}),s=()=>{const e=a("highlight");return t(r("div",{innerHTML:`<h3>实现readonly功能</h3>
<h3>单元测试</h3>
<pre><code class="language-js">describe(&quot;readonly&quot;, () =&gt; {
    it(&quot;happy path&quot;, () =&gt; {
        const original = {foo: 1, bar: { baz: 2}}
        const wrapped = readonly(original)
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)
    })
})
</code></pre>
<p>实际上就是reactive,返回一个proxy对象，与reactive相比，就是没有set方法以及依赖收集</p>
<pre><code class="language-js">export function readonly(raw){
    return new Proxy(raw,{
        get(target,key){
            const res = Reflect.get(target,key);
            return res;
        },
        set(target,key,value){
            return true
        }
       })
}
</code></pre>
<p>你会发现reactive和readonly有很多的相似之处</p>
<h3>代码重构</h3>
<p>重构getter方法</p>
<pre><code class="language-js">const createGetter = (isReadonly: Boolean) =&gt; {
    return function get(target,key){
        const res = Reflect.get(target,key);
        //依赖收集
        if(isReadonly){
            track(target,key)
        }
        return res;
    }
}
</code></pre>
<p>重构setter方法</p>
<pre><code class="language-js">const createSetter = () =&gt; {
    return function set(target,key,value){
        const res = Reflect.set(target,key,value);
        //触发依赖
        trigger(target,key)
        return res
    }
}
</code></pre>
<p>当前的reactive和readonly函数为</p>
<pre><code class="language-js">export function reactive(raw){
   return new Proxy(raw,{
    get: createGetter(true),
    set: createSetter()
   })
}

// readonly
export function readonly(raw){
    return new Proxy(raw,{
        get: createGetter(false),
        set(target,key,value){
            return true
        }
       })
}
</code></pre>
<p>继续重构，代码抽到底，新建baseHanders.ts，可变的</p>
<pre><code class="language-js">import { track, trigger } from &quot;./effect&quot;;

const createGetter = (isReadonly = false) =&gt; {
    return function get(target,key){
        const res = Reflect.get(target,key);
        //依赖收集
        if(!isReadonly){
            track(target,key)
        }
        return res;
    }
}
const createSetter = () =&gt; {
    return function set(target,key,value){
        const res = Reflect.set(target,key,value);
        //触发依赖
        trigger(target,key)
        return res
    }
}

export const mutableHandler = {
    get: createGetter(),
    set: createSetter()
}

export const readonlyHandlers = {
    get: createGetter(true),
    set(target,key,value){
        return true
    }
} 
</code></pre>
<p>这样reactive.ts就会简洁许多</p>
<pre><code class="language-js">import {mutableHandler,readonlyHandlers} from './baseHandlers'

export function reactive(raw){
   return new Proxy(raw,mutableHandler)
}

// readonly
export function readonly(raw){
    return new Proxy(raw,readonlyHandlers)
}
</code></pre>
<p>代码优化，reactive.ts</p>
<pre><code class="language-js">import {mutableHandler,readonlyHandlers} from './baseHandlers'

export function reactive(raw){
   return createActiveOject(raw,mutableHandler)
}

// readonly
export function readonly(raw){
    return createActiveOject(raw,readonlyHandlers)
}

function createActiveOject(raw,baseHandlers){
    return new Proxy(raw,baseHandlers)
}
</code></pre>
<p>回过头，你会发现baseHandlers.ts中，每次都会createGetter()、createSetter()，可以利用缓存，就不会每次调用</p>
<pre><code class="language-js">import { track, trigger } from &quot;./effect&quot;;


const createGetter = (isReadonly = false) =&gt; {
    return function get(target,key){
        const res = Reflect.get(target,key);
        //依赖收集
        if(!isReadonly){
            track(target,key)
        }
        return res;
    }
}
const createSetter = () =&gt; {
    return function set(target,key,value){
        const res = Reflect.set(target,key,value);
        //触发依赖
        trigger(target,key)
        return res
    }
}

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

export const mutableHandler = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonlyGet,
    set(target,key,value){
        return true
    }
} 
</code></pre>
<p>本章结束</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[e,null]])};o.render=s;export{o as default};
