<template>
	<div class="layui-row" style="margin-top:125px;">
		<div class="layui-col-lg4 layui-col-md4 layui-col-lg-offset4 layui-col-md-offset4 login-box">
			<h2 style="font-size: 32px;text-align: center;">菜鸟博客后台管理员登录</h2>

			<br/>
			<br/>
			<div>
				<form method="post" action="/api/admin/login" class="layui-form">
					<div class="layui-form-item">
						<label class="layui-form-label">管理员账号</label>
						<div class="layui-input-block">
							<input type="text" name="account" required="required" lay-verify="required"
								placeholder="请输入账号..." autocomplete="off" class="layui-input"/>
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">管理员密码</label>
						<div class="layui-input-block">
							<input type="password" name="password" required="required" lay-verify="required"
								placeholder="请输入密码..." autocomplete="off" class="layui-input"/>
						</div>
					</div>
					<div class="layui-form-item">
						<button class="layui-btn" lay-submit="" lay-filter="formAdminLogin">登录</button>
						<button type="reset" class="layui-btn layui-btn-primary">重置</button>
					</div>
				</form>
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
