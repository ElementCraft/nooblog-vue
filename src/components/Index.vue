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
							
						</ul>
					</div>

					<div class="content-header">热门文章
						<span>查看更多...</span>
					</div>

					<div class="content-body">
						<ul class="layui-timeline">
							<li class="layui-timeline-item">
								<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
								<div class="layui-timeline-content layui-text">
									<h3 class="layui-timeline-title">layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。</h3>
									<p>
										<span class="art-span art-author layui-elip">代达罗斯之殇123123123</span>
										<span class="art-span art-time layui-elip">1秒前</span>
										<span class="art-span art-label layui-elip" pc="">Unity</span>
										<span class="art-span art-count">
											<i class="layui-icon">&#xe6c6;</i> 35 &nbsp;&nbsp;
											<i class="layui-icon">&#xe611;</i> 11
										</span>
									</p>
								</div>
							</li>
							<li class="layui-timeline-item">
								<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
								<div class="layui-timeline-content layui-text">
									<h3 class="layui-timeline-title">杜甫的思想核心是儒家的仁政思想，他有“</h3>
									<p>
										<span class="art-span art-author layui-elip">代达罗斯之殇</span>
										<span class="art-span art-time layui-elip">1秒前</span>
										<span class="art-span art-label layui-elip" pc="">Unity</span>
										<span class="art-span art-count">
											<i class="layui-icon">&#xe6c6;</i> 35 &nbsp;&nbsp;
											<i class="layui-icon">&#xe611;</i> 11
										</span>
									</p>
								</div>
							</li>
							<li class="layui-timeline-item">
								<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
								<div class="layui-timeline-content layui-text">
									<h3 class="layui-timeline-title">8月15日</h3>
									<p>
										<span class="art-span art-author layui-elip">代达罗斯之殇</span>
										<span class="art-span art-time layui-elip">1秒前</span>
										<span class="art-span art-label layui-elip" pc="">Unity</span>
										<span class="art-span art-count">
											<i class="layui-icon">&#xe6c6;</i> 35 &nbsp;&nbsp;
											<i class="layui-icon">&#xe611;</i> 11
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
									<img src="images/default_icon.png" alt="头像" />
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
									<img src="images/i1.jpg" alt="头像" />
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
									<img src="images/i2.jpg" alt="头像" />
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
									<img src="images/default_icon.png" alt="头像" />
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
	name: "AdminLogin",
	data() {
		return {};
	},
	mounted() {
		var Vue = this;

		layui.use(["element", "form", "layer"], function() {
			var element = layui.element;
			var form = layui.form;
			var layer = layui.layer;
			var $ = layui.jquery;

			// 管理员登录提交
			form.on("submit(formAdminLogin)", function(data) {
				var load = layer.load(1);

				$.ajax({
					url: Vue.globals.BaseUrl + "/api/user/login",
					type: "POST",
					data: JSON.stringify(data.field),
					traditional: true,
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					headers: {
						"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3amgxMjMiLCJhdXRocyI6IiIsImlzcyI6Im5vb2J1Zy5jb20iLCJleHAiOjE1MjM0NDgwOTh9.oZWy2TGyLUf4hJyyn_OCWPLOS129r7Z4-e5Nndwd2xc"
					},
					success: function(data) {
						layer.close(load);
						if (data.success) {
							this.$router.push("/admin/");
							return false;
						} else {
							layer.msg(data.msg);
						}
					}
				});

				return false;
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
</style>
