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
                        <img v-if="user.iconPath != null" :src="this.$http.options.root + user.iconPath" class="layui-nav-img"/>
						<img v-else src="static/images/default_icon.png" class="layui-nav-img"/>
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
		}

		layui.use(['element', 'layer', 'form'], function () {
			Vue.$ = layui.jquery;
			Vue.layer = layui.layer;
			Vue.form = layui.form;

			layui.element.render();

			// 用户登录表单提交
			Vue.form.on('submit(formUserLogin)', function (data) {
				var load = Vue.layer.load(1);
				Vue.$http.post("api/user/login", data.field)
					.then((res) => {
						var result = res.body;

						if(result.success){
							Vue.$localStorage.set("token", result.data);
							var header = {"Authorization": "Bearer " + result.data};

							// 获取登录用户信息
							Vue.$http.get("api/user/info", {headers:header})
								.then((res) => {
									var result = res.body;
									
									Vue.layer.close(load);
									if(result.success){

										Vue.$localStorage.set("user", JSON.stringify(result.data));
										
										Vue.$router.go();
									}else{
										Vue.layer.msg(result.msg);
									}
								},
								(err) => {
									Vue.layer.close(load);
									Vue.layer.msg("网络异常");
								});
						}else{
							Vue.layer.msg(result.msg);
						}
					},
					(err) => {
						Vue.layer.close(load);
						Vue.layer.msg("网络异常");
					});

				return false;
			});

			// 用户注册表单提交
			Vue.form.on('submit(formUserRegist)', function (data) {
				var load = Vue.layer.load(1);
				// 提交注册信息
				Vue.$http.post("api/user/reg", data.field)
					.then((res) => {
						var result = res.body;
						
						Vue.layer.close(load);
						if(result.success){
							Vue.layer.msg("恭喜您,注册成功!");
							
							Vue.$router.go();
						}else{
							Vue.layer.msg(result.msg);
						}
					},
					(err) => {
						Vue.layer.close(load);
						Vue.layer.msg("网络异常");
					});

				return false;
			});
		});
	},
	methods: {
		// 跳转至我的博客
		linkMyBlog: function(){

		},
		linkMyCMD: function(){
			this.$router.push("/user/console/index");
		},
		btnUserLogout: function(e){
			this.$localStorage.remove("user", null);
			this.$localStorage.remove("token", null);

			this.$router.go();
		},
		btnLogin: function(e){
			var modalLogin = this.$("#modal-login");

			this.layer.open({
				type: 1,
				title: "用户登录",
				skin: 'layui-layer-rim',
				area: ['380px', '240px'],
				content: modalLogin.html()
			});

			this.$("#inputLoginAccount").focus();
		},
		btnRegist: function(e){
			var modalRegist = this.$("#modal-regist");

			this.layer.open({
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
