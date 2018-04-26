<template>
	<div id="app">
		<div class="main-body">

        <!-- 顶部导航栏 -->
        <div class="nav-top layui-bg-green">

            <div class="nav-logo">
                <img class="nav-logo" src="static/images/logo.png" alt="菜鸟博客" style="margin-left:75px;" pc="" />
                <img class="nav-logo" src="static/images/logo.png" alt="菜鸟博客" style="margin-left:12px;" mobile="" />
            </div>

            <ul v-if="login" class="layui-nav layui-bg-green nav-right" lay-filter="">

                <li class="layui-nav-item" pc="">
                    <a href="javascript:;" @click.prevent="linkMyBlog">
                        我的博客<span class="layui-badge">9</span>
                    </a>
                </li>
                <li class="layui-nav-item">
                    <a href="#">
                        <img v-bind:src="user.icon" class="layui-nav-img"/>
                        <span pc="">{{user.nickName}}</span>
                    </a>
                    <dl class="layui-nav-child">
                        <dd mobile="">
                            <a href="javascript:;" @click.prevent="linkMyBlog">我的博客</a>
                        </dd>
                        <dd>
                            <a href="javascript:;" @click.prevent="linkMyCMD">我的控制台</a>
                        </dd>
                        <dd>
                            <a href="javascript:;" @click.prevent="btnUserLogout">退出登录</a>
                        </dd>
                    </dl>
                </li>
            </ul>

            <ul v-if="!login" class="layui-nav layui-bg-green nav-right" lay-filter="">

                <li class="layui-nav-item" pc="">
                    <a @click="btnRegist" href="#">注册</a>
                </li>

                <li class="layui-nav-item" pc="">
                    <a @click="btnLogin" href="#">登录</a>
                </li>

                <script type="text/html" id="modal-regist">
                <br/>
                <div>
                    <form class="layui-form">
                        <div class="layui-form-item">
                            <label class="layui-form-label">帐号</label>
                            <div class="layui-input-inline">
                                <input id="inputRegistAccount" type="text" name="account" required="required" lay-verify="required" placeholder="请输入帐号" autocomplete="off" class="layui-input"/>
                            </div>
                            <div class="layui-form-mid layui-word-aux">由字母和数字组成，限定长度6-24</div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">昵称</label>
                            <div class="layui-input-inline">
                                <input type="text" name="nickName" placeholder="请输入昵称，默认为账号" autocomplete="off" class="layui-input"/>
                            </div>
                            <div class="layui-form-mid layui-word-aux">限定长度1-18</div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">邮箱</label>
                            <div class="layui-input-inline">
                                <input type="text" name="email" required="required" lay-verify="required|email" placeholder="请输入邮箱" autocomplete="off" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>
                            <div class="layui-input-inline">
                                <input type="password" name="password" required="required" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input"/>
                            </div>
                            <div class="layui-form-mid layui-word-aux">限定长度6-24</div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">确认密码</label>
                            <div class="layui-input-inline">
                                <input type="password" name="password2" required="required" lay-verify="required" placeholder="再次输入密码" autocomplete="off" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn" lay-submit="" lay-filter="formUserRegist">确认注册</button>
                                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            </div>
                        </div>
                    </form>
                </div>
                </script>

                <script type="text/html" id="modal-login">
                <br/>
                <div>
                    <form class="layui-form">
                        <div class="layui-form-item">
                            <label class="layui-form-label">帐号</label>
                            <div class="layui-input-inline">
                                <input id="inputLoginAccount" type="text" name="account" required="required" lay-verify="required" placeholder="请输入帐号" autocomplete="off" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>
                            <div class="layui-input-inline">
                                <input type="password" name="password" required="required" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input"/>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn" lay-submit="" lay-filter="formUserLogin">登录</button>
                                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                            </div>
                        </div>
                    </form>
                </div>
                </script>
            </ul>
        </div>
		</div>

		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			login: false,
			user: {
				icon: "static/images/default_icon.png",
				nickName: "游客"
			}
		};
	},
	mounted() {
		var Vue = this;
		layui.use(['element', 'layer', 'form'], function () {
			Vue.$ = layui.jquery;
			Vue.layer = layui.layer;
			Vue.form = layui.form;
		});
	},
	methods: {
		// 跳转至我的博客
		linkMyBlog: function(){

		},
		linkMyCMD: function(){

		},
		btnUserLogout: function(e){
			layui.use(['element', 'layer', 'form'], function () {
				var $ = layui.jquery;
				var layer = layui.layer;
				var form = layui.form;

				e.preventDefault();

				var load = layer.load(1);
				$.ajax({
					url: "/api/user/logout",
					type: "PUT",
					dataType: "json",
					success: function (data) {
						layer.close(load);
						window.location.href = "/index";
						return false;
					}
				});
			});
		},
		btnLogin: function(e){
			var modalLogin = $("#modal-login");

			layer.open({
				type: 1,
				title: "用户登录",
				skin: 'layui-layer-rim',
				area: ['380px', '240px'],
				content: modalLogin.html()
			});

			$("#inputLoginAccount").focus();

				// 用户登录表单提交
				form.on('submit(formUserLogin)', function (data) {
					var load = layer.load(1);
					$.ajax({
						url: "/api/user/login",
						type: "POST",
						data: JSON.stringify(data.field),
						traditional: true,
						dataType: "json",
						contentType: "application/json;charset=UTF-8",
						success: function (data) {
							layer.close(load);
							if (data.success) {
								window.location.href = "/index";
								return false;
							} else {
								layer.msg(data.msg);
							}
						}
					});

					return false;
				});

				// 用户注册表单提交
				form.on('submit(formUserRegist)', function (data) {
					var load = layer.load(1);
					$.ajax({
						url: "/api/user/regist",
						type: "POST",
						data: JSON.stringify(data.field),
						traditional: true,
						dataType: "json",
						contentType: "application/json;charset=UTF-8",
						success: function (data) {
							layer.close(load);
							if (data.success) {
								window.location.href = "/index";
								return false;
							} else {
								layer.msg(data.msg);
							}
						}
					});

					return false;
				});
		},
		btnRegist: function(e){
			var modalRegist = this.$("#modal-regist");

			layer.open({
				type: 1,
				title: "用户注册",
				skin: 'layui-layer-rim',
				area: ['640px', '400px'],
				content: modalRegist.html()
			});

			this.$("#inputRegistAccount").focus();
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
