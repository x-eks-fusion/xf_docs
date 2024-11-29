# FAQ

> [!NOTE] 作者
> kirto

<style>
.card {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    counter-increment: question-counter;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}
.card .question::before {
    content: "Q" counter(question-counter) ": ";
    font-weight: bold;
    color: #0078D7;
}
.card .question {
    margin-top: 0;
    font-size: 1.5em;
    color: #333333;
}
.card p {
    margin: 10px 0;
    line-height: 1.6;
    color: #555555;
}

.card .answer::before {
    content: "A" counter(question-counter) ": ";
    font-weight: bold;
    color: #0078D7;
}
.card .answer {
    background: #f9f9f9;
    padding: 15px;
    border-left: 4px solid #0078D7;
    border-radius: 4px;
    font-size: 0.95em;
    color: #333333;
}
.card .answer ul {
    padding-left: 20px;
    margin: 10px 0;
    list-style-type: disc;
}
.card .answer ul li {
    margin: 5px 0;
}
</style>


<div class="card">
    <h3 class="question">哪里可以提问？</h3>
    <div class="answer">
        您可以通过以下方式联系我们：
        <ul>
            <li>QQ 群聊：<a href="https://qm.qq.com/cgi-bin/qm/qr?k=993422109" target="_blank">加入 QQ 群</a></li>
            <li>邮件支持：kirto@pthyidh.com</li>
            <li>github 支持：<a href="https://github.com/x-eks-fusion/xfusion/issues">xfusion issue</a></li>
            <li>gitee 支持：<a href="https://gitee.com/x-eks-fusion/xfusion/issues">xfusion issue</a></li>
        </ul>
    </div>
</div>

<div class="card">
    <h3 class="question">XFusion 的每个部分都能拆开来单独使用吗？</h3>
    <div class="answer">
        没错，XFusion 的每个模块都能单独移植并使用。如果您担心整体移植的体量会过大，完全可以采用分模块移植。
        包括我们的组件库，也是采用中间件的写法。可以单独移植到您的 SDK 环境中。
        详细的可以参考我们的 B 站视频：
        <div style="width: 100%; max-width: 100%; overflow: hidden; position: relative; padding-bottom: 56.25%; height: 0;">
            <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113269813545367&bvid=BV15n2EYNEHg&cid=26194608244&p=1" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                scrolling="no" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true">
            </iframe>
        </div>
    </div>
</div>


