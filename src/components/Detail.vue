<template>
	<!-- 主体内容 -->
	<div class="body-content">
		<div class="layui-row">
			<div class="layui-col-md2 layui-col-sm3" pc="">

				<!-- 侧边栏 -->
				<div class="sidebar">
					<div class="sidebar-child">
						<div class="head">热门搜索</div>
						<ul>
							<li>
								<a href="#">C/C++</a>
							</li>
							<li>
								<a href="#">Unity脚本</a>
							</li>
							<li>
								<a href="#">SpringMVC</a>
							</li>
							<li>
								<a href="#">3D动画制作</a>
							</li>
							<li>
								<a href="#">Spring全家桶</a>
							</li>
						</ul>
					</div>

					<div class="sidebar-child">
						<div class="head">推荐主题</div>
						<ul>
							<li>
								<a href="#">C++ Boost库</a>
							</li>
							<li>
								<a href="#">Java服务端开发</a>
							</li>
							<li>
								<a href="#">Spring全家桶</a>
							</li>
							<li>
								<a href="#">Flask框架</a>
							</li>
							<li>
								<a href="#">Django框架</a>
							</li>
							<li>
								<a href="#">ASP.NET高级应用</a>
							</li>
							<li>
								<a href="#">3D动画制作</a>
							</li>
						</ul>
					</div>

					<div class="sidebar-child">
						<div class="head">便捷入口</div>
						<ul>
							<li>
								<a href="#">意见反馈</a>
							</li>
							<li>
								<a href="#">友情链接</a>
							</li>
							<li>
								<a href="#">捐赠/Donate</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="layui-col-md9 layui-col-sm9 layui-col-xs12">
				<div class="main-content">
					<div class="article-header">{{articleInfo.title}}</div>
					<div class="article-info">
						<div class="layui-col-md3 layui-col-sm3 layui-col-xs6 article-symbol">作者: {{articleInfo.userColumn.user.nickName}}</div>
						<div class="layui-col-md3 layui-col-sm3 layui-col-xs6 article-symbol">栏目: {{articleInfo.userColumn.title}}</div>
						<div class="layui-col-md3 layui-col-sm3 layui-col-xs6 article-symbol">发表时间: {{articleInfo.gmtCreate}}</div>
						<div class="layui-col-md3 layui-col-sm3 layui-col-xs6 article-symbol">标签: {{articleInfo.label}}</div>
					</div>

					<div class="article-body">
						<EditorMDPreview :content="articleInfo.content" ref="preview"></EditorMDPreview>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return {
			articleInfo: {
				userColumn:{
					user: {

					}
				}
			}
		};
	},
	mounted() {
		var Vue = this;

		layui.use(["element", "form", "layer"], function() {
			var element = layui.element;
			var form = layui.form;
			var layer = layui.layer;
			var $ = layui.jquery;

			Vue.$http.get("api/article/info/" + Vue.$route.params.id)
				.then((res) => {
					let result = res.body;

					result.gmtCreate = CountAgo(result.gmtCreate);
					//result.label = result.label.replace(";;", " ");

					Vue.articleInfo = result;

					Vue.$nextTick(() => {
						Vue.$refs.preview.update();
					});
					
				},
				(err) => {
					Vue.layer.msg("网络异常");
				});
		});
	}
};
</script>

<style scoped>
.article-header{
	text-align: center;
	font-family: "微软雅黑";
	font-size: 26px;
	padding-bottom: 12px;
}

.article-info{
	height: 36px;
	width: 100%;
	border-bottom: 1px solid lightgray;
	padding-bottom: 0px;
	line-height: 42px;
}

.article-symbol{
	text-align: center;
}
</style>
