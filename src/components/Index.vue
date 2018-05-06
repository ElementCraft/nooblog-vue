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
					<div class="content-header">最新文章
						<span>查看更多...</span>
					</div>

					<div class="content-body">
						<ul id="ulNewestArticle" class="layui-timeline">
							<li v-for="article in newestArticles" :key="article.id" class="layui-timeline-item">
								<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
								<div class="layui-timeline-content">
									<h3 class="layui-timeline-title"><router-link :to="'/article/'+article.id">{{article.title}}</router-link></h3>
									<p>
										<span class="art-span art-author layui-elip">{{article.userColumn.user.nickName}}</span>
										<span class="art-span art-time layui-elip">{{article.gmtCreate}}</span>
										<span class="art-span art-label layui-elip" pc="">{{article.userColumn.title}}</span>
										<span class="art-span art-count">
											<i class="layui-icon">&#xe6c6;</i> {{article.goodNumber}} &nbsp;&nbsp;
											<i class="layui-icon">&#xe611;</i> {{article.commentNumber}}
										</span>
									</p>
								</div>
							</li>
						</ul>
					</div>

					<div class="content-header">热门文章
						<span>查看更多...</span>
					</div>

					<div class="content-body">
						<ul class="layui-timeline">
							<li v-for="article in hotArticles" :key="article.id" class="layui-timeline-item">
								<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
								<div class="layui-timeline-content">
									<h3 class="layui-timeline-title"><router-link :to="'/article/'+article.id">{{article.title}}</router-link></h3>
									<p>
										<span class="art-span art-author layui-elip">{{article.userColumn.user.nickName}}</span>
										<span class="art-span art-time layui-elip">{{article.gmtCreate}}</span>
										<span class="art-span art-label layui-elip" pc="">{{article.userColumn.title}}</span>
										<span class="art-span art-count">
											<i class="layui-icon">&#xe6c6;</i> {{article.goodNumber}} &nbsp;&nbsp;
											<i class="layui-icon">&#xe611;</i> {{article.commentNumber}}
										</span>
									</p>
								</div>
							</li>
						</ul>
					</div>

					<div class="content-header">推荐博主
						<span>换一换</span>
					</div>

					<div class="content-body">
						<div class="layui-row">
							<div class="layui-col-lg3 layui-col-md3 layui-col-sm3 layui-col-xs6">
								<div class="user-profile">
									<img src="static/images/default_icon.png" alt="头像" />
									<br/>
									<br/>
									<span>代达罗斯之殇</span>
									<br/>
									<br/>
									<button class="layui-btn layui-btn-sm">
										<i class="layui-icon">&#xe654;</i>关 注
									</button>
								</div>
							</div>
							<div class="layui-col-lg3 layui-col-md3 layui-col-sm3 layui-col-xs6">
								<div class="user-profile">
									<img src="static/images/default_icon.png" alt="头像" />
									<br/>
									<br/>
									<span>天零萃梦</span>
									<br/>
									<br/>
									<button class="layui-btn layui-btn-sm">
										<i class="layui-icon">&#xe654;</i>关 注
									</button>
								</div>
							</div>
							<div class="layui-col-lg3 layui-col-md3 layui-col-sm3 layui-col-xs6">
								<div class="user-profile">
									<img src="static/images/i2.jpg" alt="头像" />
									<br/>
									<br/>
									<span>武穆雪</span>
									<br/>
									<br/>
									<button class="layui-btn layui-btn-sm">
										<i class="layui-icon">&#xe654;</i>关 注
									</button>
								</div>
							</div>
							<div class="layui-col-lg3 layui-col-md3 layui-col-sm3 layui-col-xs6">
								<div class="user-profile">
									<img src="static/images/default_icon.png" alt="头像" />
									<br/>
									<br/>
									<span>代达罗斯之殇</span>
									<br/>
									<br/>
									<button class="layui-btn layui-btn-sm">
										<i class="layui-icon">&#xe654;</i>关 注
									</button>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Index",
	data() {
		return {
			newestArticles:[],
			hotArticles:[],
			suggestUsers:[]
		};
	},
	mounted() {
		var Vue = this;

		layui.use(["element", "form", "layer"], function() {
			var element = layui.element;
			var form = layui.form;
			var layer = layui.layer;
			var $ = layui.jquery;

			Vue.$http.get("api/article/all?page=0&size=5")
				.then((res) => {
					let result = res.body;
					let articles = result.content;

					articles.map(article => {
						article.gmtCreate = CountAgo(article.gmtCreate);
						return article;
					});

					Vue.newestArticles = result.content;
				},
				(err) => {
					Vue.layer.close(load);
					Vue.layer.msg("网络异常");
				});

			Vue.$http.get("api/article/hot?page=0&size=5")
				.then((res) => {
					let result = res.body;
					let articles = result.content;

					articles.map(article => {
						article.gmtCreate = CountAgo(article.gmtCreate);
						return article;
					});

					Vue.hotArticles = result.content;
				},
				(err) => {
					Vue.layer.close(load);
					Vue.layer.msg("网络异常");
				});
		});
	}
};
</script>

<style scoped>
body {
	background-color: lightblue;
}

.login-box {
	border-radius: 10px;
	box-shadow: 10px 10px 5px #0c0c0c;
	background-color: #2d93ca;
	padding: 25px 35px;
}

.layui-form-label {
	font-size: 16px;
}

.layui-input-block input {
	border-radius: 6px;
}

.layui-timeline-title a{
	font-size: 18px;
}
</style>
