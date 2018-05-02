<template>
	<div id="app">
		<div class="layui-layout layui-layout-admin">
			<div class="layui-header">
				<h2 class="layui-logo" style="font-size:24px;">用户后台</h2>
				<!-- 头部区域 -->
				<ul class="layui-nav layui-layout-right">

					<li class="layui-nav-item" th:if="${session.user ne null}">
						<a href="javascript:;">
							<img v-bind:src="user.iconPath" class="layui-nav-img"/>
                        	<span >{{user.nickName}}</span>
						</a>
						<dl class="layui-nav-child">
							<dd><a @click.prevent="btnUserLogout" href="#">退出登录</a></dd>
						</dl>
					</li>
				</ul>
			</div>

			<div class="layui-side layui-bg-black">
				<div class="layui-side-scroll">
					<!-- 左侧导航区域 -->
					<ul class="layui-nav layui-nav-tree">
						<li class="layui-nav-item layui-nav-itemed">
							<a href="javascript:;">快速入口</a>
							<dl class="layui-nav-child">
								<dd><a th:href="@{/user/edit_profile}" class="layui-this">编辑资料</a></dd>
								<dd><router-link to="/user/console/newArticle">新增文章</router-link></dd>
							</dl>
						</li>
						<li class="layui-nav-item">
							<a class="" href="javascript:;">信息管理</a>
							<dl class="layui-nav-child">
								<dd><a th:href="@{/user/profile}">个人资料</a></dd>
								<dd><router-link to="/user/console/articleList">文章列表</router-link></dd>
								<dd><a th:href="@{/user/favorite_list}">我的收藏</a></dd>
								<dd><a th:href="@{/user/attention_list}">我的关注</a></dd>
								<dd><a th:href="@{/user/fans_list}">我的Fans</a></dd>
							</dl>
						</li>
						<li class="layui-nav-item">
							<a href="javascript:;">日志管理</a>
							<dl class="layui-nav-child">
								<dd><a th:href="@{/user/log}">登录日志</a></dd>

							</dl>
						</li>
					</ul>
				</div>
			</div>

			<div class="layui-body">
				<!-- 内容主体区域 -->
				<router-view/>
			</div>

			<div class="layui-footer">
				<!-- 底部固定区域 -->
    			© layui.com - 底部固定区域
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'User',
	data() {
		return {
			user: {
				iconPath: "static/images/default_icon.png",
				nickName: "游客"
			}
		};
	},
	mounted() { 
		var Vue = this;
		var token = Vue.$localStorage.get("token");
		var user = Vue.$localStorage.get("user");
		if(token){
			Vue.login = true;
			Vue.user = JSON.parse(user);
		}else{
			Vue.$router.replace("/");
		}

		layui.use(['element', 'layer', 'form'], function () {
			Vue.$ = layui.jquery;
			Vue.layer = layui.layer;
			Vue.form = layui.form;
			
			layui.element.render();
			layui.form.render();
		});
	},
	methods: {
		btnUserLogout: function(e){
			this.$localStorage.remove("user", null);
			this.$localStorage.remove("token", null);

			this.$router.go();
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

div.nav-top{
	width: 100%;
	height: 60px;
}


/* 导航栏左侧logo */
div.nav-logo{
	float: left;
}

img.nav-logo{
	width: 200px;
	height: 48px;
	/* margin-left: 75px; */
	line-height: 60px;
	margin-top: 6px;
}


/* 导航栏靠右菜单 */
.nav-right{
	float: right;
}
</style>
