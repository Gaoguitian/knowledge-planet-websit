import{d as e,w as r,h as t,r as o}from"./index-1b80c640.js";const f=e({name:"Markdown"}),c=()=>{const n=o("highlight");return r(t("div",{innerHTML:`<h3>实现effect返回runner</h3>
<p>实现功能前，先写测试，更具下面的单元测试可以知道，effect会返回effect类中的run方法，而调用run会返回对应的值</p>
<pre><code class="language-js">it(&quot;runner&quot;,() =&gt; {
      let foo = 10
      const runner = effect(() =&gt; {
        foo++
        return &quot;foo&quot;
      })

      expect(foo).toBe(11)
      const r = runner()
      expect(foo).toBe(12)
      expect(r).toBe(&quot;foo&quot;)
    })
</code></pre>
<p>此时runner会标红，此表达式不可调用。类型 &quot;void&quot; 没有调用签名。因为我们的effect函数没有返回值，直接返回fn</p>
<pre><code class="language-js">return _effect.run.bind(_effect)
</code></pre>
<p>run方法中有this指向问题，利用bind指向_effect，并且return出fn的返回值</p>
<pre><code class="language-js">run(){
        activeEffect = this
        return this._fn()
    }
</code></pre>`,style:"background: #fff;padding: 20px;background-image: linear-gradient(90deg, rgba(60, 10, 30, .04) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .04) 3%, transparent 0);background-size: 20px 20px;background-position: 50%;box-shadow: 0 0 10px #f9f9f9"}),[[n,null]])};f.render=c;export{f as default};
