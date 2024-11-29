# xf build 构建脚本

> [!NOTE] 作者
> kirto

本文主要说明，xf build的功能和相关源码。

# xf build 构思来源

在开发 XFusion 的时候，我意识到在 c 语言编译中由于各种构建脚本不同一，导致我们做一个中间件的时候不得不去适配多个构建脚本。
在这种情况下，我们考虑能不能做一个脚本，该脚本用于生成一个含有各种编译信息的 json 文件。再由生成器生成不同的构建脚本，或者工程。

上述的思路就是 xf build 的制作初衷。

再基础的优化和功能添加后，xf build 具有以下的功能：
- 生成含有各种编译信息的 json 文件
- 可以拓展的各种生成器插件
- 支持导出原生工程
- 支持 menuconfig 可视化裁剪配置工程
- 支持基于 pyserial 的命令行串口监视器
- 支持基于 kconfiglib 的 menuconfig 配置工具
- 包管理工具

# 仓库地址

**github**: [https://github.com/x-eks-fusion/xf_build](https://github.com/x-eks-fusion/xf_build)

**gitee**: [https://gitee.com/x-eks-fusion/xf_build](https://gitee.com/x-eks-fusion/xf_build)

# xf 命令参考

> [!INFO] 参考
> 详见：[xf 命令参考](../get-started/xf_command_reference.md)

# 构建相关 API

这部分是在编译的时候，xf_project.py xf_collect.py 所调用的 API 。

<style>
.card {
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-family: Arial, sans-serif;
    color: #333;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}
.card h3 {
    margin: 0 0 10px;
    font-size: 1.5em;
    color: #0078D7;
}
.card p {
    margin: 5px 0;
    line-height: 1.6;
    font-size: 1em;
}
.card ul {
    margin: 10px 0;
    padding-left: 20px;
    list-style-type: disc;
}
</style>


{#project_init}
<div class="card">
    <h3>project_init</h3>
    <p><strong>功能：</strong>初始化一个 XFusion 工程。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>user_dirs</code> (<code>list</code>): 用户添加的额外文件夹。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#program}
<div class="card">
    <h3>program</h3>
    <p><strong>功能：</strong>开始构建工程。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>cflags</code> (<code>list</code>): 全局的 cflags 参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#collect}
<div class="card">
    <h3>collect</h3>
    <p><strong>功能：</strong>收集编译信息。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>srcs</code> (<code>list</code>): 收集源文件。</li>
        <li><code>inc_dirs</code> (<code>list</code>): 收集头文件路径。</li>
        <li><code>requires</code> (<code>list</code>): 模块依赖关系。</li>
        <li><code>cflags</code> (<code>list</code>): 模块 cflags 参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#get_define}
<div class="card">
    <h3>get_define</h3>
    <p><strong>功能：</strong>从 menuconfig 中获取宏定义的值。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>define</code> (<code>str</code>): 需要获取的宏定义。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回宏的值，如果是bool类型返回y或者n
    </ul>
</div>

# 插件对接 API

这部分是在对接的时候，插件需要对接的 API 。

{#build}
<div class="card">
    <h3>build</h3>
    <p><strong>功能：</strong>根据收集的编译信息，生成 SDK 构建脚本，并启动编译。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#clean}
<div class="card">
    <h3>clean</h3>
    <p><strong>功能：</strong>清除编译的中间产物。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#flash}
<div class="card">
    <h3>flash</h3>
    <p><strong>功能：</strong>调用命令烧录。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#menuconfig}
<div class="card">
    <h3>menuconfig</h3>
    <p><strong>功能：</strong>调用底层 menuconfig。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#export}
<div class="card">
    <h3>export</h3>
    <p><strong>功能：</strong>根据收集的编译信息，导出原始 sdk 工程。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#update}
<div class="card">
    <h3>update</h3>
    <p><strong>功能：</strong>根据收集的编译信息，更新已有的 sdk 工程。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>args</code> (<code>list</code>): 顶层调用命令传递下来的参数。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

# 插件调用 API

{#exec_cmd}
<div class="card">
    <h3>exec_cmd</h3>
    <p><strong>功能：</strong>在终端中执行命令行。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>command</code> (<code>str|list</code>): 需要执行的命令。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>

{#apply_template}
<div class="card">
    <h3>apply_template</h3>
    <p><strong>功能：</strong>应用模板文件。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>temp</code> (<code>str</code>): 模板文件的路径。</li>
        <li><code>save</code> (<code>str</code>): 保存应用模板后的文件路径。</li>
        <li><code>replace</code> (<code>dict</code>): 保存应用模板后的文件路径。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#apply_components_template}
<div class="card">
    <h3>apply_components_template</h3>
    <p><strong>功能：</strong> 处理并生成基于模板的文件，按照配置数据自动生成对应的目录和文件。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>temp</code> (<code>str</code>): 模板文件的名称，用于加载模板内容。</li>
        <li><code>save</code> (<code>str</code>): 生成文件的后缀或文件名。如果以 `.` 开头，表示后缀；否则为完整文件名。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#get_define}
<div class="card">
    <h3>get_define</h3>
    <p><strong>功能：</strong> 获取 menuconfig 的宏。</p>
    <p><strong>参数：</strong></p>
    <ul>
        <li><code>define</code> (<code>str</code>): menuconfig 中的定义。</li>
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#cd_to_root}
<div class="card">
    <h3>cd_to_root</h3>
    <p><strong>功能：</strong> 切换到 xfusion 的根目录下。</p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#cd_to_target}
<div class="card">
    <h3>cd_to_target</h3>
    <p><strong>功能：</strong> 切换到当前 target 目录下。</p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#cd_to_project}
<div class="card">
    <h3>cd_to_project</h3>
    <p><strong>功能：</strong> 切换到当前工程目录下。</p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        无
    </ul>
</div>


{#get_sdk_dir}
<div class="card">
    <h3>get_sdk_dir</h3>
    <p><strong>功能：</strong> 获取 SDK 所在的路径。（只有配置了 target.json 才可以获取）</p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回 SDK 的路径
    </ul>
</div>


{#get_XF_ROOT}
<div class="card">
    <h3>get_XF_ROOT</h3>
    <p><strong>功能：</strong> 获取 XFusion 路径 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回 XFusion 的路径
    </ul>
</div>


{#get_XF_TARGET_PATH}
<div class="card">
    <h3>get_XF_PROJECT_PATH</h3>
    <p><strong>功能：</strong> 获取当前 target 目录。 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回当前 target 目录
    </ul>
</div>


{#get_XF_PROJECT_PATH}
<div class="card">
    <h3>get_XF_PROJECT_PATH</h3>
    <p><strong>功能：</strong> 获取当前工程路径。 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回当前工程路径
    </ul>
</div>

{#get_PROJECT_BUILD_PATH}
<div class="card">
    <h3>get_PROJECT_BUILD_PATH</h3>
    <p><strong>功能：</strong> 获取当前工程的 build 路径。 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回当前工程的 build 路径
    </ul>
</div>

{#get_ROOT_PLUGIN}
<div class="card">
    <h3>get_ROOT_PLUGIN</h3>
    <p><strong>功能：</strong> 获取当前 target 插件路径。 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回当前 target 插件路径。
    </ul>
</div>

{#get_PROJECT_CONFIG_PATH}
<div class="card">
    <h3>get_PROJECT_CONFIG_PATH</h3>
    <p><strong>功能：</strong> 获取当前工程配置路径。 </p>
    <p><strong>参数：</strong></p>
    <ul>
        无
    </ul>
    <p><strong>返回值：</strong></p>
    <ul>
        返回当前工程配置路径。
</div>

