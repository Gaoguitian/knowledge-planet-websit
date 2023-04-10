import{d as e,w as t,h as o,r as p}from"./index-1b80c640.js";const s=e({name:"Markdown"}),r=()=>{const n=p("highlight");return t(o("div",{innerHTML:`<h3>实现effect的stop功能</h3>
<p>单元测试</p>
<pre><code class="language-js">it(&quot;stop&quot;, () =&gt; {
      let dummy;
      const obj = reactive({prop:1})
      const runner = effect(()=&gt;{
        dummy = obj.prop
      })
      obj.prop = 2
      expect(dummy).toBe(2)
      stop(runner);
      obj.prop = 3
      expect(dummy).toBe(2)

      runner()
      expect(dummy).toBe(3)
    })
</code></pre>
<p>stop是effect.ts中的一个方法,会调用effect.ts中类的stop方法</p>
<pre><code class="language-js">export function stop(runner){
  runner.effect.stop()
}

class ReactiveEffect{
    deps = []
    active = true
    private _fn: Function;
    constructor(fn, public scheduler?){
        this._fn = fn
    }
    run(){
        activeEffect = this
        return this._fn()
    }
    stop(){
       if(this.active){
        cleanupEffect(this)
        this.active = false
       }
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach((dep: any) =&gt; {
        dep.delete(effect)
       }) 
   }
</code></pre>
<p>考虑到DDT，封装函数，stop方法就已经实现了</p>
<h3>实现onStop</h3>
<pre><code class="language-js">it(&quot;onStop&quot;, ()=&gt; {
      const obj = reactive({
        foo: 1
      })

      const onStop = jest.fn()
      let dummy;
      const runner = effect(()=&gt;{
        dummy = obj.foo;
      },{
        onStop
      })

      stop(runner)
      expect(onStop).toBeCalledTimes(1)
    })
</code></pre>
<p>修改effect类stop，</p>
<pre><code class="language-js">stop(){
       if(this.active){
        cleanupEffect(this)
        if(this.onStop){
            this.onStop()
        }
        this.active = false
       }
    }
</code></pre>
<p>创建shared文件夹，用于存储公共方法</p>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[n,null]])};s.render=r;export{s as default};
