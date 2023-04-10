import{d as n,w as t,h as r,r as c}from"./index-1b80c640.js";const o=n({name:"Markdown"}),s=()=>{const e=c("highlight");return t(r("div",{innerHTML:`<h3>实现effect的scheduler功能</h3>
<p>老习惯，先看单元测试</p>
<pre><code class="language-js">it(&quot;scheduler&quot;, () =&gt; {
        let dummy;
        let run: any;
        const scheduler = jest.fn(()=&gt;{
            run = runner;
        })
        const obj = reactive({ foo: 1 });
        const runner = effect(()=&gt;{
            dummy = obj.foo;
        }, { scheduler });
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
        obj.foo++;
        expect(scheduler).toBeCalledTimes(1);
        // should not run yet
        expect(dummy).toBe(1);
        run()
        expect(dummy).toBe(2);
    })
</code></pre>
<p>scheduler是一个fn,第一次不会被调用，effect中的函数正常被调用，obj set被触发时，fn不会被再次调用，而是执行scheduler，执行runner的时候，会再次执行fn。</p>
<p>传入scheduler</p>
<pre><code class="language-js">// 全局变量，用于确定是否
let activeEffect;
export function effect(fn, options:any = {}){
   const scheduler = options.scheduler
   const _effect = new ReactiveEffect(fn,scheduler);
   _effect.run()
   return _effect.run.bind(_effect)
}
</code></pre>
<p>trigger中加个判断</p>
<pre><code class="language-js">export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key);

    for(const effect of dep){
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run()
        }
    }
}
</code></pre>
<p>effect类中加入</p>
<pre><code class="language-js">constructor(fn, public scheduler?){
        this._fn = fn
    }
</code></pre>
<p>测试通过。</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[e,null]])};o.render=s;export{o as default};
