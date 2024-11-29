# XF 命令手册

> [!NOTE] 作者
> kirto

本文主要介绍 xf 命令的具体功能和用法

---

<style>
.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
    transition: transform 0.2s ease-in-out;
}
.card h3 {
    margin-top: 0;
    color: #333;
}
.card p {
    margin: 10px 0;
    color: #555;
}
.card .command {
    background: #f1f1f1;
    border-left: 4px solid #0078D7;
    padding: 10px;
    font-family: monospace;
    color: #333;
    word-break: break-word;
}
</style>

{#help}
<div class="card">
    <h3>命令名称: <code>help</code></h3>
    <p><strong>功能：</strong>展示 xf 所有命令</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf --help</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#build}
<div class="card">
    <h3>命令名称: <code>build</code></h3>
    <p><strong>功能：</strong>编译 XFusion 工程（需对接）。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf build</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#clean}
<div class="card">
    <h3>命令名称: <code>clean</code></h3>
    <p><strong>功能：</strong>清空编译中间产物（需对接）。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf clean</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#create}
<div class="card">
    <h3>命令名称: <code>create</code></h3>
    <p><strong>功能：</strong>创建一个 XFusion 新工程。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf create [工程名称]</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#export}
<div class="card">
    <h3>命令名称: <code>export</code></h3>
    <p><strong>功能：</strong>导出 SDK 源工程（需对接）。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf export [工程名称]</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#update}
<div class="card">
    <h3>命令名称: <code>update</code></h3>
    <p><strong>功能：</strong>更新对应 SDK 的工程（需对接）。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf update [工程名称]</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#flash}
<div class="card">
    <h3>命令名称: <code>flash</code></h3>
    <p><strong>功能：</strong>烧录固件（需对接）。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf flash</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#install}
<div class="card">
    <h3>命令名称: <code>install</code></h3>
    <p><strong>功能：</strong>安装指定的包。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf install [包名] [参数]</div>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>-v, --version [版本]</code>：安装指定版本包。</li>
        <li><code>-g, --glob</code>：安装到全局。</li>
    </ul>
</div>

{#uninstall}
<div class="card">
    <h3>命令名称: <code>uninstall</code></h3>
    <p><strong>功能：</strong>卸载指定的包。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf uninstall [包名]</div>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>-g, --glob</code>：卸载全局的包。</li>
    </ul>
</div>

{#search}
<div class="card">
    <h3>命令名称: <code>search</code></h3>
    <p><strong>功能：</strong>模糊搜索包名。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf search [包名]</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#menuconfig}
<div class="card">
    <h3>命令名称: <code>menuconfig</code></h3>
    <p><strong>功能：</strong>图形化配置 XFusion。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf menuconfig</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#monitor}
<div class="card">
    <h3>命令名称: <code>monitor</code></h3>
    <p><strong>功能：</strong>命令行串口监视器。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf monitor [串口号]</div>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
</div>

{#target}
<div class="card">
    <h3>命令名称: <code>target</code></h3>
    <p><strong>功能：</strong>target相关操作。</p>
    <p><strong>使用方法：</strong></p>
    <div class="command">xf target [参数]</div>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>-s, --show</code>：展示目标和目标路径。</li>
        <li><code>-d, --download</code>：下载SDK(依赖target.json)。</li>
    </ul>
</div>




